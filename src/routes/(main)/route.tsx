import { createFileRoute, Outlet } from '@tanstack/react-router'
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
})

function RouteComponent() {
  return (
    <>
      <UserSidebarProvider>
        <UserSidebar />
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
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
