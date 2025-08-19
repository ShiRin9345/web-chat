import { createFileRoute, useParams } from '@tanstack/react-router'
import usePeer from '@/hooks/userPeer.ts'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  const { videoContainerRef, myVideoRef } = usePeer(groupId)
  return (
    <div
      className="w-full h-dvh flex flex-wrap items-center justify-center"
      ref={videoContainerRef}
    >
      <video
        playsInline
        autoPlay
        className="w-[300px] aspect-video object-cover "
        ref={myVideoRef}
      />
    </div>
  )
}
