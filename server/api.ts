import express from 'express'
import { clerkClient, getAuth, requireAuth } from '@clerk/express'
import { convertToModelMessages, streamText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import dotenv from 'dotenv'
import { RequestState } from '@prisma/client'
import db from './db.js'
import { getIo } from './io.js'
import {
  groupUsersRedis,
  groupVideoUsersRedis,
  onlineUsersRedis,
} from './redis.js'
import { client, config } from './oss-client.js'
import { generateCode } from './util/generateCode.js'
import type {
  GroupMessage,
  NewFriendRequest,
  PrivateMessage,
} from '@prisma/client'
import type { UIMessage } from 'ai'

dotenv.config()

const router = express.Router()

router.get('/groupMessages', requireAuth(), async (req, res) => {
  try {
    const { groupId, cursor, limit } = req.query
    let messages: Array<GroupMessage> = []
    if (cursor) {
      messages = await db.groupMessage.findMany({
        where: {
          groupId: groupId as string,
        },
        cursor: { id: cursor as string },
        skip: 1,
        take: Number(limit),
        orderBy: { createdAt: 'asc' },
        include: {
          sender: true,
        },
      })
    } else {
      if (limit) {
        messages = await db.groupMessage.findMany({
          where: {
            groupId: groupId as string,
          },
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: {
            sender: true,
          },
        })
      } else {
        messages = await db.groupMessage.findMany({
          where: {
            groupId: groupId as string,
          },
          orderBy: { createdAt: 'asc' },
          include: {
            sender: true,
          },
        })
        return res.json(messages)
      }
    }
    let nextCursor = null
    if (messages.length === Number(limit)) {
      nextCursor = messages[Number(limit) - 1].id
    }
    res.json({ messages, nextCursor })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/privateMessage', requireAuth(), async (req, res) => {
  const { content, friendUserId, type, conversationId } = req.body
  const { userId } = getAuth(req)
  console.log(userId)
  console.log(friendUserId)
  try {
    const privateMessage = await db.privateMessage.create({
      data: {
        senderId: userId as string,
        receiverId: friendUserId as string,
        content: content,
        type: type,
        conversationId: conversationId,
      },
      include: {
        sender: true,
      },
    })
    const io = getIo()
    io.to(conversationId).emit('new_message', privateMessage)
    res.json(privateMessage)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.get('/privateMessages', requireAuth(), async (req, res) => {
  const { conversationId, cursor, limit } = req.query
  const { userId } = getAuth(req)
  try {
    let messages: Array<PrivateMessage> = []
    if (cursor) {
      messages = await db.privateMessage.findMany({
        where: {
          conversationId: conversationId as string,
        },
        cursor: { id: cursor as string },
        skip: 1,
        take: Number(limit),
        orderBy: { createdAt: 'asc' },
        include: {
          sender: true,
        },
      })
    } else {
      if (limit) {
        messages = await db.privateMessage.findMany({
          where: {
            conversationId: conversationId as string,
          },
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: {
            sender: true,
          },
        })
      } else {
        messages = await db.privateMessage.findMany({
          where: {
            conversationId: conversationId as string,
          },
          orderBy: { createdAt: 'asc' },
          include: {
            sender: true,
          },
        })
        return res.json(messages)
      }
    }
    let nextCursor = null
    if (messages.length === Number(limit)) {
      nextCursor = messages[Number(limit) - 1].id
    }
    res.json({ messages, nextCursor })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/groupMessage', requireAuth(), async (req, res) => {
  const { content, groupId, type } = req.body
  const { userId } = getAuth(req)
  try {
    const groupMessage = await db.groupMessage.create({
      data: {
        senderId: userId as string,
        groupId: groupId as string,
        content: content,
        type: type,
      },
      include: {
        sender: true,
      },
    })
    const io = getIo()
    io.to(groupId).emit('new_message', groupMessage)
    res.json(groupMessage)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/conversation', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { otherUserId } = req.body
  try {
    const conversation = await db.conversation.create({
      data: {
        members: {
          connect: [
            { userId: userId as string },
            { userId: otherUserId as string },
          ],
        },
      },
      include: {
        members: true,
      },
    })
    res.json(conversation)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to create conversation')
  }
})

router.get('/conversations', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  try {
    const conversations = await db.conversation.findMany({
      where: {
        members: {
          some: { userId: userId as string },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })
    res.json(conversations)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch conversations')
  }
})

router.get('/groups', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  try {
    const groups = await db.group.findMany({
      where: {
        OR: [
          {
            members: {
              some: { userId: userId as string },
            },
          },
          {
            moderators: {
              some: { userId: userId as string },
            },
          },
          {
            ownerId: userId as string,
          },
        ],
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    res.json(groups)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch groups')
  }
})

router.post('/group', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { name } = req.body
  try {
    const group = await db.group.create({
      data: {
        name,
        ownerId: userId as string,
      },
    })
    // 初始化群组用户数量为1（创建者）
    await groupUsersRedis.setGroupCount(group.id, 1)
    res.json(group)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to create group')
  }
})

router.get('/conversation', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { otherUserId } = req.query
  try {
    const conversations = await db.conversation.findFirst({
      where: {
        AND: [
          {
            members: {
              some: { userId: userId as string },
            },
          },
          {
            members: {
              some: { userId: otherUserId as string },
            },
          },
        ],
      },
      include: {
        members: true,
        messages: true,
      },
    })
    res.json(conversations)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch conversation')
  }
})

router.get('/videoCount', requireAuth(), async (req, res) => {
  const { roomId } = req.query
  const videoRoomId = `video_${roomId}`
  try {
    const count = await groupVideoUsersRedis.getVideoRoomCount(videoRoomId)
    res.send(count)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to get video count')
  }
})

router.post('/initialUser', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  try {
    let user = await db.user.findUnique({
      where: {
        userId: userId as string,
      },
    })
    if (user) {
      return res.json(user)
    }
    const clerkUser = await clerkClient.users.getUser(userId as string)
    let code = ''
    let currentUser = null
    do {
      code = generateCode(1000000, 1999999)
      currentUser = await db.user.findUnique({
        where: {
          code,
        },
      })
    } while (currentUser)
    user = await db.user.create({
      data: {
        userId: userId as string,
        fullName: clerkUser.fullName as string,
        imageUrl: clerkUser.imageUrl,
        code,
        profile: {
          create: {},
        },
      },
    })
    const clientUser = await clerkClient.users.getUser(userId as string)
    const userName = clientUser.fullName
    const group = await db.group.create({
      data: {
        name: userName as string,
        ownerId: userId as string,
      },
    })
    // 初始化群组用户数量为1（创建者）
    await groupUsersRedis.setGroupCount(group.id, 1)
    res.json(user)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to create user')
  }
})

router.get('/isOnline', requireAuth(), async (req, res) => {
  const { userId } = req.query as { userId: string }
  try {
    const isOnline = await onlineUsersRedis.isOnline(userId)
    res.send(isOnline)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to check online status')
  }
})

router.get('/oss-signature', requireAuth(), async (_req, res) => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  const signature = client.calculatePostSignature({
    expiration: date.toISOString(),
    conditions: [['content-length-range', 0, 1024 * 1024 * 100]],
  })
  const location = (await client.getBucketLocation(config.bucket)).location
  const host = `https://${config.bucket}.${location}.aliyuncs.com`
  res.json({ ...signature, host })
})

router.post('/friendRequest', requireAuth(), async (req, res) => {
  const { userId: fromUserId } = getAuth(req)
  const { toUserId } = req.body
  try {
    const oldRequest = await db.newFriendRequest.findFirst({
      where: {
        fromUserId: fromUserId as string,
        toUserId: toUserId as string,
      },
    })
    if (oldRequest) {
      return res.json(oldRequest)
    }
    const request = await db.newFriendRequest.create({
      data: {
        fromUserId: fromUserId as string,
        toUserId: toUserId as string,
        state: RequestState.PENDING,
      },
    })
    res.json(request)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to newFriendRequest')
  }
})

router.get('/friendRequest', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  try {
    const requests = await db.newFriendRequest.findMany({
      where: {
        OR: [{ toUserId: userId as string }, { fromUserId: userId as string }],
      },
      include: {
        from: true,
        to: true,
      },
    })
    res.json(requests)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to friendRequest')
  }
})

router.patch('/profile', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req) as { userId: string }
  const { data } = req.body
  try {
    const profile = await db.profile.update({
      where: {
        userId,
      },
      data: {
        ...data,
      },
    })
    res.json(profile)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to profile')
  }
})

router.get('/canAccess', requireAuth(), async (req, res) => {
  const { groupId } = req.query as { groupId: string }
  const { userId } = getAuth(req) as { userId: string }
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    const isModerator = group.moderators.some((mod) => mod.userId === userId)
    const isMember = group.members.some((member) => member.userId === userId)
    if (isOwner || isModerator || isMember) {
      res.json(true)
    } else {
      res.json(false)
    }
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to check access')
  }
})

router.post('/groupMember', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { groupId } = req.body
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    const isModerator = group.moderators.some((mod) => mod.userId === userId)
    const isMember = group.members.some((member) => member.userId === userId)
    if (isOwner || isModerator || isMember) {
      return res.status(400).send('User is already a member of this group')
    }
    // 使用 connect 来添加用户到群组
    await db.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { userId: userId as string },
        },
      },
    })
    // 增加群组用户数量
    await groupUsersRedis.incrementGroupCount(groupId)
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to add group member')
  }
})

router.delete('/groupMember', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { groupId } = req.query as { groupId: string }
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    const isModerator = group.moderators.some((mod) => mod.userId === userId)
    const isMember = group.members.some((member) => member.userId === userId)
    if (!isOwner && !isModerator && !isMember) {
      return res.status(400).send('User is not a member of this group')
    }
    if (isOwner) {
      return res.status(400).send('Owner cannot leave the group')
    }
    // 使用 disconnect 来移除用户从群组
    await db.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { userId: userId as string },
        },
      },
    })
    // 减少群组用户数量
    await groupUsersRedis.decrementGroupCount(groupId)
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to remove group member')
  }
})

router.post('/groupModerator', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { groupId, moderatorUserId } = req.body
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    if (!isOwner) {
      return res.status(400).send('Only owner can add moderators')
    }
    const isModerator = group.moderators.some(
      (mod) => mod.userId === moderatorUserId,
    )
    if (isModerator) {
      return res.status(400).send('User is already a moderator')
    }
    // 使用 connect 来添加用户到群组
    await db.group.update({
      where: { id: groupId },
      data: {
        moderators: {
          connect: { userId: moderatorUserId as string },
        },
      },
    })
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to add group moderator')
  }
})

router.delete('/groupModerator', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { groupId, moderatorUserId } = req.query as {
    groupId: string
    moderatorUserId: string
  }
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    if (!isOwner) {
      return res.status(400).send('Only owner can remove moderators')
    }
    // 使用 disconnect 来移除用户从群组
    await db.group.update({
      where: { id: groupId },
      data: {
        moderators: {
          disconnect: { userId: moderatorUserId as string },
        },
      },
    })
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to remove group moderator')
  }
})

router.post('/groupKick', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { groupId, kickUserId } = req.body
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        owner: true,
        moderators: true,
        members: true,
      },
    })
    if (!group) {
      return res.status(404).send('Group not found')
    }
    const isOwner = group.ownerId === userId
    const isModerator = group.moderators.some((mod) => mod.userId === userId)
    if (!isOwner && !isModerator) {
      return res.status(400).send('Only owner and moderators can kick members')
    }
    // 使用 disconnect 来移除用户从群组
    await db.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { userId: kickUserId as string },
        },
      },
    })
    // 减少群组用户数量
    await groupUsersRedis.decrementGroupCount(groupId)
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to kick group member')
  }
})

router.get('/groupCount', requireAuth(), async (req, res) => {
  try {
    const { groupId } = req.query
    const count = await groupUsersRedis.getGroupCount(groupId as string)
    res.send(count)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to get group count')
  }
})

router.post('/chat', (req, res) => {
  const { messages }: { messages: Array<UIMessage> } = req.body
  const result = streamText({
    model: deepseek('deepseek-chat'),
    system: 'You are a expert assistant',
    messages: convertToModelMessages(messages),
  })
  result.pipeUIMessageStreamToResponse(res)
})

export default router
