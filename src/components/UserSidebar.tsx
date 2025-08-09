import HeaderUser from '@/integrations/clerk/header.tsx'
import {
  AppSidebar,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar.tsx'

const UserSidebar = () => {
  return (
    <AppSidebar>
      <SidebarContent>Hello</SidebarContent>
      <SidebarFooter>
        <HeaderUser />
      </SidebarFooter>
    </AppSidebar>
  )
}

export default UserSidebar
