import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { User } from 'generated/index'
import { useSocket } from '@/providers/socketProvider.tsx'
import { friendOnlineStatusQueryOptions } from '@/features/reactQuery/options.ts'

export const useUserOnline = (user: User | undefined) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()
  const { data: online } = useQuery(
    friendOnlineStatusQueryOptions(user?.userId as string),
  )
  useEffect(() => {
    if (!socket) return
    const handleOnline = () => {
      queryClient.setQueryData(['friendOnlineStatus', user?.userId], () => true)
    }
    const handleOffline = () => {
      queryClient.setQueryData(
        ['friendOnlineStatus', user?.userId],
        () => false,
      )
    }
    socket.on(`${user?.userId}_online`, handleOnline)
    socket.on(`${user?.userId}_offline`, handleOffline)
    return () => {
      socket.off(`${user?.userId}_online`, handleOnline)
      socket.off(`${user?.userId}_offline`, handleOffline)
    }
  }, [socket])
  return { online }
}
