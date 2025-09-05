import React, { useEffect, useMemo, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { format } from 'date-fns'
import type { UserResource } from '@clerk/types'
import type { PrivateMessageWithSender } from '@/type'
import useChatSocket from '@/hooks/useChatSocket.ts'
import { chatMessageInfiniteQueryOptions } from '@/features/reactQuery/options.ts'
import PendingPage from '@/components/pendingPage.tsx'
import {
  GroupMessageItem,
  PrivateMessageItem,
} from '@/components/messageItem.tsx'

interface Props {
  groupId?: string
  friendUserId?: string
  conversationId?: string
}
const VirtualChatList: React.FC<Props> = ({
  groupId,
  friendUserId,
  conversationId,
}) => {
  const { user } = useUser()

  useChatSocket((conversationId || groupId) as string, [
    'messages',
    groupId || friendUserId,
  ])

  const parentRef = useRef<HTMLDivElement>(null)
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, status } =
    useInfiniteQuery(
      chatMessageInfiniteQueryOptions({
        userId: user?.id,
        friendUserId,
        groupId,
      }),
    )

  const messages = useMemo(
    () =>
      data
        ? data.pages.flatMap(
            (page) => page.messages as Array<PrivateMessageWithSender>,
          )
        : [],
    [data],
  )
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
    <div
      ref={parentRef}
      id="topDiv"
      className="p-2 flex-1 h-full overflow-auto bg-zinc-100 dark:bg-gray-900 orange:bg-orange-50 scrollbar-none relative "
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
                    <div className="w-full flex items-center justify-center py-4">
                      <Loader className="animate-spin" />
                      <span className="ml-2 text-gray-500 dark:text-gray-400 orange:text-orange-600">
                        Loading more messages...
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 orange:text-orange-600">
                      Nothing more to load...
                    </span>
                  )
                ) : (
                  <>
                    {groupId && (
                      <GroupMessageItem
                        index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        content={message?.content}
                        type={message.type}
                        user={user as UserResource}
                        sender={message.sender}
                        timestamp={format(
                          message.createdAt,
                          'yyyy MM-dd HH:mm',
                        )}
                      />
                    )}
                    {conversationId && (
                      <PrivateMessageItem
                        index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        content={message?.content}
                        type={message.type}
                        user={user as UserResource}
                        sender={message.sender}
                        timestamp={format(
                          message.createdAt,
                          'yyyy MM-dd HH:mm',
                        )}
                      />
                    )}
                  </>
                )}
              </div>
            )
          })
        )}
      </div>
      <div id="bottom" />
    </div>
  )
}
export default VirtualChatList
