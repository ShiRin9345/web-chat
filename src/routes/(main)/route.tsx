import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
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

export const sidebarListQueryOptions = {
  queryKey: ['groups'],
  queryFn: async () => {
    const response = await axios.get<Array<Group>>('/api/groups')
    return response.data
  },
}

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(sidebarListQueryOptions)
  },
})

function RouteComponent() {
  const { isSignedIn, isLoaded } = useCheckAuth()
  if (!isLoaded || !isSignedIn) {
    return <PendingPage />
  }
  const location = useLocation()
  useGSAP(() => {
    gsap.fromTo(
      '#gsapContainer',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      },
    )
    return () => {
      gsap.to('#gsapContainer', {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
    }
  }, [location])
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
              <div id="gsapContainer">
                <Outlet />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </UserSidebarProvider>
    </>
  )
}
