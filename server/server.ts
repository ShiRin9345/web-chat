// server.js
import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { instrument } from '@socket.io/admin-ui'
import router from './api.ts'
import { getIo, groupVideoUsers, initIo } from './io.ts'
import { ExpressPeerServer } from 'peer'

dotenv.config()

const app = express()
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
const server = createServer(app)
const peerServer = ExpressPeerServer(server, {
  path: '/',
})
peerServer.on('connection', (client) => {
  console.log('Peer connected: ', client.getId())
  const groupId = client.getId().split('_')[1]
  console.log(`Group ID: ${groupId}`)
  groupVideoUsers.set()
})
peerServer.on('disconnect', (client) => {
  console.log('Peer disconnected: ', client.getId())
})
app.use('/peerjs', peerServer)
initIo(server)

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`)
})

instrument(getIo(), {
  auth: false,
})
