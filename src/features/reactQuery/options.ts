import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from '@tanstack/react-query'
import axios from 'axios'
import type { MutationOptions, QueryClient } from '@tanstack/react-query'
import type {
  GroupMessage,
  PrivateMessage,
  Profile,
  User,
} from 'generated/index'
import type {
  ConversationWithMessagesWithUsers,
  GroupMessageAndCursor,
  GroupMessageWithSender,
  MessageType,
  PrivateMessageAndCursor,
  PrivateMessageWithSender,
} from '@/type'

interface ChatInputMutateOptionsProps {
  groupId?: string
  conversationId?: string
  friendUserId?: string

  queryClient: QueryClient
  sender: User
}

interface profileWallpaperProps {
  queryClient: QueryClient
}
export const profileWallpaperMutationOptions = ({
  queryClient,
}: profileWallpaperProps) =>
  mutationOptions({
    mutationKey: ['wallpaper'],
    mutationFn: async (imageUrl: string) => {
      try {
        const response = await axios.patch<Profile>('/api/profile', {
          data: {
            bgImageUrl: imageUrl,
          },
        })
        return response.data
      } catch (e) {
        console.error(e)
      }
    },
    onSuccess: (profile) => {
      queryClient.setQueryData(['userProfile'], profile)
    },
  })

export const chatInputMutateOptions = ({
  groupId,
  conversationId,
  friendUserId,
  queryClient,
  sender,
}: ChatInputMutateOptionsProps) =>
  mutationOptions({
    mutationKey: ['messages', groupId || friendUserId],
    mutationFn: async ({
      content,
      type,
    }: {
      content: string
      type: MessageType
    }) => {
      try {
        if (groupId) {
          const response = await axios.post<GroupMessageWithSender>(
            '/api/groupMessages',
            {
              content,
              groupId,
              type,
            },
          )
          return response.data
        } else {
          const response = await axios.post<PrivateMessageWithSender>(
            '/api/privateMessage',
            {
              content,
              friendUserId,
              type,
              conversationId,
            },
          )
          return response.data
        }
      } catch (e) {
        throw new Error('Error creating chat')
      }
    },
    onMutate: ({ content, type }: { content: string; type: MessageType }) => {
      queryClient.cancelQueries({
        queryKey: ['messages', groupId || friendUserId],
      })
      queryClient.setQueryData(
        ['messages', groupId || friendUserId],
        (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return {
              pages: [
                {
                  messages: [
                    {
                      id: `optimistic-${Date.now()}`,
                      content,
                      type,
                      sender,
                    },
                  ],
                },
              ],
            }
          }
          const newData = [...oldData.pages]
          const lastIndex = newData.length - 1
          newData[lastIndex] = {
            ...newData[lastIndex],
            messages: newData[lastIndex].messages.concat({
              id: `optimistic-${Date.now()}`,
              content,
              type,
              sender,
            }),
          }
          return {
            ...oldData,
            pages: newData,
          }
        },
      )
    },
    onSuccess: (newMessage: GroupMessage | PrivateMessage) => {
      queryClient.setQueryData(
        ['messages', groupId || friendUserId],
        (oldData: any) => {
          if (!oldData || !oldData.pages || oldData.pages.length === 0) {
            return oldData
          }
          const newData = [...oldData.pages]
          const lastIndex = newData.length - 1
          const newMessages = newData[lastIndex].messages.map(
            (message: GroupMessage | PrivateMessage) => {
              if (message.id.startsWith('optimistic-')) {
                return newMessage
              }
              return message
            },
          )
          newData[lastIndex] = {
            ...newData[lastIndex],
            messages: newMessages,
          }
        },
      )
    },
  })

export const conversationQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['conversation', userId],
    queryFn: async () => {
      const response = await axios.get<ConversationWithMessagesWithUsers>(
        '/api/conversation',
        {
          params: {
            otherUserId: userId,
          },
        },
      )
      return response.data
    },
  })

interface chatMessageInfiniteQueryProps {
  userId?: string
  groupId?: string
  friendUserId?: string
}
export const chatMessageInfiniteQueryOptions = ({
  userId,
  groupId,
  friendUserId,
}: chatMessageInfiniteQueryProps) =>
  infiniteQueryOptions({
    queryKey: ['messages', groupId || friendUserId],
    queryFn: async ({ pageParam }) => {
      const url = groupId ? '/api/groupMessages' : '/api/privateMessages'
      const response = await axios.get<
        PrivateMessageAndCursor | GroupMessageAndCursor
      >(url, {
        params: {
          cursor: pageParam,
          limit: 10,
          userId: userId,
          otherUserId: friendUserId,
          groupId: groupId,
        },
      })
      return response.data
    },
    getNextPageParam: (
      lastPage: PrivateMessageAndCursor | GroupMessageAndCursor,
    ) => {
      return lastPage.nextCursor
    },
    initialPageParam: undefined,
  })

export const userProfileQueryOptions = queryOptions({
  queryKey: ['userProfile'],
  queryFn: async () => {
    const response = await axios.get<Profile>('/api/profile')
    return response.data
  },
})
