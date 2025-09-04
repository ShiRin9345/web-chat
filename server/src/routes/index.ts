import path from 'node:path'
import express from 'express'
import { getAuth, requireAuth } from '@clerk/express'
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

const router = express.Router()

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

router.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const file = req.file
    const progress = (p, _checkpoint) => {
      console.log(p)
    }
    const originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    )
    const result = await client.multipartUpload(originalname, file.path, {
      progress,
      parallel: 4,
      partSize: 1024 * 1024 * 5,
      meta: {
        year: 2020,
        people: 'test',
      },
    })
    res.status(200).json({ message: 'File uploaded successfully' })
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
