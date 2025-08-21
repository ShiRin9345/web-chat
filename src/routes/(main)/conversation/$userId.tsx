import { createFileRoute } from '@tanstack/react-router'
import { queryOptions, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { Conversation, PrivateMessage, User } from 'generated/index'

type ConversationWithMessagesWithUsers = Conversation & {
  messages: Array<PrivateMessage>
  members: Array<User>
}

const conversationQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['conversation', userId],
    queryFn: async () => {
      const response = await axios.get<ConversationWithMessagesWithUsers>(
        '/api/conversation',
        {
          params: {
            otherUserId: userId,
          },
        },
      )
      return response.data
    },
  })

export const Route = createFileRoute('/(main)/conversation/$userId')({
  component: RouteComponent,
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(conversationQueryOptions(params.userId))
  },
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { data: conversation } = useQuery(conversationQueryOptions(userId))
  return <div>{conversation?.id}</div>
}
