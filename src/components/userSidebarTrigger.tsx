import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useSidebar } from '@/components/ui/sidebar.tsx'

const UserSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full p-0"
      onClick={toggleSidebar}
    >
      {open ? <PanelLeftClose /> : <PanelRightClose />}
    </Button>
  )
}

export default UserSidebarTrigger
