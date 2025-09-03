import db from '../../db.ts'
import { logger } from '../utils/logger.ts'
import type {
  GroupMessageWithSender,
  PrivateMessageWithSender,
  CreateGroupMessageRequest,
  CreatePrivateMessageRequest,
} from '../types/index.ts'

export class MessageService {
  // Group Messages
  async getGroupMessages(
    groupId: string,
    cursor?: string,
    limit?: number,
  ): Promise<{
    messages: Array<GroupMessageWithSender>
    nextCursor: string | null
    hasMore: boolean
  }> {
    try {
      let messages: Array<GroupMessageWithSender> = []

      if (cursor) {
        messages = await db.groupMessage.findMany({
          where: { groupId },
          cursor: { id: cursor },
          skip: 1,
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: { sender: true },
        })
      } else {
        messages = await db.groupMessage.findMany({
          where: { groupId },
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: { sender: true },
        })
      }

      const hasMore = messages.length === Number(limit)
      const nextCursor = hasMore ? messages[messages.length - 1].id : null

      return { messages, nextCursor, hasMore }
    } catch (error) {
      logger.error(
        'Failed to fetch group messages',
        { groupId, cursor, limit },
        error as Error,
      )
      throw error
    }
  }

  async createGroupMessage(
    data: CreateGroupMessageRequest,
    senderId: string,
  ): Promise<GroupMessageWithSender> {
    try {
      const message = await db.groupMessage.create({
        data: {
          content: data.content,
          groupId: data.groupId,
          senderId,
          type: data.type,
        },
        include: { sender: true },
      })

      logger.info('Group message created', {
        messageId: message.id,
        groupId: data.groupId,
        senderId,
      })
      return message
    } catch (error) {
      logger.error(
        'Failed to create group message',
        { data, senderId },
        error as Error,
      )
      throw error
    }
  }

  // Private Messages
  async getPrivateMessages(
    userId: string,
    otherUserId: string,
    cursor?: string,
    limit?: number,
  ): Promise<{
    messages: Array<PrivateMessageWithSender>
    nextCursor: string | null
    hasMore: boolean
  }> {
    try {
      let messages: Array<PrivateMessageWithSender> = []

      if (cursor) {
        messages = await db.privateMessage.findMany({
          where: {
            OR: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId },
            ],
          },
          cursor: { id: cursor },
          skip: 1,
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: { sender: true },
        })
      } else {
        messages = await db.privateMessage.findMany({
          where: {
            OR: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId },
            ],
          },
          take: Number(limit),
          orderBy: { createdAt: 'asc' },
          include: { sender: true },
        })
      }

      const hasMore = messages.length === Number(limit)
      const nextCursor = hasMore ? messages[messages.length - 1].id : null

      return { messages, nextCursor, hasMore }
    } catch (error) {
      logger.error(
        'Failed to fetch private messages',
        { userId, otherUserId, cursor, limit },
        error as Error,
      )
      throw error
    }
  }

  async createPrivateMessage(
    data: CreatePrivateMessageRequest,
    senderId: string,
  ): Promise<PrivateMessageWithSender> {
    try {
      const message = await db.privateMessage.create({
        data: {
          senderId,
          receiverId: data.friendUserId,
          content: data.content,
          type: data.type,
          conversationId: data.conversationId,
        },
        include: { sender: true },
      })

      logger.info('Private message created', {
        messageId: message.id,
        conversationId: data.conversationId,
        senderId,
      })
      return message
    } catch (error) {
      logger.error(
        'Failed to create private message',
        { data, senderId },
        error as Error,
      )
      throw error
    }
  }
}

export const messageService = new MessageService()
