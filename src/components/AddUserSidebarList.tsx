import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowRight, Loader, Plus, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
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
        setSearchResults(response.data)
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
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
            <Plus className="h-4 w-4" />
            Add New Friend
          </h3>
        </AnimatedLink>

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
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Search Results
            </h4>
            <div className="space-y-1">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} alt="avatar" />
                    <AvatarFallback className="text-sm">
                      {user.fullName ? user.fullName.charAt(0) : 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      Code: {user.code}
                    </p>
                  </div>

                  <Button
                    onClick={() => sendFriendRequest(user.userId)}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    <UserIcon className="h-3 w-3 mr-1" />
                    Add
                  </Button>
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
