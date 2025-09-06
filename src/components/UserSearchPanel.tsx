import { useState } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowRight, Check, Loader, UserIcon, Users } from 'lucide-react'
import type { Group, User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

interface Props {
  currentUserId?: string
  currentFriends?: Array<User>
  currentGroups?: Array<Group>
  onAdd: (userId: string) => Promise<void>
  onJoinGroup?: (groupId: string) => Promise<void>
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function UserSearchPanel({
  currentUserId,
  currentFriends,
  currentGroups,
  onAdd,
  onJoinGroup,
}: Props) {
  const [userResults, setUserResults] = useState<Array<User>>([])
  const [groupResults, setGroupResults] = useState<Array<Group>>([])
  const [isSearching, setIsSearching] = useState(false)
  const [groupMembershipStatus, setGroupMembershipStatus] = useState<
    Record<string, boolean>
  >({})

  // 检查群组成员状态
  const checkGroupMembership = async (groupId: string) => {
    try {
      const response = await axios.get('/api/checkGroupMembership', {
        params: { groupId },
      })
      return response.data.isMember
    } catch (error) {
      console.error('Failed to check group membership:', error)
      return false
    }
  }

  // 批量检查群组成员状态
  const checkAllGroupMemberships = async (groups: Array<Group>) => {
    const statusMap: Record<string, boolean> = {}
    const promises = groups.map(async (group) => {
      const isMember = await checkGroupMembership(group.id)
      statusMap[group.id] = isMember
    })
    await Promise.all(promises)
    setGroupMembershipStatus(statusMap)
  }

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: schema },
    onSubmit: async ({ value }) => {
      if (!value.name.trim()) return
      setIsSearching(true)
      try {
        // Search users and groups in parallel
        const [userResponse, groupResponse] = await Promise.all([
          axios.get<Array<User>>('/api/users', {
            params: { name: value.name },
          }),
          axios.get<Array<Group>>('/api/searchGroups', {
            params: { query: value.name },
          }),
        ])

        const filteredUsers = userResponse.data.filter(
          (u) => u.userId !== currentUserId,
        )
        setUserResults(filteredUsers)
        setGroupResults(groupResponse.data)

        // 检查群组成员状态
        if (groupResponse.data.length > 0) {
          await checkAllGroupMemberships(groupResponse.data)
        }
      } catch (error) {
        toast.error('Failed to search')
      } finally {
        setIsSearching(false)
      }
    },
  })

  return (
    <div className="space-y-2">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await form.handleSubmit()
        }}
        className="space-y-2"
      >
        <form.Field
          name="name"
          children={(field) => (
            <div className="flex gap-2">
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Search by name or code..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="sm"
                disabled={isSearching}
                className="px-3"
              >
                {isSearching ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        />
      </form>

      {(userResults.length > 0 || groupResults.length > 0) && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 orange:text-orange-700 uppercase tracking-wide">
              Search Results
            </h4>

            {/* User Results */}
            {userResults.length > 0 && (
              <div className="space-y-1">
                <h5 className="text-xs font-medium text-gray-600 dark:text-gray-500 orange:text-orange-600 uppercase tracking-wide">
                  Users
                </h5>
                {userResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 orange:hover:bg-orange-100 rounded-md transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt="avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {user.fullName ? user.fullName.charAt(0) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white orange:text-orange-900 truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700 truncate">
                        Code: {user.code}
                      </p>
                    </div>
                    {currentFriends?.some(
                      (friend) => friend.userId === user.userId,
                    ) ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 orange:text-green-700 bg-green-50 dark:bg-green-900/20 orange:bg-green-100 px-3 py-1 rounded-md border border-green-200 dark:border-green-700 orange:border-green-300">
                        <Check className="h-3 w-3" />
                        <span className="text-xs font-medium">Added</span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => onAdd(user.userId)}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        <UserIcon className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Group Results */}
            {groupResults.length > 0 && (
              <div className="space-y-1">
                <h5 className="text-xs font-medium text-gray-600 dark:text-gray-500 orange:text-orange-600 uppercase tracking-wide">
                  Groups
                </h5>
                {groupResults.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 orange:hover:bg-orange-100 rounded-md transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={group.imageUrl}
                        alt="group avatar"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        <Users className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white orange:text-orange-900 truncate">
                        {group.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700 truncate">
                        Code: {group.code}
                      </p>
                    </div>

                    {groupMembershipStatus[group.id] ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400 orange:text-green-700 bg-green-50 dark:bg-green-900/20 orange:bg-green-100 px-3 py-1 rounded-md border border-green-200 dark:border-green-700 orange:border-green-300">
                        <Check className="h-3 w-3" />
                        <span className="text-xs font-medium">Joined</span>
                      </div>
                    ) : (
                      onJoinGroup && (
                        <Button
                          onClick={() => onJoinGroup(group.id)}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Join
                        </Button>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
