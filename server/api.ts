import express from 'express'
import { clerkClient, getAuth, requireAuth } from '@clerk/express'
import db from './db.ts'
import { getIo } from './io.ts'

const router = express.Router()

router.get('/groupMessages', requireAuth(), async (_req, res) => {
  try {
    const messages = await db.groupMessage.findMany()
    res.json(messages)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/groupMessages', requireAuth(), async (req, res) => {
  const content = req.body.content
  const groupId = req.params.groupId
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

    io.emit('group', message)

    res.json(message)
  } catch (e) {
    console.error(e)
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
      },
    })
    return res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wrong to initial user')
  }
})

export default router
