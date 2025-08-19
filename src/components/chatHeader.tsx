import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { House, Phone, Video } from 'lucide-react'
import axios from 'axios'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import { type ReactNode, useEffect, useState } from 'react'
import { useSocket } from '@/providers/socketProvider.tsx'
import gsap from 'gsap'

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
      <div className="h-12 w-full p-2 relative">
        <Button variant="ghost" size="icon">
          <Link to="/">
            <House />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Link to="/group/video/$groupId" params={{ groupId }}>
            <Video />
          </Link>
        </Button>
        {videoCount > 0 && (
          <p className="absolute bg-emerald-500/80 p-2 right-5  h-10 -bottom-15 gap-2 flex rounded-lg z-10  text-white">
            <Phone />
            <span className="text-secondary">
              {videoCount} people is calling{' '}
            </span>
          </p>
        )}
      </div>
      <Separator />
    </>
  )
}
export default ChatHeader

const animatedLink = ({
  groupId,
  children,
  url,
}: {
  groupId: string | undefined
  children: ReactNode
  url: string
}) => {
  const navigate = useNavigate()
  const onClick = () => {
    setTimeout(() => {
      navigate({
        to: url,
        params: {
          groupId,
        },
      })
      gsap.to('#gsapContainer', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
    }, 1000)
  }
  return <div onClick={onClick}>{children}</div>
}
