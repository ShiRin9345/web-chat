import { House, Phone, Video } from 'lucide-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'

interface Props {
  roomId: string
}

const ChatHeader: React.FC<Props> = ({ roomId }) => {
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
  }, [])
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
  return (
    <>
      <div className="h-12 w-full p-2 relative">
        <Button variant="ghost" size="icon">
          <AnimatedLink url="/">
            <House />
          </AnimatedLink>
        </Button>
        <Button variant="ghost" size="icon">
          <AnimatedLink url="/video/$roomId" roomId={roomId}>
            <Video />
          </AnimatedLink>
        </Button>
        {videoCount > 0 && (
          <p className="absolute animate-pulse bg-emerald-500/80 p-2 right-5  h-10 -bottom-15 gap-2 flex rounded-lg z-10  text-white">
            <Phone />
            <span className="text-secondary">
              {videoCount} people is calling
            </span>
          </p>
        )}
      </div>
      <Separator />
    </>
  )
}
export default ChatHeader
