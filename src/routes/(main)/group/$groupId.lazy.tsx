import React, { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GroupMessage } from 'generated/index.d.ts'
import useChatSocket from '@/hooks/useChatSocket.tsx'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import PendingPage from '@/components/pendingPage.tsx'

export const Route = createLazyFileRoute('/(main)/group/$groupId')({
  component: Home,
  pendingComponent: PendingPage,
})

type GroupMessageAndCursor = {
  messages: Array<GroupMessage>
  nextCursor: string
}

export default function Home() {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })

  useChatSocket(`${groupId}_add_messages`, [`${groupId}_messages`])

  const parentRef = useRef<HTMLDivElement>(null)
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: [`${groupId}_messages`],
      queryFn: async ({ pageParam }) => {
        const response = await axios.get<GroupMessageAndCursor>(
          '/api/groupMessages',
          {
            params: {
              cursor: pageParam,
              limit: 10,
              groupId,
            },
          },
        )
        return response.data
      },
      getNextPageParam: (lastPage: GroupMessageAndCursor) => {
        return lastPage.nextCursor
      },
      initialPageParam: undefined,
    })

  const messages = data ? data.pages.flatMap((page) => page.messages) : []
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? messages.length + 1 : messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  })
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
    if (!lastItem) return
    if (
      lastItem.index >= messages.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    hasNextPage,
    isFetchingNextPage,
    messages.length,
    fetchNextPage,
  ])

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
          {status === 'pending' ? (
            <PendingPage />
          ) : (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const message = messages[virtualRow.index]
              const isLoaderRow = virtualRow.index > messages.length - 1
              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      'Loading more...'
                    ) : (
                      'Nothing more to load...'
                    )
                  ) : (
                    <MessageItem>{message?.content}</MessageItem>
                  )}
                </div>
              )
            })
          )}
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
