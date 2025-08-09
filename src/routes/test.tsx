import { createFileRoute } from '@tanstack/react-router'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={10}
          maxSize={30}
        ></ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}></ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
