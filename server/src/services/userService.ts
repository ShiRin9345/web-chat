import { clerkClient } from '@clerk/express'
import db from '../../db.ts'
import { logger } from '../utils/logger.ts'
import { generateCode } from '../../util/generateCode.ts'
import type { UpdateProfileRequest } from '../types/index.ts'

export class UserService {
  async getFriends(userId: string) {
    try {
      const userWithFriends = await db.user.findUnique({
        where: { userId },
        include: {
          friends: {
            select: {
              id: true,
              userId: true,
              fullName: true,
              imageUrl: true,
            },
          },
        },
      })

      return userWithFriends?.friends || []
    } catch (error) {
      logger.error('Failed to fetch friends', { userId }, error as Error)
      throw error
    }
  }

  async searchUsers(name: string) {
    try {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              fullName: {
                contains: name,
                mode: 'insensitive',
              },
            },
            {
              code: name,
            },
          ],
        },
      })

      return users
    } catch (error) {
      logger.error('Failed to search users', { name }, error as Error)
      throw error
    }
  }

  async initializeUser(userId: string) {
    try {
      // Check if user already exists
      let user = await db.user.findUnique({
        where: { userId },
      })

      if (user) {
        return user
      }

      // Get user info from Clerk
      const clerkUser = await clerkClient.users.getUser(userId)

      // Generate unique code
      let code = ''
      let currentUser = null
      do {
        code = generateCode(1000000, 1999999)
        currentUser = await db.user.findUnique({
          where: { code },
        })
      } while (currentUser)

      // Create user
      user = await db.user.create({
        data: {
          userId,
          fullName: clerkUser.fullName as string,
          imageUrl: clerkUser.imageUrl,
          code,
          profile: {
            create: {},
          },
        },
      })

      // Create personal group
      const group = await db.group.create({
        data: {
          name: clerkUser.fullName as string,
          ownerId: userId,
        },
      })

      logger.info('User initialized successfully', {
        userId,
        code,
        groupId: group.id,
      })
      return user
    } catch (error) {
      logger.error('Failed to initialize user', { userId }, error as Error)
      throw error
    }
  }

  async getProfile(userId: string) {
    try {
      const profile = await db.profile.findUnique({
        where: { userId },
      })

      return profile
    } catch (error) {
      logger.error('Failed to fetch profile', { userId }, error as Error)
      throw error
    }
  }

  async updateProfile(userId: string, data: UpdateProfileRequest['data']) {
    try {
      const profile = await db.profile.update({
        where: { userId },
        data,
      })

      logger.info('Profile updated successfully', { userId, data })
      return profile
    } catch (error) {
      logger.error('Failed to update profile', { userId, data }, error as Error)
      throw error
    }
  }

  async checkOnlineStatus(userId: string, onlineUsers: Set<string>) {
    return onlineUsers.has(userId)
  }
}

export const userService = new UserService()
