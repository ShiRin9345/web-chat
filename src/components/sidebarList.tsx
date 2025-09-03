import { queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { ArrowRight, Loader, Plus, UserIcon } from 'lucide-react'
import { toast } from 'sonner'
import type { Group, GroupMessage, User } from 'generated/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { sidebarListQueryOptions } from '@/routes/(main)/route.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'
import { useColumnStore } from '@/store/userColumnStore.ts'
import { Input } from '@/components/ui/input.tsx'
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/components/ui/shadcn-io/status'
import { chatMessageInfiniteQueryOptions } from '@/features/reactQuery/options.ts'
import { isImage, isPDF } from '@/lib/checkFileType.ts'
import { Pill, PillIcon } from '@/components/ui/shadcn-io/pill'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { useUserOnline } from '@/hooks/useUserOnline.ts'

const SidebarList = () => {
  const { type } = useColumnStore()
  return (
    <>
      {type === 'GROUPS' && <ContactSidebarList />}
      {type === 'ADD_USER' && <AddUserSidebarList />}
    </>
  )
}
export default SidebarList

const friendQueryOptions = queryOptions({
  queryKey: ['friends'],
  queryFn: async () => {
    const response = await axios.get<Array<User>>('/api/friends')
    return response.data
  },
})

const ContactSidebarList = () => {
  const { data: groups } = useQuery(sidebarListQueryOptions)
  const { data: friends } = useQuery(friendQueryOptions)
  return (
    <>
      <Accordion type="multiple">
        <AnimatedLink url="/">
          <div className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 hover:shadow-sm transition-all duration-200 rounded-lg cursor-pointer group">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                🏠
              </div>
            </div>
            <div className="flex-1">
              <span className="font-semibold text-gray-900 text-lg">Home</span>
              <p className="text-xs text-gray-500">Main dashboard</p>
            </div>
          </div>
        </AnimatedLink>
        <AccordionItem value="groups">
          <AccordionTrigger className="!no-underline cursor-pointer ">
            <span className="pl-2"> Groups</span>
          </AccordionTrigger>
          <AccordionContent>
            <GroupList groups={groups} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="friends">
          <AccordionTrigger className="!no-underline cursor-pointer ">
            <span className="pl-2"> Friends</span>
          </AccordionTrigger>
          <AccordionContent>
            <FriendList friends={friends} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

const FriendList: React.FC<{ friends: Array<User> | undefined }> = ({
  friends,
}) => {
  return (
    <div className="px-2 space-y-1">
      {friends?.map &&
        friends.map((friend) => <FriendItem key={friend.id} friend={friend} />)}
    </div>
  )
}

const FriendItem: React.FC<{ friend: User }> = ({ friend }) => {
  const { online } = useUserOnline(friend)
  return (
    <AnimatedLink
      url="/conversation/$friendUserId"
      friendUserId={friend.userId}
    >
      <div className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 hover:shadow-sm transition-all duration-200 rounded-lg cursor-pointer group">
        <div className="relative">
          <img
            src={friend.imageUrl}
            className="size-10 rounded-full aspect-square object-cover ring-2 ring-white shadow-sm"
            alt="avatar"
          />
          {/* 在线状态指示器 */}
          <div
            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              online ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 truncate">
              {friend.fullName}
            </span>
            {online && (
              <span className="text-xs text-green-600 font-medium">Online</span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">
            {online ? 'Available for chat' : 'Last seen recently'}
          </p>
        </div>

        {/* 移除旧的 Status 组件，使用自定义的在线状态指示器 */}
      </div>
    </AnimatedLink>
  )
}

const GroupList: React.FC<{ groups: Array<Group> | undefined }> = ({
  groups,
}) => {
  return (
    <div className="px-2 space-y-1">
      {groups?.map &&
        groups.map((group) => <LabelGroup key={group.id} group={group} />)}
    </div>
  )
}

function LabelGroup({ group }: { group: Group }) {
  const { data } = useInfiniteQuery(
    chatMessageInfiniteQueryOptions({
      groupId: group.id,
    }),
  )
  const messages = data
    ? data.pages.flatMap((page) => page.messages as Array<GroupMessage>)
    : []
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1].content : ''
  const count = useCountSocket(group.id)
  return (
    <AnimatedLink url="/group/$groupId" groupId={group.id}>
      <div className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 hover:shadow-sm transition-all duration-200 rounded-lg cursor-pointer group">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {group.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 truncate">
              {group.name}
            </span>
            <Pill className="bg-blue-50 text-blue-700 border-blue-200">
              <PillIcon icon={UserIcon} />
              <span className="text-xs font-medium">{count} users</span>
            </Pill>
          </div>

          <p className="text-xs text-gray-500 truncate">
            {lastMessage
              ? isImage(lastMessage)
                ? isPDF(lastMessage)
                  ? '📄 PDF file'
                  : '🖼️ Image'
                : lastMessage
              : 'No messages yet'}
          </p>
        </div>
      </div>
    </AnimatedLink>
  )
}

function useCountSocket(groupId: string) {
  const { socket } = useSocket()
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    const callback = (newCount: number) => {
      setCount(newCount)
    }
    socket.on(`${groupId}_count`, callback)
    const getGroupCount = async () => {
      const response = await axios.get<number>('/api/groupCount', {
        params: {
          groupId,
        },
      })
      setCount(response.data)
    }
    getGroupCount()
    return () => socket.off(`${groupId}_count`, callback)
  }, [])
  return count
}

const addUserFormSchema = z.object({
  name: z.string(),
})

function AddUserSidebarList() {
  const [users, setUsers] = useState<Array<User>>([])
  const { data: friends } = useQuery(friendQueryOptions)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: addUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { name } = value
      try {
        const response = await axios.get<Array<User>>('/api/users', {
          params: {
            name,
          },
        })
        setUsers(response.data)
      } catch (e) {
        console.error(e)
      }
    },
  })
  return (
    <div className="flex flex-col gap-2">
      <AnimatedLink url="/friendRequest">
        <div className="flex items-center justify-evenly px-2">
          <p className="w-full text-left">See request</p>
          <ArrowRight />
        </div>
      </AnimatedLink>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsLoading(true)
          await form.handleSubmit()
          setIsLoading(false)
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <Input
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Type user's name or code"
              name="name"
            />
          )}
        />
        {form.state.isSubmitting ? (
          <div className="mt-2 flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="mt-2">
            {users.length === 0 ? (
              <p className="text-center">no existing user</p>
            ) : (
              users.map((user) => (
                <div
                  className="w-full h-20 flex items-center justify-between"
                  key={user.id}
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={user.imageUrl} alt="avatar" />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <span>{user.fullName}</span>
                  </div>
                  {friends?.every((friend) => friend.id !== user.id) ? (
                    <Plus
                      className="size-5 cursor-pointer hover:bg-zinc-100 rounded-full transition duration-200"
                      onClick={async () => {
                        toast('Request has been send', {
                          duration: 2000,
                        })
                        await axios.post('/api/friendRequest', {
                          toUserId: user.userId,
                        })
                      }}
                    />
                  ) : (
                    <div>accepted</div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </form>
    </div>
  )
}
