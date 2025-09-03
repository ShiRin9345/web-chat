import db from '../../db.ts'
import { logger } from '../utils/logger.ts'
import { RequestState } from '@prisma/client'
import type {
  FriendRequestWithUsers,
  HandleFriendRequestRequest,
} from '../types/index.ts'

export class FriendService {
  async sendFriendRequest(fromUserId: string, toUserId: string) {
    try {
      // Check if request already exists
      const oldRequest = await db.newFriendRequest.findFirst({
        where: {
          fromUserId,
          toUserId,
        },
      })

      if (oldRequest) {
        return oldRequest
      }

      // Create new friend request
      const request = await db.newFriendRequest.create({
        data: {
          fromUserId,
          toUserId,
          state: RequestState.PENDING,
        },
      })

      logger.info('Friend request sent', {
        requestId: request.id,
        fromUserId,
        toUserId,
      })
      return request
    } catch (error) {
      logger.error(
        'Failed to send friend request',
        { fromUserId, toUserId },
        error as Error,
      )
      throw error
    }
  }

  async getFriendRequests(
    userId: string,
  ): Promise<Array<FriendRequestWithUsers>> {
    try {
      const requests = await db.newFriendRequest.findMany({
        where: {
          OR: [{ toUserId: userId }, { fromUserId: userId }],
        },
        include: {
          from: true,
          to: true,
        },
      })

      return requests
    } catch (error) {
      logger.error(
        'Failed to fetch friend requests',
        { userId },
        error as Error,
      )
      throw error
    }
  }

  async handleFriendRequest(data: HandleFriendRequestRequest): Promise<any> {
    try {
      const { request, state } = data

      // Update request state
      const updatedRequest = await db.newFriendRequest.update({
        where: { id: request.id },
        data: {
          state:
            state === 'agreed' ? RequestState.AGREED : RequestState.REJECTED,
        },
      })

      if (state === 'agreed') {
        // Add users as friends
        await db.user.update({
          where: { userId: request.fromUserId },
          data: {
            friends: {
              connect: { userId: request.toUserId },
            },
          },
        })

        await db.user.update({
          where: { userId: request.toUserId },
          data: {
            friends: {
              connect: { userId: request.fromUserId },
            },
          },
        })

        // Create conversation
        await db.conversation.create({
          data: {
            members: {
              connect: [
                { userId: request.fromUserId },
                { userId: request.toUserId },
              ],
            },
          },
        })

        logger.info('Friend request accepted', {
          requestId: request.id,
          fromUserId: request.fromUserId,
          toUserId: request.toUserId,
        })
      } else {
        logger.info('Friend request rejected', {
          requestId: request.id,
          fromUserId: request.fromUserId,
          toUserId: request.toUserId,
        })
      }

      return updatedRequest
    } catch (error) {
      logger.error('Failed to handle friend request', { data }, error as Error)
      throw error
    }
  }
}

export const friendService = new FriendService()
