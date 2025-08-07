import express from 'express'
import db from './db.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/messages', async (req, res) => {
  try {
    const messages = await db.message.findMany()
    res.json(messages)
  } catch (e) {
    console.error(e)
    res.status(500).send('Something went wrong to fetch messages')
  }
})

export default router
