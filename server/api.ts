import express from 'express'
import { clerkClient, getAuth, requireAuth } from '@clerk/express'
import db from './db.ts'
import { getIo } from './io.ts'

const router = express.Router()

router.get('/groupMessages', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req)
    const groupId = req.query.groupId as string
    const messages = await db.groupMessage.findMany({
      where: {
        groupId,
        senderId: userId as string,
      },
    })
    res.json(messages)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/groupMessages', requireAuth(), async (req, res) => {
  const content = req.body.content
  const groupId = req.body.groupId
  const { userId } = getAuth(req)
  try {
    const message = await db.groupMessage.create({
      data: {
        content,
        groupId,
        senderId: userId as string,
      },
    })
    const io = getIo()

    io.emit(`${groupId}_add_messages`, message)

    res.json(message)
  } catch (e) {
    console.error(e)
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
    user = await db.user.create({
      data: {
        userId: userId as string,
      },
    })
    const clientUser = await clerkClient.users.getUser(userId as string)
    const userName = clientUser.fullName
    await db.group.create({
      data: {
        name: userName as string,
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    })
    return res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong to initial user')
  }
})

export default router
