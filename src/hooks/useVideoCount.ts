import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSocket } from '@/providers/socketProvider.tsx'

export function useVideoCount(roomId: string) {
  const { socket } = useSocket()
  const [videoCount, setVideoCount] = useState<number>(0)

  useEffect(() => {
    const getVideoCount = async () => {
      const response = await axios.get<number>('/api/videoCount', {
        params: {
          roomId,
        },
      })
      const count = response.data
      setVideoCount(count)
    }
    getVideoCount()
  }, [roomId])

  useEffect(() => {
    if (!socket) return
    const handleVideoCountChange = (count: number): void => {
      setVideoCount(count)
    }
    socket.on('user_join_video', handleVideoCountChange)
    socket.on('user_leave_video', handleVideoCountChange)
    return () => {
      socket.off('user_join_video', handleVideoCountChange)
      socket.off('user_leave_video', handleVideoCountChange)
    }
  }, [socket])

  return videoCount
}
