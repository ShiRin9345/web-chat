import { client, config } from '../../oss-client.ts'
import { logger } from '../utils/logger.ts'
import type { OSSSignature } from '../types/index.ts'

export class OSSService {
  async generateSignature(): Promise<OSSSignature> {
    try {
      const date = new Date()
      date.setDate(date.getDate() + 1)

      const signature = client.calculatePostSignature({
        expiration: date.toISOString(),
        conditions: [['content-length-range', 0, 1024 * 1024 * 100]],
      })

      const location = (await client.getBucketLocation(config.bucket)).location
      const host = `https://${config.bucket}.${location}.aliyuncs.com`
      logger.info('OSS signature generated successfully')
      return { ...signature, host }
    } catch (error) {
      logger.error('Failed to generate OSS signature', {}, error as Error)
      throw error
    }
  }
}

export const ossService = new OSSService()
