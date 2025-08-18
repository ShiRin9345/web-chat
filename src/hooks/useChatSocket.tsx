import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { GroupMessage, PrivateMessage } from 'generated/index.d.ts'
import { useSocket } from '@/providers/socketProvider.tsx'

export default function useChatSocket(
  groupId: string,
  queryKey: Array<string>,
) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (!socket) {
      return
    }
    const addCallback = (message: GroupMessage | PrivateMessage) => {
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
    }
    socket.on('new_message', addCallback)
    socket.emit('join_group', groupId)
    return () => {
      socket.off('new_message', addCallback)
      socket.emit('leave_group', groupId)
    }
  }, [socket, groupId, queryKey])

  return socket
}
