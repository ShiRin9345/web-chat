import { createServer } from 'node:http'
import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import { instrument } from '@socket.io/admin-ui'
import { ExpressPeerServer } from 'peer'
import type { AddressInfo } from 'node:net'

import { config } from './config/index.ts'
import router from './routes/index.ts'
import { getIo, groupVideoUsers, initIo } from '../io.ts'
import { errorHandler } from './utils/errorHandler.ts'
import { logger } from './utils/logger.ts'

const app = express()

// Middleware
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', router)

// Error handling middleware (must be last)
app.use(errorHandler)

// Create HTTP server
const server = createServer(app)

// Initialize Socket.IO
initIo(server)

// Initialize Peer Server
const peerApp = express()
const peerServer = peerApp.listen(config.peerServer.port)

const peer = ExpressPeerServer(peerServer, {
  path: config.peerServer.path,
})

peer.on('connection', (client) => {
  const tokenArr = client.getId().split('_')
  const groupId = tokenArr[tokenArr.length - 1]
  const roomId = `video_${groupId}`

  groupVideoUsers.set(roomId, (groupVideoUsers.get(roomId) || 0) + 1)

  const io = getIo()
  io.to(groupId).emit('user_join_video', groupVideoUsers.get(roomId))

  logger.info('Peer connected', { peerId: client.getId(), groupId, roomId })
})

peer.on('disconnect', (client) => {
  const groupId = client.getId().split('_')[1]
  const roomId = `video_${groupId}`

  const io = getIo()
  groupVideoUsers.set(roomId, (groupVideoUsers.get(roomId) || 0) - 1)
  io.to(groupId).emit('user_leave_video', groupVideoUsers.get(roomId))

  logger.info('Peer disconnected', { peerId: client.getId(), groupId, roomId })
})

peerApp.use('/peerjs', peer)

// Start server
server.listen(config.port, () => {
  const address = server.address() as AddressInfo
  logger.info(`Server started successfully`, {
    port: address.port,
    environment: config.nodeEnv,
    peerServerPort: config.peerServer.port,
  })
})

// Socket.IO Admin UI
instrument(getIo(), {
  auth: false,
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })
})
