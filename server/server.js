// server.js
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import router from './api.js'
import db from './db.js'
dotenv.config()

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`)
  socket.on('send', async (message, room) => {
    const newMessage = await db.message.create({
      data: {
        content: message,
      },
    })
    if (room) {
      socket.to(room).emit('received', newMessage)
    } else {
      io.emit('received', newMessage)
    }
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`)
  console.log(db.message.findMany)
})
