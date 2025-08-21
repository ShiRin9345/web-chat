import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { GroupMessage, PrivateMessage } from 'generated/index.d.ts'
import { useSocket } from '@/providers/socketProvider.tsx'
import { scrollBottom } from '@/lib/scroll.ts'

export default function useChatSocket(groupId: string, queryKey: Array<any>) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  const { user } = useUser()
  useEffect(() => {
    if (!socket) {
      return
    }
    const addCallback = (message: GroupMessage | PrivateMessage) => {
      if (message.senderId === user?.id) {
        return
      }
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
              },
            ],
          }
        }
        const newData = [...oldData.pages]
        const lastIndex = newData.length - 1
        newData[lastIndex] = {
          ...newData[lastIndex],
          messages: newData[lastIndex].messages.concat(message),
        }
        return {
          ...oldData,
          pages: newData,
        }
      })
      scrollBottom()
    }
    socket.on('new_message', addCallback)
    socket.emit('join_group', groupId)
    return () => {
      socket.off('new_message', addCallback)
      socket.emit('leave_group', groupId)
    }
  }, [socket, groupId, queryKey, user?.id])

  return socket
}
