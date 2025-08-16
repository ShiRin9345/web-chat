import { AppSidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import GroupAddIcon from '@/components/groupAddIcon.tsx'

const UserSidebar = () => {
  return (
    <AppSidebar>
      <SidebarContent>
        <div className="w-full h-dvh flex flex-col items-center py-2">
          <GroupAddIcon />
        </div>
      </SidebarContent>
    </AppSidebar>
  )
}

export default UserSidebar
