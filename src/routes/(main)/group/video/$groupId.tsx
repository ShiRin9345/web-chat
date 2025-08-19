import { createFileRoute, useParams } from '@tanstack/react-router'
import usePeer from '@/hooks/userPeer.ts'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  const { videoContainerRef, myVideoRef } = usePeer(groupId)
  return (
    <div className="w-full h-dvh flex gap-2 flex-wrap" ref={videoContainerRef}>
      <video
        playsInline
        autoPlay
        className="w-[200px] h-[200px]"
        ref={myVideoRef}
      />
    </div>
  )
}
