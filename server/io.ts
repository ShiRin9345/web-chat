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

  // 新增：初始化时检查并清理异常的群组计数
  initializeGroupCounts()

  io.on('connection', (socket) => {
    socket.on('online', async () => {
      const newRefCount = await changeUserReference(socket, 1)
      console.log(
        `用户 ${socket.handshake.auth.userId} 连接，引用计数: ${newRefCount}`,
      )

      // 只有第一次连接时才增加群组计数
      if (newRefCount === 1) {
        await changeGroupOnlineCount(socket, 1, io)
      }

      io.emit(`${socket.handshake.auth.userId}_online`)
    })

    socket.on('disconnect', async () => {
      const newRefCount = await changeUserReference(socket, -1)
      console.log(
        `用户 ${socket.handshake.auth.userId} 断开，引用计数: ${newRefCount}`,
      )

      // 只有最后一个连接断开时才减少群组计数
      if (newRefCount === 0) {
        await changeGroupOnlineCount(socket, -1, io)
      }

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

// 将函数定义移到这里，在 io 变量初始化之后
async function changeGroupOnlineCount(
  socket: Socket,
  changeNum: number,
  ioInstance: Server,
) {
  const userId = socket.handshake.auth.userId as string

  console.log(
    `🔄 用户 ${userId} 群组计数变化: ${changeNum > 0 ? '+' : ''}${changeNum}`,
  )

  const groups = await db.group.findMany({
    where: {
      OR: [
        { members: { some: { userId } } },
        { moderators: { some: { userId } } },
        { ownerId: userId },
      ],
    },
  })

  console.log(
    ` 用户 ${userId} 所属群组:`,
    groups.map((g) => ({ id: g.id, name: g.name })),
  )

  for (const group of groups) {
    const currentCount = await groupUsersRedis.getGroupCount(group.id)
    console.log(`📈 群组 ${group.id} 当前计数: ${currentCount}`)

    // 新增：验证计数逻辑
    if (changeNum > 0 && currentCount > 0) {
      console.log(`⚠️  警告：群组 ${group.id} 计数异常，当前: ${currentCount}`)
      // 可以选择重置计数或跳过
      // await groupUsersRedis.setGroupCount(group.id, 0)
    }

    let newCount: number
    if (changeNum > 0) {
      newCount = await groupUsersRedis.incrementGroupCount(group.id)
      console.log(`➕ 群组 ${group.id} 计数增加到: ${newCount}`)
    } else {
      newCount = await groupUsersRedis.decrementGroupCount(group.id)
      console.log(`➖ 群组 ${group.id} 计数减少到: ${newCount}`)
    }

    ioInstance.emit(`${group.id}_count`, newCount)
  }
}

async function changeUserReference(socket: Socket, changeNum: number) {
  const userId = socket.handshake.auth.userId as string

  if (changeNum > 0) {
    // 增加引用计数
    const newCount = await onlineUsersRedis.incrementReferenceCount(userId)
    console.log(`用户 ${userId} 引用计数增加到: ${newCount}`)
    return newCount
  } else {
    // 减少引用计数
    const newCount = await onlineUsersRedis.decrementReferenceCount(userId)
    console.log(`用户 ${userId} 引用计数减少到: ${newCount}`)
    return newCount
  }
}

async function initializeGroupCounts() {
  try {
    console.log('🔍 初始化群组计数检查...')

    // 获取所有群组
    const groups = await db.group.findMany()

    for (const group of groups) {
      const currentCount = await groupUsersRedis.getGroupCount(group.id)
      if (currentCount > 0) {
        console.log(
          `⚠️  发现异常计数：群组 ${group.name} (${group.id}) 计数: ${currentCount}`,
        )
        // 重置为 0
        await groupUsersRedis.setGroupCount(group.id, 0)
        console.log(`✅ 已重置群组 ${group.name} 计数为 0`)
      }
    }

    console.log('✅ 群组计数初始化完成')
  } catch (error) {
    console.error('❌ 群组计数初始化失败:', error)
  }
}

export default io

export function getIo() {
  return io
}
