import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/button.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RefreshCw, Loader, UserIcon, Check } from 'lucide-react'
import { UserProfile } from '@/components/messageItem.tsx'
import type { Recommendation } from '@/type'
import type { User } from 'generated/index'

interface Props {
  currentUserId?: string
  currentFriends?: Array<User>
  onAdd: (userId: string) => Promise<void>
}

export default function RecommendationsList({
  currentUserId,
  currentFriends,
  onAdd,
}: Props) {
  const {
    data: recommendations,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['recommend', currentUserId],
    enabled: !!currentUserId,
    queryFn: async () => {
      const res = await axios.get<Array<Recommendation>>(
        `/api/recommend/${currentUserId}`,
      )
      return res.data
    },
  })

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 orange:text-orange-700 uppercase tracking-wide flex items-center gap-1">
          Recommended for you
        </h4>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => refetch()}
          className="h-6 w-6"
        >
          {isFetching ? (
            <Loader className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="space-y-1">
        {isFetching && !recommendations ? (
          <div className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700">
            Loading recommendations...
          </div>
        ) : recommendations && recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <div
              key={rec.userId}
              className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 orange:hover:bg-orange-100 rounded-md transition-colors"
            >
              <Popover>
                <PopoverTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={rec.imageUrl}
                      alt="avatar"
                      className="cursor-pointer"
                    />
                    <AvatarFallback className="text-sm">
                      {(rec.fullName || rec.userId).slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent side="right" className="p-0">
                  <UserProfile
                    userId={rec.userId}
                    sender={{
                      userId: rec.userId,
                      fullName: rec.fullName || rec.userId,
                      imageUrl: rec.imageUrl || '',
                      code: rec.code || '',
                    }}
                  />
                </PopoverContent>
              </Popover>

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
                  onClick={() => onAdd(rec.userId)}
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
  )
}
