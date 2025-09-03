import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

// Redis 连接配置
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
})

// 连接事件处理
redis.on('connect', () => {
  console.log('✅ Redis connected successfully')
})

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err)
})

redis.on('close', () => {
  console.log('🔌 Redis connection closed')
})

// 在线用户管理
export const onlineUsersRedis = {
  // 设置用户在线状态
  async setOnline(userId: string): Promise<void> {
    const key = `online:${userId}`
    await redis.setex(key, 3600, '1') // 1小时过期
  },

  // 设置用户离线状态
  async setOffline(userId: string): Promise<void> {
    const key = `online:${userId}`
    await redis.del(key)
  },

  // 检查用户是否在线
  async isOnline(userId: string): Promise<boolean> {
    const key = `online:${userId}`
    const exists = await redis.exists(key)
    return Boolean(exists)
  },

  // 获取在线用户数量
  async getOnlineCount(): Promise<number> {
    const keys = await redis.keys('online:*')
    return keys.length
  },

  // 获取所有在线用户ID
  async getOnlineUsers(): Promise<string[]> {
    const keys = await redis.keys('online:*')
    return keys.map(key => key.replace('online:', ''))
  }
}

// 群组用户管理
export const groupUsersRedis = {
  // 设置群组用户数量
  async setGroupCount(groupId: string, count: number): Promise<void> {
    const key = `group:${groupId}:count`
    await redis.set(key, count.toString())
  },

  // 增加群组用户数量
  async incrementGroupCount(groupId: string): Promise<number> {
    const key = `group:${groupId}:count`
    return await redis.incr(key)
  },

  // 减少群组用户数量
  async decrementGroupCount(groupId: string): Promise<number> {
    const key = `group:${groupId}:count`
    const result = await redis.decr(key)
    // 确保不会小于0
    if (result < 0) {
      await redis.set(key, '0')
      return 0
    }
    return result
  },

  // 获取群组用户数量
  async getGroupCount(groupId: string): Promise<number> {
    const key = `group:${groupId}:count`
    const count = await redis.get(key)
    return count ? parseInt(count) : 0
  },

  // 删除群组用户数量
  async deleteGroupCount(groupId: string): Promise<void> {
    const key = `group:${groupId}:count`
    await redis.del(key)
  }
}

// 视频房间用户管理
export const groupVideoUsersRedis = {
  // 设置视频房间用户数量
  async setVideoRoomCount(roomId: string, count: number): Promise<void> {
    const key = `video:${roomId}:count`
    await redis.set(key, count.toString())
  },

  // 增加视频房间用户数量
  async incrementVideoRoomCount(roomId: string): Promise<number> {
    const key = `video:${roomId}:count`
    return await redis.incr(key)
  },

  // 减少视频房间用户数量
  async decrementVideoRoomCount(roomId: string): Promise<number> {
    const key = `video:${roomId}:count`
    const result = await redis.decr(key)
    // 确保不会小于0
    if (result < 0) {
      await redis.set(key, '0')
      return 0
    }
    return result
  },

  // 获取视频房间用户数量
  async getVideoRoomCount(roomId: string): Promise<number> {
    const key = `video:${roomId}:count`
    const count = await redis.get(key)
    return count ? parseInt(count) : 0
  },

  // 删除视频房间用户数量
  async deleteVideoRoomCount(roomId: string): Promise<void> {
    const key = `video:${roomId}:count`
    await redis.del(key)
  }
}

// 清理过期数据
export const cleanupRedis = {
  // 清理过期的在线用户状态
  async cleanupExpiredOnlineUsers(): Promise<void> {
    // Redis 的 EXPIRE 会自动清理过期数据
    // 这里可以添加额外的清理逻辑
    console.log('🧹 Redis cleanup completed')
  }
}

export default redis
