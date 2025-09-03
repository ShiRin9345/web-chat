import db from '../../db.ts'
import { logger } from '../utils/logger.ts'
import type { ConversationWithRelations } from '../types/index.ts'

export class ConversationService {
  async getConversation(
    userId: string,
    otherUserId: string,
  ): Promise<ConversationWithRelations | null> {
    try {
      const conversation = await db.conversation.findFirst({
        where: {
          AND: [
            {
              members: {
                some: { userId },
              },
            },
            {
              members: {
                some: { userId: otherUserId },
              },
            },
          ],
        },
        include: {
          members: true,
          messages: true,
        },
      })

      return conversation
    } catch (error) {
      logger.error(
        'Failed to fetch conversation',
        { userId, otherUserId },
        error as Error,
      )
      throw error
    }
  }
}

export const conversationService = new ConversationService()
