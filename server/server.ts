// server.js
import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { instrument } from '@socket.io/admin-ui'
import { ExpressPeerServer } from 'peer'
import router from './api.ts'
import { getIo, groupVideoUsers, initIo } from './io.ts'
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

peer.on('connection', (client) => {
  console.log('Peer connected: ', client.getId())
  const tokenArr = client.getId().split('_')
  const groupId = tokenArr[tokenArr.length - 1]
  const roomId = `video_${groupId}`
  groupVideoUsers.set(roomId, (groupVideoUsers.get(roomId) || 0) + 1)
  console.log(Array.from(groupVideoUsers.keys()))
  const io = getIo()
  io.to(groupId).emit('user_join_video', groupVideoUsers.get(roomId))
})
peer.on('disconnect', (client) => {
  console.log('Peer disconnected: ', client.getId())
  const groupId = client.getId().split('_')[1]
  const roomId = `video_${groupId}`
  const io = getIo()
  groupVideoUsers.set(roomId, (groupVideoUsers.get(roomId) || 0) - 1)
  io.to(groupId).emit('user_leave_video', groupVideoUsers.get(roomId))
})
peerApp.use('/peerjs', peer)

server.listen(process.env.PORT, () => {
  const address = server.address() as AddressInfo
  console.log(`Listening on port ${address.port}`)
})

instrument(getIo(), {
  auth: false,
})
