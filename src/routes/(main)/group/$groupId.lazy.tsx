import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import type { GroupMessage } from 'generated/index.d.ts'
import useChatSocket from '@/hooks/useChatSocket.tsx'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import PendingPage from '@/components/pendingPage.tsx'
import { groupMessagesQueryOptions } from '@/routes/(main)/group/$groupId.tsx'

export const Route = createLazyFileRoute('/(main)/group/$groupId')({
  component: Home,
  pendingComponent: PendingPage,
})

export default function Home() {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: messages } = useQuery<Array<GroupMessage>>(
    groupMessagesQueryOptions(groupId),
  )
  useChatSocket(`${groupId}_add_messages`, [`${groupId}_messages`])
  return (
    <div className="flex relative flex-col h-screen">
      <ChatHeader />
      <div className="p-2 flex-1 h-full overflow-auto scrollbar-none">
        {messages?.map &&
          messages.map((message) => (
            <MessageItem key={message.id}>{message.content}</MessageItem>
          ))}
      </div>
      <ChatInput />
    </div>
  )
}

interface MessageItemProps {
  children: React.ReactNode
}

const MessageItem: React.FC<MessageItemProps> = ({ children }) => {
  return (
    <div className="w-full h-12 mt-2 bg-zinc-100 flex items-center justify-start p-2">
      {children}
    </div>
  )
}
