import { UserRoundPlus, Users } from 'lucide-react'
import { AppSidebar, SidebarContent } from '@/components/ui/sidebar.tsx'
import GroupAddIcon from '@/components/groupAddIcon.tsx'
import { useColumnStore } from '@/store/userColumnStore.ts'

const UserSidebar = () => {
  const { setType } = useColumnStore()
  return (
    <AppSidebar>
      <SidebarContent>
        <div className="w-full h-dvh flex flex-col items-center gap-6 py-2">
          <GroupAddIcon />
          <div className="bg-zinc-100 cursor-pointer hover:bg-zinc-200 size-12 rounded-full flex items-center transition duration-300 hover:rounded-2xl justify-center ">
            <UserRoundPlus
              className="text-emerald-500"
              onClick={() => setType('ADD_USER')}
            />
          </div>
          <div className="bg-zinc-100 cursor-pointer hover:bg-zinc-200 size-12 rounded-full flex items-center transition duration-300 hover:rounded-2xl justify-center ">
            <Users
              className="text-emerald-500"
              onClick={() => setType('GROUPS')}
            />
          </div>
        </div>
      </SidebarContent>
    </AppSidebar>
  )
}

export default UserSidebar
