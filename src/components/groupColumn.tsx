import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import type { User } from 'generated/index'
import type { GroupWithMembersAndModeratorsAndOwner } from '@/type'
import { useGroupColumnStore } from '@/store/useGroupColumnStore.ts'
import {
  groupWithMembersAndModeratorsAndOwnerQueryOptions,
  kickMutationOptions,
} from '@/features/reactQuery/options.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useUserOnline } from '@/hooks/useUserOnline.ts'
import { Status, StatusIndicator } from '@/components/ui/shadcn-io/status'
import { Badge } from '@/components/ui/badge.tsx'
import { Edit } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import type { UserResource } from '@clerk/types'
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

const GroupColumn = () => {
  const { open } = useGroupColumnStore()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: group } = useQuery(
    groupWithMembersAndModeratorsAndOwnerQueryOptions(groupId),
  )
  useGSAP(() => {
    gsap.to('#column', {
      width: open ? 320 : 0,
      duration: 0.2,
      ease: 'none',
    })
  }, [open])
  return (
    <div
      id="column"
      className="bg-zinc-100 border-l h-full flex gap-2 flex-col w-[320px] "
    >
      <h1 className="text-center font-bold text-xl border-b">{group?.name}</h1>
      <MemberList group={group} />
      <Button variant="destructive" className="mt-auto mx-8 mb-2">
        Quit
      </Button>
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
    <div className="flex flex-col gap-2 ml-2 max-h-[300px] overflow-y-auto pb-2 border-b">
      <h2 className="mb-2 font-medium whitespace-nowrap">
        Group members {userCount}
      </h2>
      {group && <AvatarLabel role={role} type="owner" user={group.owner} />}

      {group?.moderators.map((moderator) => (
        <AvatarLabel type="moderator" role={role} user={moderator} />
      ))}
      {group?.members.map((member) => (
        <AvatarLabel type="member" role={role} user={member} />
      ))}
    </div>
  )
}

interface AvatarLabelProps {
  user: User
  type: 'member' | 'moderator' | 'owner'
  role: 'member' | 'moderator' | 'owner'
}
function canEdit(
  role: string,
  self: UserResource | null | undefined,
  type: string,
  user: User,
): boolean {
  return (
    (role === 'owner' && self?.id !== user.userId) ||
    (role === 'moderator' && self?.id !== user.userId && type !== 'owner')
  )
}

const AvatarLabel: React.FC<AvatarLabelProps> = ({ user, type, role }) => {
  const { online } = useUserOnline(user)
  const { user: self } = useUser()
  const queryClient = useQueryClient()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { mutate } = useMutation(kickMutationOptions({ queryClient, groupId }))
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.imageUrl} alt="avatar" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <span className="text-sm text-zinc-500">{user.fullName}</span>
      <Status status={`${online ? 'online' : 'offline'}`}>
        <StatusIndicator />
      </Status>
      {type === 'owner' && <Badge variant="destructive">Owner</Badge>}
      {type === 'moderator' && <Badge variant="moderator">Moderator</Badge>}
      {canEdit(role, self, type, user) && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="cursor-pointer ">
              <Edit />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => mutate(user.userId)}>
                Kick
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>member</DropdownMenuItem>
                    {role === 'owner' && (
                      <DropdownMenuItem>moderator</DropdownMenuItem>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
