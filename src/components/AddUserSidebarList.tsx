import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import {
  ArrowRight,
  Check,
  Loader,
  Plus,
  RefreshCw,
  Sparkles,
  UserIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { User } from 'generated/index'
import AnimatedLink from '@/components/animatedLink.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

const addUserFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

const AddUserSidebarList = () => {
  const [searchResults, setSearchResults] = useState<Array<User>>([])
  const [isSearching, setIsSearching] = useState(false)
  const { user: currentUser } = useUser()

  // 获取当前好友列表，用于过滤搜索结果
  const { data: currentFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await axios.get<Array<User>>('/api/friends')
      return response.data
    },
  })

  type Recommendation = {
    userId: string
    code?: string
    fullName?: string
    imageUrl?: string
    distance?: number
    similarity?: number
  }
  const {
    data: recommendations,
    isFetching: isFetchingRecs,
    refetch: refetchRecs,
  } = useQuery({
    queryKey: ['recommend', currentUser?.id],
    enabled: !!currentUser?.id,
    queryFn: async () => {
      const res = await axios.get<Array<Recommendation>>(
        `/api/recommend/${currentUser?.id}`,
      )
      return res.data
    },
  })

  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onChange: addUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!value.name.trim()) return

      setIsSearching(true)
      try {
        const response = await axios.get<Array<User>>('/api/users', {
          params: { name: value.name },
        })

        const filteredResults = response.data.filter(
          (user) => user.userId !== currentUser?.id,
        )

        setSearchResults(filteredResults)
      } catch (error) {
        toast.error('Failed to search users')
      } finally {
        setIsSearching(false)
      }
    },
  })

  const sendFriendRequest = async (toUserId: string) => {
    try {
      await axios.post('/api/friendRequest', {
        toUserId,
      })
      toast.success('Friend request sent successfully')
      // 从搜索结果中移除已发送请求的用户
      setSearchResults((prev) =>
        prev.filter((user) => user.userId !== toUserId),
      )
    } catch (error) {
      toast.error('Failed to send friend request')
    }
  }

  return (
    <div className="px-2 space-y-4">
      <div className="space-y-2">
        <AnimatedLink url="/friendRequest">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 orange:text-orange-800 flex items-center gap-2 hover:text-gray-900 dark:hover:text-white orange:hover:text-orange-900 transition-colors cursor-pointer">
            <Plus className="h-4 w-4" />
            See Friend Requests
          </h3>
        </AnimatedLink>

        {/* Recommendations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 orange:text-orange-700 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Recommended for you
            </h4>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => refetchRecs()}
              className="h-6 w-6"
            >
              {isFetchingRecs ? (
                <Loader className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
            </Button>
          </div>
          <div className="space-y-1">
            {isFetchingRecs && !recommendations ? (
              <div className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700">
                Loading recommendations...
              </div>
            ) : recommendations && recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <div
                  key={rec.userId}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 orange:hover:bg-orange-100 rounded-md transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={rec.imageUrl} alt="avatar" />
                    <AvatarFallback className="text-sm">
                      {(rec.fullName || rec.userId).slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white orange:text-orange-900 truncate">
                      {rec.fullName || rec.userId}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700 truncate">
                      Code: {rec.code || '—'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700 truncate">
                      Similarity:{' '}
                      {rec.similarity != null
                        ? (rec.similarity * 100).toFixed(1)
                        : '—'}
                      %
                    </p>
                  </div>

                  {currentFriends?.some(
                    (friend) => friend.userId === rec.userId,
                  ) ? (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 orange:text-green-700 bg-green-50 dark:bg-green-900/20 orange:bg-green-100 px-3 py-1 rounded-md border border-green-200 dark:border-green-700 orange:border-green-300">
                      <Check className="h-3 w-3" />
                      <span className="text-xs font-medium">Added</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => sendFriendRequest(rec.userId)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <UserIcon className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700">
                No recommendations yet
              </div>
            )}
          </div>
        </div>

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
      </div>

      {searchResults.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 orange:text-orange-700 uppercase tracking-wide">
              Search Results
            </h4>
            <div className="space-y-1">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 orange:hover:bg-orange-100 rounded-md transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt="avatar" />
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
                      onClick={() => sendFriendRequest(user.userId)}
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
          </div>
        </>
      )}
    </div>
  )
}

export default AddUserSidebarList
