import React, { forwardRef, useEffect, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { createLazyFileRoute, useParams } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GroupMessage } from 'generated/index.d.ts'
import type { MessageType } from 'type'
import type { UserResource } from '@clerk/types'
import useChatSocket from '@/hooks/useChatSocket.tsx'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import PendingPage from '@/components/pendingPage.tsx'
import { useUser } from '@clerk/clerk-react'

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

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
}

const MessageItem: React.FC<MessageItemProps> = forwardRef((props, ref) => {
  return (
    <div
      data-index={props.index}
      className="w-full mt-2 bg-zinc-100 flex p-2 rounded-sm items-start"
      ref={ref}
    >
      <div className="flex items-start ">
        <img
          src={props.user.imageUrl}
          alt="Avatar"
          className="rounded-full h-12"
        />
      </div>
      <div className="flex w-full flex-col">
        <div className="text-sm">{props.user.fullName}</div>
        {props.type === 'TEXT' && (
          <p className="text-xs max-w-[20rem] break-words">{props.content}</p>
        )}
        {props.type === 'IMAGE' && (
          <img
            src={props.content}
            alt="image message"
            className="max-h-[25rem] w-auto object-contain object-left max-w-1/2"
            loading="lazy"
          />
        )}
      </div>
    </div>
  )
})
