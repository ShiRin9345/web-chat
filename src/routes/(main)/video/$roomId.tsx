import { createFileRoute, useParams } from '@tanstack/react-router'
import usePeer from '@/hooks/usePeer.ts'

export const Route = createFileRoute('/(main)/video/$roomId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { roomId } = useParams({ from: '/(main)/video/$roomId' })
  const { videoContainerRef, myVideoRef } = usePeer(roomId)
  return (
    <div
      className="w-full h-dvh grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] auto-rows-fr"
      ref={videoContainerRef}
    >
      <video
        playsInline
        autoPlay
        className="w-full h-full aspect-video object-cover "
        muted
        ref={myVideoRef}
      />
    </div>
  )
}
