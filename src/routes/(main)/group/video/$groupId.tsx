import { createFileRoute, useParams } from '@tanstack/react-router'
import usePeer from '@/hooks/userPeer.ts'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  const { videoContainerRef, myVideoRef, memberCount } = usePeer(groupId)
  return (
    <div
      className="w-full h-dvh grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] auto-rows-fr"
      ref={videoContainerRef}
    >
      <video
        playsInline
        autoPlay
        className="w-full h-full aspect-video object-cover "
        ref={myVideoRef}
      />
    </div>
  )
}
