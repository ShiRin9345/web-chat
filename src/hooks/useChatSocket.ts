import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { GroupMessage, PrivateMessage } from 'generated/index.d.ts'
import { useSocket } from '@/providers/socketProvider.tsx'

export default function useChatSocket(
  groupId: string,
  queryKey: Array<string>,
) {
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
      const topDiv = document.getElementById('topDiv') as HTMLDivElement
      const distanceOffBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
      if (distanceOffBottom <= 100) {
        setTimeout(() => {
          document.getElementById('bottom')?.scrollIntoView({
            behavior: 'smooth',
          })
        }, 100)
      }
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
