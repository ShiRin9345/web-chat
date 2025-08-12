import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { GroupMessage, PrivateMessage } from 'generated/index.d.ts'
import { useSocket } from '@/providers/socketProvider.tsx'

export default function useChatSocket(addKey: string, queryKey: Array<string>) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (!socket) {
      return
    }
    const addCallback = async (message: GroupMessage | PrivateMessage) => {
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
          messages: [...newData[lastIndex].messages, message],
        }
        return {
          ...oldData,
          pages: newData,
        }
      })
    }
    socket.on(addKey, addCallback)
    return () => {
      socket.off(addKey, addCallback)
    }
  }, [socket])

  return socket
}
