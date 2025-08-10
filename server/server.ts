// server.js
import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import { instrument } from '@socket.io/admin-ui'
import router from './api.ts'
import { getIo, initIo } from './io.ts'

dotenv.config()

const app = express()
app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
const server = createServer(app)
initIo(server)

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`)
})

instrument(getIo(), {
  auth: false,
})
