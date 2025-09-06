import { House, Menu, Phone, Video } from 'lucide-react'
import React from 'react'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'
import { useGroupColumnStore } from '@/store/useGroupColumnStore.ts'
import { useVideoCount } from '@/hooks/useVideoCount.ts'

interface Props {
  roomId: string
}

const ChatHeader: React.FC<Props> = ({ roomId }) => {
  const videoCount = useVideoCount(roomId)
  const { changeOpen } = useGroupColumnStore()

  return (
    <>
      <div className="h-12 w-full p-2 flex relative bg-white dark:bg-gray-900 orange:bg-orange-100">
        <AnimatedLink url="/">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <House className="text-gray-600 dark:text-gray-300 orange:text-orange-600" />
          </Button>
        </AnimatedLink>

        <AnimatedLink url="/video/$roomId" roomId={roomId}>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <Video className="text-gray-600 dark:text-gray-300 orange:text-orange-600" />
          </Button>
        </AnimatedLink>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto cursor-pointer"
          onClick={changeOpen}
        >
          <Menu className="text-gray-600 dark:text-gray-300 orange:text-orange-600" />
        </Button>
        {videoCount > 0 && (
          <p className="absolute animate-pulse bg-emerald-500/80 p-2 left-1/2 -translate-x-1/2  h-10 -bottom-15 gap-2 flex rounded-lg z-10  text-white">
            <Phone className="text-white" />
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
