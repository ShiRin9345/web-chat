import { Server } from 'socket.io'
import db from './db.ts'
import type { HttpServer } from 'vite'

let io: Server
export const onlineUsers = new Set<string>()
export const groupUsers = new Map<string, number>()

export function initIo(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    socket.on('online', async () => {
      onlineUsers.add(socket.handshake.auth.userId)
      console.log(onlineUsers.size)
      const groups = await db.group.findMany({
        where: {
          members: {
            some: {
              userId: socket.handshake.auth.userId,
            },
          },
        },
      })
      for (const group of groups) {
        const oldCount = groupUsers.get(group.id) || 0
        groupUsers.set(group.id, oldCount + 1)
        io.emit(`${group.id}_count`, oldCount + 1)
      }
    })
    socket.on('disconnect', async () => {
      onlineUsers.delete(socket.handshake.auth.userId)
      console.log(onlineUsers.size)
      const groups = await db.group.findMany({
        where: {
          members: {
            some: {
              userId: socket.handshake.auth.userId,
            },
          },
        },
      })
      for (const group of groups) {
        const oldCount = groupUsers.get(group.id) || 0
        groupUsers.set(group.id, oldCount - 1)
        io.emit(`${group.id}_count`, oldCount - 1)
      }
    })
    console.log(`socket ${socket.id} connected`)
  })
}
export default io
export function getIo() {
  return io
}
