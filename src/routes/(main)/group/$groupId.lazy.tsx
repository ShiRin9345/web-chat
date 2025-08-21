import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import PendingPage from '@/components/pendingPage.tsx'
import VirtualChatList from '@/components/virtualChatList.tsx'
import DropFile from '@/components/dropFile.tsx'

export const Route = createLazyFileRoute('/(main)/group/$groupId')({
  component: Home,
  pendingComponent: PendingPage,
})

export default function Home() {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  return (
    <div className="flex relative flex-col h-screen">
      <DropFile />
      <ChatHeader roomId={groupId} />
      <VirtualChatList groupId={groupId} />
      <ChatInput groupId={groupId} />
    </div>
  )
}
