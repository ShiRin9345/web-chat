import { Link, useParams } from '@tanstack/react-router'
import { House, Video } from 'lucide-react'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'

const ChatHeader = () => {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
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
          </Link>
        </Button>
      </div>
      <Separator />
    </>
  )
}
export default ChatHeader
