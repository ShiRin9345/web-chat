import { Server } from 'socket.io'
import type { HttpServer } from 'vite'

let io: Server

export function initIo(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  })

  io.on('connection', (socket) => {
    console.log(`socket ${socket.id} connected`)
  })
}
export default io
export function getIo() {
  return io
}
