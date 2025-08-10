import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import type { Group } from '../../../generated/index.d.ts'
import UserSidebar from '@/components/UserSidebar.tsx'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx'
import ChatSideBar from '@/components/chatSideBar.tsx'
import UserSidebarProvider from '@/providers/userSidebarProvider.tsx'

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      sidebarListQueryOptions: {
        queryKey: ['sidebarList'],
        queryFn: async () => {
          const response = await axios.get<Array<Group>>('/api/groups')
          return response.data
        },
      },
    }
  },
  loader: async ({ context }) => {
    try {
      context.queryClient.prefetchQuery(context.sidebarListQueryOptions)
    } catch (e: any) {
      if (e.response.status === 401) {
        throw redirect({ to: '/signIn' })
      }
    }
  },
})

function RouteComponent() {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  if (isSignedIn !== undefined && !isSignedIn) {
    throw redirect({ to: '/signIn' })
  }
  return (
    <>
      <UserSidebarProvider>
        <UserSidebar />
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ChatSideBar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <Outlet />
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </UserSidebarProvider>
    </>
  )
}
