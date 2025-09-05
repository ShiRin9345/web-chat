import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  Crown,
  Edit,
  Loader,
  PanelLeftClose,
  PanelRightClose,
  ShieldUser,
  UserIcon,
  Users,
} from 'lucide-react'
import { Pill, PillIcon } from './ui/shadcn-io/pill'
import type { User } from 'generated/index'
import type { GroupWithMembersAndModeratorsAndOwner } from '@/type'
import type { UserResource } from '@clerk/types'
import { useGroupColumnStore } from '@/store/useGroupColumnStore.ts'
import {
  changeRoleMutationOptions,
  groupWithMembersAndModeratorsAndOwnerQueryOptions,
  kickMutationOptions,
} from '@/features/reactQuery/options.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useUserOnline } from '@/hooks/useUserOnline.ts'
import { Status, StatusIndicator } from '@/components/ui/shadcn-io/status'
import { Badge } from '@/components/ui/badge.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { useCountSocket } from '@/hooks/useCountSocket'

const GroupColumn = () => {
  const { open, changeOpen } = useGroupColumnStore()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: group } = useQuery(
    groupWithMembersAndModeratorsAndOwnerQueryOptions(groupId),
  )
  const count = useCountSocket(groupId)

  useGSAP(() => {
    gsap.set('#column', {
      width: open ? 320 : 0,
    })
  }, [])
  useGSAP(() => {
    gsap.to('#column', {
      width: open ? 320 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [open])

  return (
    <div
      id="column"
      className="bg-white relative dark:bg-gray-900 orange:bg-orange-50 border-l border-gray-200 dark:border-gray-700 orange:border-orange-200 h-full flex flex-col w-[320px] shadow-lg"
    >
      <div className="absolute -left-4  top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={changeOpen}
          className="group relative flex items-center justify-center cursor-pointer w-8 h-8 rounded-full bg-white dark:bg-gray-800 orange:bg-orange-100 border border-gray-200 dark:border-gray-600 orange:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {open ? (
            <PanelRightClose className="w-4 h-4 text-gray-600 dark:text-gray-300 orange:text-orange-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 orange:group-hover:text-orange-600 transition-colors duration-200" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-gray-600 dark:text-gray-300 orange:text-orange-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 orange:group-hover:text-orange-600 transition-colors duration-200" />
          )}

          {/* 悬停时的背景光晕效果 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20 orange:from-orange-500/20 orange:to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 orange:border-orange-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 orange:from-orange-50 orange:to-orange-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white orange:text-orange-900">
              {group?.name || 'Group'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 orange:text-orange-700">
              Group Chat
            </p>
          </div>
          <Pill className="bg-blue-50 dark:bg-blue-900/20 orange:bg-orange-100 text-blue-700 dark:text-blue-300 orange:text-orange-800 border-blue-200 dark:border-blue-700 orange:border-orange-300">
            <PillIcon icon={UserIcon} />
            <span className="text-xs font-medium">{count} online</span>
          </Pill>
        </div>

        {/* Group Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400 orange:text-orange-700">
              {group?.members.length || 0} members
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400 orange:text-orange-700">
              {group?.moderators.length || 0} moderators
            </span>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-hidden">
        <MemberList group={group} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 orange:border-orange-200 bg-gray-50 dark:bg-gray-800 orange:bg-orange-100">
        <Button
          variant="destructive"
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white"
        >
          Leave Group
        </Button>
      </div>
    </div>
  )
}

export default GroupColumn

interface MemberListProps {
  group: GroupWithMembersAndModeratorsAndOwner | undefined
}

const MemberList: React.FC<MemberListProps> = ({ group }) => {
  const userCount =
    (group?.members.length || 0) + (group?.moderators.length || 0) + 1
  const { user } = useUser()
  const role =
    user?.id === group?.owner.userId
      ? 'owner'
      : group?.moderators.some((moderator) => moderator.userId === user?.id)
        ? 'moderator'
        : 'member'

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 orange:text-orange-600" />
        <h2 className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
          Members ({userCount})
        </h2>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {/* Owner */}
        {group && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-amber-200 dark:border-amber-700 orange:border-orange-200">
            <AvatarLabel role={role} type="owner" user={group.owner} />
          </div>
        )}

        {/* Moderators */}
        {group?.moderators.map((moderator) => (
          <div
            key={moderator.id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-blue-200 dark:border-blue-700 orange:border-orange-200"
          >
            <AvatarLabel
              key={moderator.id}
              type="moderator"
              role={role}
              user={moderator}
            />
          </div>
        ))}

        {/* Members */}
        {group?.members.map((member) => (
          <div
            key={member.id}
            className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-gray-200 dark:border-gray-600 orange:border-orange-200"
          >
            <AvatarLabel
              key={member.id}
              type="member"
              role={role}
              user={member}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface AvatarLabelProps {
  user: User
  type: 'member' | 'moderator' | 'owner'
  role: 'member' | 'moderator' | 'owner'
}

const AvatarLabel: React.FC<AvatarLabelProps> = ({ user, type, role }) => {
  const { online } = useUserOnline(user)
  const { user: self } = useUser()
  const queryClient = useQueryClient()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { mutate, isPending } = useMutation(
    kickMutationOptions({ queryClient, groupId }),
  )
  const { mutate: roleMutate, isPending: isRolePending } = useMutation(
    changeRoleMutationOptions({
      userId: user.userId,
      groupId,
      queryClient,
    }),
  )

  function canEdit(
    role: string,
    self: UserResource | null | undefined,
    type: string,
    user: User,
  ): boolean {
    return (
      ((role === 'owner' && self?.id !== user.userId) ||
        (role === 'moderator' &&
          self?.id !== user.userId &&
          type !== 'owner')) &&
      !isPending &&
      !isRolePending
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <Avatar className="w-10  h-10 ring-2 ring-white dark:ring-gray-800 orange:ring-orange-100">
          <AvatarImage
            src={user.imageUrl}
            alt={user.fullName}
            className="object-cover"
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-medium">
            <Loader className="animate-spin" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1">
          <Status status={`${online ? 'online' : 'offline'}`}>
            <StatusIndicator />
          </Status>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900 dark:text-white orange:text-orange-900 truncate">
            {user.fullName}
          </span>
          {type === 'owner' && (
            <Badge variant="destructive" className="text-xs px-2 py-1">
              <Crown className="w-3 h-3 mr-1" />
              Owner
            </Badge>
          )}
          {type === 'moderator' && (
            <Badge
              variant="secondary"
              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 orange:bg-orange-100 orange:text-orange-800"
            >
              <ShieldUser className="w-3 h-3 mr-1" />
              Mod
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {(isPending || isRolePending) && (
          <Loader className="animate-spin w-4 h-4 text-gray-500" />
        )}

        {canEdit(role, self, type, user) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 orange:hover:bg-orange-200"
              >
                <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400 orange:text-orange-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => mutate(user.userId)}
                  className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                >
                  Remove Member
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => roleMutate('member')}>
                        Member
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => roleMutate('moderator')}>
                        Moderator
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}
