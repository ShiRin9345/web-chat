import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import type { QueryClient } from '@tanstack/react-query'
import Sidebar from '@/components/sidebar.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Sidebar />

      <div className="ml-16 h-screen ">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools />*/}
      {/* <TanStackQueryLayout />*/}
    </>
  ),
  notFoundComponent: () => <div>This is page is not exists...</div>,
})
