import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

async function testRedis() {
  console.log('🧪 Testing Redis connection...')

  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  })

  try {
    // 测试连接
    await redis.ping()
    console.log('✅ Redis connection successful!')

    // 测试基本操作
    await redis.set('test:key', 'test:value')
    const value = await redis.get('test:key')
    console.log('✅ Redis set/get test passed:', value)

    // 测试过期时间
    await redis.setex('test:expire', 5, 'will expire in 5 seconds')
    console.log('✅ Redis expire test passed')

    // 测试计数器
    const count = await redis.incr('test:counter')
    console.log('✅ Redis counter test passed:', count)

    // 清理测试数据
    await redis.del('test:key', 'test:expire', 'test:counter')
    console.log('✅ Redis cleanup completed')

    console.log('🎉 All Redis tests passed!')
  } catch (error) {
    console.error('❌ Redis test failed:', error.message)
    process.exit(1)
  } finally {
    await redis.quit()
    console.log('🔌 Redis connection closed')
  }
}

testRedis()
