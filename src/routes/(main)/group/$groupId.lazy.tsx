import React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createLazyFileRoute, useParams } from '@tanstack/react-router'
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
  const { data: messages = [] } = useQuery<Array<GroupMessage>>(
    groupMessagesQueryOptions(groupId),
  )

  useChatSocket(`${groupId}_add_messages`, [`${groupId}_messages`])

  // 创建可滚动容器的 ref
  const parentRef = React.useRef<HTMLDivElement>(null)

  // 创建虚拟器
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55, // 每条消息的估算高度，根据实际调整
    overscan: 5,
  })

  return (
    <div className="flex relative flex-col h-screen">
      <ChatHeader />
      <div
        ref={parentRef}
        className="p-2 flex-1 h-full overflow-auto scrollbar-none relative "
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
          className={`h-[${rowVirtualizer.getTotalSize()}px] w-full relative`}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const message = messages[virtualRow.index]
            return (
              <div
                key={message.id}
                className="w-full h-12 mt-2  flex items-center justify-start p-2"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <MessageItem>{message.content}</MessageItem>
              </div>
            )
          })}
        </div>
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
    <div className="w-full h-12 mt-2 bg-zinc-100 flex items-center rounded-sm justify-start p-2">
      {children}
    </div>
  )
}
