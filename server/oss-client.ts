import dotenv from 'dotenv'
import OSS from 'ali-oss'

dotenv.config()
export const config = {
  region: 'oss-cn-beijing',
  bucket: 'shirin-123',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
}

export const client = new OSS(config)
