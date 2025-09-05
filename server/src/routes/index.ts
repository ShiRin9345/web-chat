import path from 'node:path'
import fs from 'node:fs'
import express from 'express'
import { clerkClient, getAuth, requireAuth } from '@clerk/express'
import { v4 as uuidv4 } from 'uuid'
import { asyncHandler } from '../utils/errorHandler.ts'
import { messageService } from '../services/messageService.ts'
import { userService } from '../services/userService.ts'
import { groupService } from '../services/groupService.ts'
import { friendService } from '../services/friendService.ts'
import { conversationService } from '../services/conversationService.ts'
import { ossService } from '../services/ossService.ts'
import { aiService } from '../services/aiService.ts'
import { getIo, groupUsers, groupVideoUsers, onlineUsers } from '../../io.ts'
import { __dirname, upload } from '../services/uploadService.ts'
import { client } from '../../oss-client.ts'
import db from '../../db.ts'

const router = express.Router()

// 存储上传进度的Map
const uploadProgress = new Map()

// SSE进度推送端点 - 单独的GET接口
router.get('/upload-progress/:uploadId', (req, res) => {
  const { uploadId } = req.params

  // 设置SSE响应头
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  })

  // 发送初始连接确认
  res.write(`data: ${JSON.stringify({ type: 'connected', uploadId })}\n\n`)

  // 监听进度更新
  const interval = setInterval(() => {
    const progress = uploadProgress.get(uploadId)
    if (progress) {
      res.write(`data: ${JSON.stringify(progress)}\n\n`)

      // 如果上传完成，清理并关闭连接
      if (progress.type === 'completed' || progress.type === 'error') {
        uploadProgress.delete(uploadId)
        clearInterval(interval)
        res.end()
      }
    }
  }, 100) // 每100ms检查一次

  // 客户端断开连接时清理
  req.on('close', () => {
    clearInterval(interval)
    uploadProgress.delete(uploadId)
  })
})

// Group Messages
router.get(
  '/groupMessages',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId, cursor, limit } = req.query
    const result = await messageService.getGroupMessages(
      groupId as string,
      cursor as string,
      limit ? Number(limit) : undefined,
    )

    if (limit) {
      res.json({ messages: result.messages, nextCursor: result.nextCursor })
    } else {
      res.json(result.messages)
    }
  }),
)

router.post(
  '/groupMessages',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { content, groupId, type } = req.body
    const { userId } = getAuth(req)

    const message = await messageService.createGroupMessage(
      { content, groupId, type },
      userId as string,
    )

    const io = getIo()
    io.to(groupId).emit('new_message', message)

    res.json(message)
  }),
)

// Private Messages
router.post(
  '/privateMessage',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { content, friendUserId, type, conversationId } = req.body
    const { userId } = getAuth(req)

    const message = await messageService.createPrivateMessage(
      { content, friendUserId, type, conversationId },
      userId as string,
    )

    const io = getIo()
    io.to(conversationId).emit('new_message', message)

    res.json(message)
  }),
)

router.get(
  '/privateMessages',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { cursor, limit, userId, otherUserId } = req.query
    const result = await messageService.getPrivateMessages(
      userId as string,
      otherUserId as string,
      cursor as string,
      limit ? Number(limit) : undefined,
    )

    if (limit) {
      res.json({ messages: result.messages, nextCursor: result.nextCursor })
    } else {
      res.json(result.messages)
    }
  }),
)

// Friends
router.get(
  '/friends',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req) as { userId: string }
    const friends = await userService.getFriends(userId)
    res.json(friends)
  }),
)

router.post(
  '/handleRequest',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { request, state } = req.body
    const result = await friendService.handleFriendRequest({ request, state })
    res.json(result)
  }),
)

// Users
router.get(
  '/users',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { name } = req.query
    const users = await userService.searchUsers(name as string)
    res.json(users)
  }),
)

router.post(
  '/initialUser',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const user = await userService.initializeUser(userId as string)

    // Set initial group count
    if (user) {
      const groups = await groupService.getGroups(userId as string)
      if (groups.length > 0) {
        groupUsers.set(groups[0].id, 1)
      }
    }

    res.json(user)
  }),
)

router.get(
  '/profile',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req) as { userId: string }
    const profile = await userService.getProfile(userId)
    res.json(profile)
  }),
)

router.patch(
  '/profile',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req) as { userId: string }
    const { data } = req.body
    const profile = await userService.updateProfile(userId, data)
    res.json(profile)
  }),
)

router.get(
  '/isOnline',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = req.query as { userId: string }
    const isOnline = await userService.checkOnlineStatus(userId, onlineUsers)
    res.send(isOnline)
  }),
)

// Groups
router.get(
  '/groups',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const groups = await groupService.getGroups(userId as string)
    res.json(groups)
  }),
)

router.get(
  '/group',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId } = req.query as { groupId: string }
    const group = await groupService.getGroup(groupId)
    res.json(group)
  }),
)

router.post(
  '/group',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { name } = req.body
    const group = await groupService.createGroup({ name }, userId as string)

    groupUsers.set(group.id, 1)
    res.json(group)
  }),
)

router.patch(
  '/kick',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId, userId } = req.body
    const updatedGroup = await groupService.kickUser({ groupId, userId })
    res.json(updatedGroup)
  }),
)

router.get(
  '/groupCount',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId } = req.query
    const count = await groupService.getGroupMemberCount(
      groupId as string,
      groupUsers,
    )
    res.send(count)
  }),
)

router.get(
  '/canAccess',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId } = req.query as { groupId: string }
    const { userId } = getAuth(req) as { userId: string }
    const canAccess = await groupService.canAccessGroup(groupId, userId)

    if (canAccess) {
      res.status(200).send('User already exists')
    } else {
      res.status(404).send('Not found user')
    }
  }),
)

router.patch(
  '/role',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { groupId, userId, role } = req.body
    const updatedGroup = await groupService.updateUserRole({
      groupId,
      userId,
      role,
    })
    res.json(updatedGroup)
  }),
)

// Video
router.get(
  '/videoCount',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { roomId } = req.query
    const count = await groupService.getVideoUserCount(
      roomId as string,
      groupVideoUsers,
    )
    res.send(count)
  }),
)

// Conversations
router.get(
  '/conversation',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { otherUserId } = req.query
    const conversation = await conversationService.getConversation(
      userId as string,
      otherUserId as string,
    )
    res.json(conversation)
  }),
)

// Friend Requests
router.post(
  '/friendRequest',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId: fromUserId } = getAuth(req)
    const { toUserId } = req.body
    const request = await friendService.sendFriendRequest(
      fromUserId as string,
      toUserId,
    )
    res.json(request)
  }),
)

router.get(
  '/friendRequest',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const requests = await friendService.getFriendRequests(userId as string)
    res.json(requests)
  }),
)

// OSS
router.get(
  '/oss-signature',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const signature = await ossService.generateSignature()
    res.json(signature)
  }),
)

// 上传接口 - 只负责启动上传，立即返回
router.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const file = req.file
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // 生成唯一的上传ID
    const uploadId = uuidv4()
    const originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    )

    // 立即返回上传ID给前端
    res.status(200).json({
      message: 'Upload started',
      uploadId,
      fileName: originalname,
      fileSize: file.size,
    })

    // 异步处理上传（不阻塞响应）
    setImmediate(async () => {
      try {
        const startTime = Date.now()

        const progress = (p: number, checkpoint: any) => {
          const currentTime = Date.now()
          const elapsed = currentTime - startTime
          const speed = elapsed > 0 ? ((file.size * p) / elapsed) * 1000 : 0

          const progressData = {
            type: 'progress',
            uploadId,
            progress: Math.round(p * 100),
            fileName: originalname,
            fileSize: file.size,
            uploadedBytes: Math.round(file.size * p),
            speed: Math.round((speed / 1024 / 1024) * 100) / 100, // MB/s
            estimatedTimeLeft:
              speed > 0 ? Math.round((file.size - file.size * p) / speed) : 0,
            checkpoint,
          }

          uploadProgress.set(uploadId, progressData)
        }

        const originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        )

        const result = await client.multipartUpload(originalname, file.path, {
          progress,
          parallel: 4,
          partSize: 1024 * 1024 * 5,
          meta: {
            year: 2025,
            people: 'test',
            uid: req.userId || 'unknown',
            pid: 0,
            uploadId: uploadId,
          },
        })

        // 上传完成
        uploadProgress.set(uploadId, {
          type: 'completed',
          uploadId,
          progress: 100,
          fileName: originalname,
          url: result.res.requestUrls[0],
          totalTime: Date.now() - startTime,
        })

        // 删除本地文件
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      } catch (error) {
        // 上传失败
        uploadProgress.set(uploadId, {
          type: 'error',
          uploadId,
          error: (error as Error).message,
          fileName: originalname,
        })

        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      }
    })
  }),
)

router.post(
  '/avatar',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { imageUrl } = req.body
    try {
      const user = await db.user.update({
        where: {
          userId: userId as string,
        },
        data: {
          imageUrl: imageUrl,
        },
      })
      return res.status(200).json(user)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Failed to update avatar' })
    }
  }),
)

router.get(
  '/profile/:userId',
  requireAuth(),
  asyncHandler(async (req, res) => {
    const { userId } = req.params as { userId: string }
    const profile = await userService.getProfile(userId)
    res.json(profile)
  }),
)

// AI Chat
router.post(
  '/chat',
  asyncHandler(async (req, res) => {
    const { messages } = req.body
    await aiService.streamChat(messages, res)
  }),
)

export default router
