import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSocket } from '@/providers/socketProvider.tsx'

export default function useChatSocket(addKey: string, queryKey: Array<string>) {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  useEffect(() => {
    if (!socket) {
      return
    }
    const addCallback = async (message) => {
      queryClient.setQueryData(queryKey, (prev: Array<any>) => {
        return [...prev, message]
      })
    }
    socket.on(addKey, addCallback)
    return () => {
      socket.off(addKey, addCallback)
    }
  }, [socket])

  return socket
}
