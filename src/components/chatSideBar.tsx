import Avatar from '@/components/Avatar.tsx'
import UserSidebarTrigger from '@/components/userSidebarTrigger.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import SidebarList from '@/components/sidebarList.tsx'

const ChatSideBar = () => {
  return (
    <div className="flex flex-col pt-2 px-2">
      <section className="flex justify-between items-center">
        <UserSidebarTrigger />
        <Avatar />
      </section>
      <Separator className="my-2" />
      <SidebarList />
    </div>
  )
}
export default ChatSideBar
