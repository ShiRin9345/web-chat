import { Outlet, createFileRoute } from '@tanstack/react-router'
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
import { useCheckAuth } from '@/hooks/useCheckAuth.ts'
import PendingPage from '@/components/pendingPage.tsx'

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  beforeLoad: () => ({
    sidebarListQueryOptions: {
      queryKey: ['groups'],
      queryFn: async () => {
        const response = await axios.get<Array<Group>>('/api/groups')
        return response.data
      },
    },
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(context.sidebarListQueryOptions)
  },
})

function RouteComponent() {
  const { isSignedIn, isLoaded } = useCheckAuth()
  if (!isLoaded || !isSignedIn) {
    return <PendingPage />
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
