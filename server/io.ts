import { Server } from 'socket.io'
import db from './db.ts'
import { groupUsersRedis, onlineUsersRedis } from './redis.ts'
import type { Socket } from 'socket.io'
import type { HttpServer } from 'vite'

let io: Server

export function initIo(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    socket.on('online', async () => {
      const newRefCount = await changeUserReference(socket, 1)
      if (newRefCount > 1) {
        return
      }
      await changeGroupOnlineCount(socket, 1)
      io.emit(`${socket.handshake.auth.userId}_online`)
    })

    socket.on('disconnect', async () => {
      const newRefCount = await changeUserReference(socket, -1)
      if (newRefCount >= 1) {
        return
      }
      await onlineUsersRedis.setOffline(socket.handshake.auth.userId)
      await changeGroupOnlineCount(socket, -1)
      io.emit(`${socket.handshake.auth.userId}_offline`)
    })

    socket.on('join_video_room', (groupId: string, id: string) => {
      const roomId = `video_${groupId}`
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user_connected', id)
    })

    socket.on('leave_video_room', (groupId: string) => {
      const roomId = `video_${groupId}`
      socket.leave(roomId)
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
      OR: [
        {
          members: {
            some: {
              userId,
            },
          },
        },
        {
          moderators: {
            some: {
              userId,
            },
          },
        },
        {
          ownerId: userId,
        },
      ],
    },
  })

  for (const group of groups) {
    let newCount: number
    if (changeNum > 0) {
      newCount = await groupUsersRedis.incrementGroupCount(group.id)
    } else {
      newCount = await groupUsersRedis.decrementGroupCount(group.id)
    }
    io.emit(`${group.id}_count`, newCount)
  }
}

async function changeUserReference(socket: Socket, changeNum: number) {
  const userId = socket.handshake.auth.userId as string

  if (changeNum > 0) {
    await onlineUsersRedis.setOnline(userId)
    return 1
  } else {
    await onlineUsersRedis.setOffline(userId)
    return 0
  }
}
