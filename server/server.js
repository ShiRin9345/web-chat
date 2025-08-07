const express = require('express')
const { createServer } = require('http')
const app = express()
const server = createServer(app)
const { Server } = require('socket.io')
const router = require('./api.js')
require('dotenv').config()
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
  socket.on('send', (message, room) => {
    if (room) {
      socket.to(room).emit('received', message)
    } else {
      socket.broadcast.emit('received', message)
    }
  })
})

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`)
})
