import express from 'express'
import { clerkClient, getAuth, requireAuth } from '@clerk/express'
import { convertToModelMessages, streamText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import dotenv from 'dotenv'
import { RequestState } from '@prisma/client'
import db from './db.ts'
import { getIo, groupUsers, groupVideoUsers } from './io.ts'
import { client, config } from './oss-client.ts'
import type { GroupMessage, NewFriendRequest } from '@prisma/client'
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
        cursor: { id: cursor },
        skip: 1,
        take: Number(limit),
        orderBy: { createdAt: 'asc' },
      })
    } else {
      if (limit) {
        messages = await db.groupMessage.findMany({
          where: {
            groupId: groupId as string,
          },
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
        })
      } else {
        messages = await db.groupMessage.findMany({
          where: {
            groupId: groupId as string,
          },
          orderBy: { createdAt: 'asc' },
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

router.post('/groupMessages', requireAuth(), async (req, res) => {
  const { content, groupId, type } = req.body
  const { userId } = getAuth(req)
  try {
    const message = await db.groupMessage.create({
      data: {
        content,
        groupId,
        senderId: userId as string,
        type,
      },
    })
    const io = getIo()

    io.to(groupId).emit(`new_message`, message)

    res.json(message)
  } catch (e) {
    console.error(e)
  }
})

router.post('/handleRequest', requireAuth(), async (req, res) => {
  const { request, state } = req.body as {
    request: NewFriendRequest
    state: string
  }
  try {
    const newRequest = await db.newFriendRequest.update({
      where: {
        id: request.id,
      },
      data: {
        state: state === 'agreed' ? RequestState.AGREED : RequestState.REJECTED,
      },
    })
    return res.json(newRequest)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.get('/users', requireAuth(), async (req, res) => {
  const { name } = req.query
  try {
    const users = await db.user.findMany({
      where: {
        fullName: {
          contains: name as string,
          mode: 'insensitive',
        },
      },
    })
    res.json(users)
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong to fetch users')
  }
})

router.get('/groups', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  try {
    const groups = await db.group.findMany({
      where: {
        members: {
          some: {
            userId: userId as string,
          },
        },
      },
    })
    res.json(groups)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch groups')
  }
})

router.get('/groupCount', requireAuth(), async (req, res) => {
  res.send(groupUsers.get(req.query.groupId as string))
})

router.post('/group', requireAuth(), async (req, res) => {
  const { userId } = getAuth(req)
  const { name } = req.body
  const group = await db.group.create({
    data: {
      name,
      members: {
        connect: {
          userId: userId as string,
        },
      },
    },
  })
  groupUsers.set(group.id, 1)
  res.json(group)
})

router.get('/videoCount', requireAuth(), (req, res) => {
  const { groupId } = req.query
  const roomId = `video_${groupId}`
  res.send(groupVideoUsers.get(roomId) || 0)
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
    user = await db.user.create({
      data: {
        userId: userId as string,
        fullName: clerkUser.fullName as string,
        imageUrl: clerkUser.imageUrl,
      },
    })
    const clientUser = await clerkClient.users.getUser(userId as string)
    const userName = clientUser.fullName
    const group = await db.group.create({
      data: {
        name: userName as string,
        members: {
          connect: {
            userId: userId as string,
          },
        },
      },
    })
    groupUsers.set(group.id, 1)
    return res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong to initial user')
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
        toUserId: userId as string,
      },
      include: {
        from: true,
      },
    })
    res.json(requests)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to friendRequest')
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
