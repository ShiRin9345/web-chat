import { Link } from '@tanstack/react-router'
import { House } from 'lucide-react'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'

const ChatHeader = () => {
  return (
    <>
      <div className="h-12 w-full p-2 ">
        <Button variant="ghost" size="icon">
          <Link to="/">
            <House />
          </Link>
        </Button>
      </div>
      <Separator />
    </>
  )
}
export default ChatHeader
