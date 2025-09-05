import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
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
import { Toaster } from '@/components/ui/sonner.tsx'
import { TooltipProvider } from '@/components/ui/tooltip.tsx'

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
  const location = useLocation()
  const gsapContainerRef = useRef<HTMLDivElement>(null)
  // 监听路由变化，处理页面过渡
  useEffect(() => {
    if (!gsapContainerRef.current) return

    // 路由变化时，先淡入显示新内容
    gsap.fromTo(
      gsapContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.1, // 稍微延迟，确保新内容已渲染
      },
    )
  }, [location.pathname])

  // 移除 useGSAP，避免不必要的动画冲突

  if (!isLoaded || !isSignedIn) {
    return <PendingPage />
  }

  return (
    <>
      <Toaster />
      <UserSidebarProvider>
        <TooltipProvider>
          <UserSidebar />
        </TooltipProvider>
        <main className="flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <ChatSideBar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>
              <div id="gsapContainer" ref={gsapContainerRef}>
                <Outlet />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </UserSidebarProvider>
    </>
  )
}
