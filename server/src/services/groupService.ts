import db from '../../db.ts'
import { generateCode } from '../../util/generateCode.ts'
import { logger } from '../utils/logger.ts'
import type {
  CreateGroupRequest,
  GroupWithRelations,
  KickUserRequest,
  UpdateRoleRequest,
} from '../types/index.ts'

export class GroupService {
  async getGroups(userId: string): Promise<Array<GroupWithRelations>> {
    try {
      const groups = await db.group.findMany({
        where: {
          OR: [
            {
              members: {
                some: { userId },
              },
            },
            {
              moderators: {
                some: { userId },
              },
            },
            {
              ownerId: userId,
            },
          ],
        },
        include: {
          members: true,
          owner: true,
          moderators: true,
        },
      })

      return groups
    } catch (error) {
      logger.error('Failed to fetch groups', { userId }, error as Error)
      throw error
    }
  }

  async getGroup(groupId: string): Promise<GroupWithRelations | null> {
    try {
      const group = await db.group.findUnique({
        where: { id: groupId },
        include: {
          members: true,
          owner: true,
          moderators: true,
        },
      })

      return group
    } catch (error) {
      logger.error('Failed to fetch group', { groupId }, error as Error)
      throw error
    }
  }

  async createGroup(data: CreateGroupRequest, ownerId: string) {
    try {
      // Generate unique code in [2000000, 3000000]
      let code = ''
      let existing: any = null
      do {
        code = generateCode(2000000, 3000000)
        existing = await db.group.findUnique({ where: { code } })
      } while (existing)

      const group = await db.group.create({
        data: {
          name: data.name,
          ownerId,
          code,
          imageUrl: data.imageUrl,
        },
      })

      logger.info('Group created successfully', {
        groupId: group.id,
        name: data.name,
        ownerId,
        code,
      })
      return group
    } catch (error) {
      logger.error('Failed to create group', { data, ownerId }, error as Error)
      throw error
    }
  }

  async kickUser(data: KickUserRequest): Promise<GroupWithRelations> {
    try {
      const group = await db.group.findUnique({
        where: { id: data.groupId },
        include: {
          members: true,
          moderators: true,
        },
      })

      if (!group) {
        throw new Error('Group not found')
      }

      const isModerator = group.moderators.some((m) => m.userId === data.userId)
      const isMember = group.members.some((m) => m.userId === data.userId)

      if (!isMember && !isModerator) {
        throw new Error('User is not in this group')
      }

      const updatedGroup = await db.group.update({
        where: { id: data.groupId },
        data: {
          members: {
            disconnect: isMember ? { userId: data.userId } : undefined,
          },
          moderators: {
            disconnect: isModerator ? { userId: data.userId } : undefined,
          },
        },
        include: { members: true, moderators: true, owner: true },
      })

      logger.info('User kicked from group', {
        groupId: data.groupId,
        userId: data.userId,
      })
      return updatedGroup
    } catch (error) {
      logger.error('Failed to kick user', { data }, error as Error)
      throw error
    }
  }

  async updateUserRole(data: UpdateRoleRequest): Promise<GroupWithRelations> {
    try {
      // Remove user from current roles
      await db.group.update({
        where: { id: data.groupId },
        data: {
          members: { disconnect: { userId: data.userId } },
          moderators: { disconnect: { userId: data.userId } },
        },
      })

      // Add user to new role
      const newGroup = await db.group.update({
        where: { id: data.groupId },
        data: {
          ...(data.role === 'member'
            ? { members: { connect: { userId: data.userId } } }
            : { moderators: { connect: { userId: data.userId } } }),
        },
        include: {
          owner: true,
          moderators: true,
          members: true,
        },
      })

      logger.info('User role updated', {
        groupId: data.groupId,
        userId: data.userId,
        newRole: data.role,
      })
      return newGroup
    } catch (error) {
      logger.error('Failed to update user role', { data }, error as Error)
      throw error
    }
  }

  async canAccessGroup(groupId: string, userId: string): Promise<boolean> {
    try {
      const group = await db.group.findUnique({
        where: { id: groupId },
        include: {
          owner: true,
          moderators: true,
          members: true,
        },
      })

      if (!group) {
        return false
      }

      const hasAccess =
        group.owner.userId === userId ||
        group.moderators.some((m) => m.userId === userId) ||
        group.members.some((m) => m.userId === userId)

      return hasAccess
    } catch (error) {
      logger.error(
        'Failed to check group access',
        { groupId, userId },
        error as Error,
      )
      return false
    }
  }

  async getGroupMemberCount(
    groupId: string,
    groupUsers: Map<string, number>,
  ): Promise<number> {
    return groupUsers.get(groupId) || 0
  }

  async getVideoUserCount(
    groupId: string,
    groupVideoUsers: Map<string, number>,
  ): Promise<number> {
    const videoRoomId = `video_${groupId}`
    return groupVideoUsers.get(videoRoomId) || 0
  }

  async leaveGroup(
    data: { groupId: string },
    userId: string,
  ): Promise<{ success: boolean; deleted?: boolean }> {
    try {
      const group = await db.group.findUnique({
        where: { id: data.groupId },
        include: { owner: true, members: true, moderators: true },
      })

      if (!group) {
        throw new Error('Group not found')
      }

      if (group.ownerId === userId) {
        // User is the owner, delete the entire group
        await db.group.delete({
          where: { id: data.groupId },
        })
        logger.info('Group deleted by owner', {
          groupId: data.groupId,
          ownerId: userId,
        })
        return { success: true, deleted: true }
      } else {
        // User is a member or moderator, remove them from the group
        const isModerator = group.moderators.some((m) => m.userId === userId)
        const isMember = group.members.some((m) => m.userId === userId)

        if (!isMember && !isModerator) {
          throw new Error('User is not a member or moderator of this group')
        }

        await db.group.update({
          where: { id: data.groupId },
          data: {
            members: {
              disconnect: isMember ? { userId } : undefined,
            },
            moderators: {
              disconnect: isModerator ? { userId } : undefined,
            },
          },
        })
        logger.info('User left group', { groupId: data.groupId, userId })
        return { success: true, deleted: false }
      }
    } catch (error) {
      logger.error('Failed to leave group', { data, userId }, error as Error)
      throw error
    }
  }
}

export const groupService = new GroupService()
