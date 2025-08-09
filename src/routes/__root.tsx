import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'
import UserSidebar from '@/components/UserSidebar.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <SidebarProvider>
        <UserSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarProvider>
      {/* <TanStackRouterDevtools />*/}
      {/* <TanStackQueryLayout />*/}
    </>
  ),
  notFoundComponent: () => <div>This is page is not exists...</div>,
})
