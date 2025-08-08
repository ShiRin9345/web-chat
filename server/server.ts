// server.js
import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import router from './api.ts'
import { initIo } from './io.ts'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
const server = createServer(app)
initIo(server)

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`)
})
