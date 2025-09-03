// server.js
import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { instrument } from '@socket.io/admin-ui'
import { ExpressPeerServer } from 'peer'
import router from './api.ts'
import { getIo, initIo } from './io.ts'
import { groupVideoUsersRedis } from './redis.ts'
import type { AddressInfo } from 'node:net'

dotenv.config()

const app = express()
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
const server = createServer(app)
initIo(server)
const peerApp = express()
const peerServer = peerApp.listen(5174)

const peer = ExpressPeerServer(peerServer, {
  path: '/',
})

peer.on('connection', async (client) => {
  const tokenArr = client.getId().split('_')
  const groupId = tokenArr[tokenArr.length - 1]
  const roomId = `video_${groupId}`
  const count = await groupVideoUsersRedis.incrementVideoRoomCount(roomId)
  const io = getIo()
  io.to(groupId).emit('user_join_video', count)
})

peer.on('disconnect', async (client) => {
  const groupId = client.getId().split('_')[1]
  const roomId = `video_${groupId}`
  const io = getIo()
  const count = await groupVideoUsersRedis.decrementVideoRoomCount(roomId)
  io.to(groupId).emit('user_leave_video', count)
})

peerApp.use('/peerjs', peer)

server.listen(process.env.PORT, () => {
  const address = server.address() as AddressInfo
  console.log(`Listening on port ${address.port}`)
})

instrument(getIo(), {
  auth: false,
})
