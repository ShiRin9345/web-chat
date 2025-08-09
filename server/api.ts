import express from 'express'
import { requireAuth } from '@clerk/express'
import db from './db.ts'
import { getIo } from './io.ts'

const router = express.Router()

router.get('/messages', async (_req, res) => {
  try {
    const messages = await db.message.findMany()
    res.json(messages)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

router.post('/messages', requireAuth(), async (req, res) => {
  const content = req.body.content
  try {
    const message = await db.message.create({
      data: {
        content,
      },
    })
    const io = getIo()

    io.emit('group', message)

    res.json(message)
  } catch (e) {
    console.error(e)
  }
})

export default router
