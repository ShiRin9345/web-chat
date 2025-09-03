import { Server } from 'socket.io'
import db from '../db.ts'
import { logger } from './utils/logger.ts'
import type { Socket } from 'socket.io'
import type { HttpServer } from 'vite'

let io: Server

// User tracking maps
export const onlineUsers = new Map<string, number>()
export const groupUsers = new Map<string, number>()
export const groupVideoUsers = new Map<string, number>()

export function initIo(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    logger.info('Socket connected', {
      socketId: socket.id,
      userId: socket.handshake.auth.userId,
    })

    socket.on('online', async () => {
      const newRefCount = changeUserReference(socket, 1)
      if (newRefCount > 1) {
        return
      }
      await changeGroupOnlineCount(socket, 1)
      io.emit(`${socket.handshake.auth.userId}_online`)

      logger.info('User went online', {
        userId: socket.handshake.auth.userId,
        refCount: newRefCount,
      })
    })

    socket.on('disconnect', async () => {
      const newRefCount = changeUserReference(socket, -1)
      if (newRefCount >= 1) {
        return
      }
      onlineUsers.delete(socket.handshake.auth.userId)
      await changeGroupOnlineCount(socket, -1)
      io.emit(`${socket.handshake.auth.userId}_offline`)

      logger.info('User went offline', {
        userId: socket.handshake.auth.userId,
        refCount: newRefCount,
      })
    })

    socket.on('join_video_room', (groupId: string, id: string) => {
      const roomId = `video_${groupId}`
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user_connected', id)

      logger.info('User joined video room', { userId: id, groupId, roomId })
    })

    socket.on('leave_video_room', (groupId: string) => {
      const roomId = `video_${groupId}`
      socket.leave(roomId)

      logger.info('User left video room', {
        userId: socket.handshake.auth.userId,
        groupId,
        roomId,
      })
    })

    socket.on('join_group', (groupId: string) => {
      socket.join(groupId)
      logger.info('User joined group', {
        userId: socket.handshake.auth.userId,
        groupId,
      })
    })

    socket.on('leave_group', (groupId: string) => {
      socket.leave(groupId)
      logger.info('User left group', {
        userId: socket.handshake.auth.userId,
        groupId,
      })
    })
  })
}

export default io

export function getIo() {
  return io
}

async function changeGroupOnlineCount(socket: Socket, changeNum: number) {
  const userId = socket.handshake.auth.userId as string

  try {
    const groups = await db.group.findMany({
      where: {
        OR: [
          {
            members: {
              some: { userId },
            },
          },
          {
            moderators: {
              some: { userId },
            },
          },
          {
            ownerId: userId,
          },
        ],
      },
    })

    for (const group of groups) {
      const oldCount = groupUsers.get(group.id) || 0
      const newCount = oldCount + changeNum
      groupUsers.set(group.id, newCount)
      io.emit(`${group.id}_count`, newCount)

      logger.debug('Group user count updated', {
        groupId: group.id,
        oldCount,
        newCount,
        userId,
      })
    }
  } catch (error) {
    logger.error(
      'Failed to update group online count',
      { userId, changeNum },
      error as Error,
    )
  }
}

function changeUserReference(socket: Socket, changeNum: number): number {
  const userId = socket.handshake.auth.userId as string
  const oldRefCount = onlineUsers.get(userId) || 0
  const newRefCount = oldRefCount + changeNum

  if (newRefCount <= 0) {
    onlineUsers.delete(userId)
  } else {
    onlineUsers.set(userId, newRefCount)
  }

  return newRefCount
}
