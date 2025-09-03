import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSocket } from '@/providers/socketProvider.tsx'

export const useCountSocket = (groupId: string) => {
  const { socket } = useSocket()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const callback = (newCount: number) => {
      setCount(newCount)
    }

    socket.on(`${groupId}_count`, callback)

    const getGroupCount = async () => {
      try {
        const response = await axios.get<number>('/api/groupCount', {
          params: { groupId },
        })
        setCount(response.data)
      } catch (error) {
        console.error('Failed to get group count:', error)
      }
    }

    getGroupCount()

    return () => socket.off(`${groupId}_count`, callback)
  }, [groupId, socket])

  return count
}
