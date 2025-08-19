import { Server } from 'socket.io'
import db from './db.ts'
import type { Socket } from 'socket.io'
import type { HttpServer } from 'vite'

let io: Server
// one user can open many tabs in a single window, so one userId can be used by many socket
export const onlineUsers = new Map<string, number>()
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
      const newRefCount = changeUserReference(socket, 1)
      if (newRefCount > 1) {
        return
      }
      await changeGroupOnlineCount(socket, 1)
    })
    socket.on('disconnect', async () => {
      const newRefCount = changeUserReference(socket, -1)
      if (newRefCount >= 1) {
        return
      }
      onlineUsers.delete(socket.handshake.auth.userId)
      await changeGroupOnlineCount(socket, -1)
    })
    socket.on('join_video_room', (groupId: string, id: string) => {
      socket.join(groupId)
      socket.broadcast.to(groupId).emit('user_connected', id)
    })
    socket.on('leave_video_room', (groupId: string) => {
      socket.leave(groupId)
    })
    socket.on('join_group', (groupId: string) => {
      socket.join(groupId)
    })
    socket.on('leave_group', (groupId: string) => {
      socket.leave(groupId)
    })
    console.log(`socket ${socket.id} connected`)
  })
}
export default io
export function getIo() {
  return io
}

async function changeGroupOnlineCount(socket: Socket, changeNum: number) {
  const userId = socket.handshake.auth.userId as string
  const groups = await db.group.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })
  for (const group of groups) {
    const oldCount = groupUsers.get(group.id) || 0
    groupUsers.set(group.id, oldCount + changeNum)
    io.emit(`${group.id}_count`, oldCount + changeNum)
  }
}

function changeUserReference(socket: Socket, changeNum: number) {
  const oldRefCount = onlineUsers.get(socket.handshake.auth.userId) || 0
  const newRefCount = oldRefCount + changeNum
  const userId = socket.handshake.auth.userId as string
  onlineUsers.set(userId, newRefCount)
  return newRefCount
}
