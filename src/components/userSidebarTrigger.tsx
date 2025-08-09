import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useSidebar } from '@/components/ui/sidebar.tsx'

const UserSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleSidebar}
    >
      {open ? (
        <PanelLeftClose className="size-5" />
      ) : (
        <PanelRightClose className="size-5" />
      )}
    </Button>
  )
}

export default UserSidebarTrigger
