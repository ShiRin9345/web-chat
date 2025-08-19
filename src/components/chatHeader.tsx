import { Link, useParams } from '@tanstack/react-router'
import { House, Video } from 'lucide-react'
import axios from 'axios'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socketProvider.tsx'

const ChatHeader = () => {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { socket } = useSocket()
  const [videoCount, setVideoCount] = useState<number>(0)
  useEffect(() => {
    const getVideoCount = async () => {
      const response = await axios.get<number>('/api/videoCount', {
        params: {
          groupId,
        },
      })
      const count = response.data
      setVideoCount(count)
    }
    getVideoCount()
  }, [])
  useEffect(() => {
    if (!socket) return
    socket.on('user_join_video', (count: number) => setVideoCount(count))
    socket.on('user_leave_video', (count: number) => setVideoCount(count))
  }, [socket])
  return (
    <>
      <div className="h-12 w-full p-2 ">
        <Button variant="ghost" size="icon">
          <Link to="/">
            <House />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Link to="/group/video/$groupId" params={{ groupId }}>
            <Video />
            {videoCount}
          </Link>
        </Button>
      </div>
      <Separator />
    </>
  )
}
export default ChatHeader
