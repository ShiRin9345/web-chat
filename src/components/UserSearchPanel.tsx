import { useState } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { toast } from 'sonner'
import type { User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { ArrowRight, Loader, Check, UserIcon } from 'lucide-react'

interface Props {
  currentUserId?: string
  currentFriends?: Array<User>
  onAdd: (userId: string) => Promise<void>
}

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function UserSearchPanel({
  currentUserId,
  currentFriends,
  onAdd,
}: Props) {
  const [results, setResults] = useState<Array<User>>([])
  const [isSearching, setIsSearching] = useState(false)

  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: schema },
    onSubmit: async ({ value }) => {
      if (!value.name.trim()) return
      setIsSearching(true)
      try {
        const response = await axios.get<Array<User>>('/api/users', {
          params: { name: value.name },
        })

        const filtered = response.data.filter((u) => u.userId !== currentUserId)
        setResults(filtered)
      } catch (error) {
        toast.error('Failed to search users')
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

      {results.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 orange:text-orange-700 uppercase tracking-wide">
              Search Results
            </h4>
            <div className="space-y-1">
              {results.map((user) => (
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
          </div>
        </>
      )}
    </div>
  )
}
