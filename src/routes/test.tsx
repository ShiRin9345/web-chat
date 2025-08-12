import { createFileRoute } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GroupMessage } from 'generated/index'
import PendingPage from '@/components/pendingPage.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})
const groupId = 'f7cb00ab-fe19-4f37-8bde-72611429ead6'
type GroupMessageAndCursor = {
  messages: Array<GroupMessage>
  nextCursor: string
}
function RouteComponent() {
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

  const rows = data ? data.pages.flatMap((page) => page.messages) : []
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  })
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
    if (!lastItem) return
    console.log(lastItem.index, rows.length - 1, hasNextPage)
    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    hasNextPage,
    isFetchingNextPage,
    rows.length,
    fetchNextPage,
  ])
  return (
    <div className="flex items-center justify-center h-dvh w-full">
      <div ref={parentRef} className="h-1/2 w-1/2 overflow-auto">
        <div
          className="w-full relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {status === 'pending' ? (
            <PendingPage />
          ) : (
            rowVirtualizer.getVirtualItems().map((item) => {
              const isLoaderRow = item.index > rows.length - 1
              return (
                <div
                  key={item.key}
                  className={`${item.index % 2 === 1 ? 'bg-white' : 'bg-gray-50'}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${item.size}px`,
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  {isLoaderRow
                    ? hasNextPage
                      ? 'Loading more...'
                      : 'Nothing more to load...'
                    : rows[item.index]?.content}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
