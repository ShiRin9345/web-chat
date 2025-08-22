import { Outlet, createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { conversationQueryOptions } from '@/features/reactQuery/options.ts'
import DropProvider from '@/providers/dropProvider.tsx'

export const Route = createFileRoute('/(main)/conversation')({
  component: RouteComponent,
})

function RouteComponent() {
  const { friendUserId } = useParams({
    from: '/(main)/conversation/$friendUserId',
  })
  const { data: conversation } = useQuery(
    conversationQueryOptions(friendUserId),
  )

  return (
    <DropProvider friendUserId={friendUserId} conversationId={conversation?.id}>
      <Outlet />
    </DropProvider>
  )
}
