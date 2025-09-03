import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { useSidebar } from '@/components/ui/sidebar.tsx'

const UserSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 orange:hover:bg-orange-100 transition-colors"
      onClick={toggleSidebar}
    >
      {open ? (
        <PanelLeftClose className="size-5 text-gray-600 dark:text-gray-300 orange:text-orange-600" />
      ) : (
        <PanelRightClose className="size-5 text-gray-600 dark:text-gray-300 orange:text-orange-600" />
      )}
    </Button>
  )
}

export default UserSidebarTrigger
