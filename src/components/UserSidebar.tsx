import { UserRoundPlus, Users } from 'lucide-react'
import { AppSidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import GroupAddIcon, { ToolTipIcon } from '@/components/groupAddIcon.tsx'
import { useColumnStore } from '@/store/userColumnStore.ts'

const UserSidebar = () => {
  const { setType } = useColumnStore()
  return (
    <AppSidebar>
      <SidebarContent>
        <div className="w-full h-dvh flex flex-col items-center gap-6 py-2 bg-gray-50 dark:bg-gray-900 orange:bg-orange-50">
          <GroupAddIcon />
          <div onClick={() => setType('ADD_USER')}>
            <ToolTipIcon content="add new frind">
              <UserRoundPlus className="text-emerald-500 dark:text-emerald-400 orange:text-orange-600" />
            </ToolTipIcon>
          </div>
          <div onClick={() => setType('GROUPS')}>
            <ToolTipIcon content="view contact">
              <Users className="text-emerald-500 dark:text-emerald-400 orange:text-orange-600" />
            </ToolTipIcon>
          </div>
        </div>
      </SidebarContent>
    </AppSidebar>
  )
}

export default UserSidebar
