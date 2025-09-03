import Avatar from '@/components/Avatar.tsx'
import UserSidebarTrigger from '@/components/userSidebarTrigger.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import SidebarList from '@/components/sidebarList.tsx'
import { ThemeToggle } from '@/components/themeToggle.tsx'

const ChatSideBar = () => {
  return (
    <div className="flex flex-col pt-2 px-2 bg-gray-50 dark:bg-gray-900 orange:bg-orange-50">
      <section className="flex justify-between items-center">
        <UserSidebarTrigger />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Avatar />
        </div>
      </section>
      <Separator className="my-2" />
      <SidebarList />
    </div>
  )
}
export default ChatSideBar
