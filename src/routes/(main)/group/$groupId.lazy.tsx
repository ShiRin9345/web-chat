import { useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'
import type { GroupMessage } from 'generated/index.d.ts'
import type { UserResource } from '@clerk/types'
import useChatSocket from '@/hooks/useChatSocket.tsx'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import PendingPage from '@/components/pendingPage.tsx'
import { MessageItem } from '@/components/messageItem.tsx'

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
  const { user } = useUser()

  useChatSocket(`${groupId}_add_messages`, ['messages', groupId])

  const parentRef = useRef<HTMLDivElement>(null)
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: ['messages', groupId],
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
    estimateSize: (index) => {
      const message = messages[index]
      return message?.type === 'IMAGE' ? 150 : 80
    },
    measureElement: (element) => {
      return element.getBoundingClientRect().height
    },
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
        className="p-2 flex-1 h-full overflow-auto bg-zinc-100 scrollbar-none relative "
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
                      <div className="w-full  flex items-center justify-center">
                        <Loader className="animate-spin" />
                      </div>
                    ) : (
                      'Nothing more to load...'
                    )
                  ) : (
                    <MessageItem
                      index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      content={message.content}
                      type={message.type}
                      user={user as UserResource}
                    />
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
