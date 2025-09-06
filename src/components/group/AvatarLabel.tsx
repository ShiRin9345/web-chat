import React from 'react'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { Crown, Edit, Loader, ShieldUser } from 'lucide-react'
import type { User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import {
  changeRoleMutationOptions,
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

interface AvatarLabelProps {
  user: User
  type: 'member' | 'moderator' | 'owner'
  role: 'member' | 'moderator' | 'owner'
}

export const AvatarLabel: React.FC<AvatarLabelProps> = ({
  user,
  type,
  role,
}) => {
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
