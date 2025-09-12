import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { GroupMessage, PrivateMessage } from 'generated/index.d.ts'
import { useSocket } from '@/providers/socketProvider.tsx'

export default function useGroupListSocket() {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  const { user } = useUser()

  useEffect(() => {
    if (!socket) {
      return
    }

    const handleNewMessage = (message: GroupMessage | PrivateMessage) => {
      // 只处理群组消息
      if (!('groupId' in message) || !message.groupId) {
        return
      }

      // 更新群组列表的 lastMessage
      queryClient.setQueryData(['groups'], (oldData: any) => {
        if (!oldData) {
          return oldData
        }

        return oldData.map((group: any) => {
          if (group.id === message.groupId) {
            return {
              ...group,
              lastMessage: message,
            }
          }
          return group
        })
      })
    }

    socket.on('new_message', handleNewMessage)

    return () => {
      socket.off('new_message', handleNewMessage)
    }
  }, [socket, queryClient, user?.id])

  return socket
}
