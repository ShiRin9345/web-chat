import { useState } from 'react'
import Cookies from 'js-cookie'
import * as React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'

const UserSidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [defaultOpen] = useState(() => Cookies.get('sidebar_state') === 'true')
  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
    </div>
  )
}
export default UserSidebarProvider
