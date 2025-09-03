import { convertToModelMessages, streamText } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
import { logger } from '../utils/logger.ts'
import type { ChatRequest } from '../types/index.ts'

export class AIService {
  async streamChat(messages: ChatRequest['messages'], res: any) {
    try {
      const result = streamText({
        model: deepseek('deepseek-chat'),
        system: 'You are a expert assistant',
        messages: convertToModelMessages(messages),
      })

      result.pipeUIMessageStreamToResponse(res)
      logger.info('AI chat stream started')
    } catch (error) {
      logger.error('Failed to start AI chat stream', {}, error as Error)
      throw error
    }
  }
}

export const aiService = new AIService()
