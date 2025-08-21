import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ChatInput from '@/components/chatInput.tsx'
import ChatHeader from '@/components/chatHeader.tsx'
import { conversationQueryOptions } from '@/features/reactQuery/options.ts'
import VirtualChatList from '@/components/virtualChatList.tsx'
import DropFile from '@/components/dropFile.tsx'

export const Route = createFileRoute('/(main)/conversation/$friendUserId')({
  component: RouteComponent,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      conversationQueryOptions(params.friendUserId),
    )
  },
})

function RouteComponent() {
  const { friendUserId } = Route.useParams()
  const { data: conversation } = useQuery(
    conversationQueryOptions(friendUserId),
  )

  return (
    <div className="flex relative flex-col h-screen">
      <DropFile />
      <ChatHeader roomId={conversation?.id as string} />
      <VirtualChatList
        friendUserId={friendUserId}
        conversationId={conversation?.id}
      />
      <ChatInput
        conversationId={conversation?.id as string}
        friendUserId={friendUserId}
      />
    </div>
  )
}
