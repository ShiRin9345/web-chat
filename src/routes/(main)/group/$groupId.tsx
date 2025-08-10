import { createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { GroupMessage } from 'generated/index.d.ts'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import useChatSocket from '@/hooks/useChatSocket.tsx'

const groupMessagesQueryOptions = (groupId: string) => ({
  queryKey: [`${groupId}_messages`],
  queryFn: async () => {
    const response = await axios.get<Array<GroupMessage>>(
      '/api/groupMessages',
      {
        params: { groupId },
      },
    )
    return response.data
  },
})

export const Route = createFileRoute('/(main)/group/$groupId')({
  component: Home,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(
      groupMessagesQueryOptions(params.groupId),
    )
  },
})

function Home() {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: messages } = useQuery<Array<GroupMessage>>(
    groupMessagesQueryOptions(groupId),
  )
  useChatSocket(`${groupId}_add_messages`, [`${groupId}_messages`])
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="p-2 flex-1 h-full overflow-auto">
        {messages?.map((message) => (
          <MessageItem key={message.id}>{message.content}</MessageItem>
        ))}
      </div>
      <div className="flex  items-center justify-center">
        <ChatInput />
      </div>
    </div>
  )
}

interface MessageItemProps {
  children: React.ReactNode
}

const MessageItem: React.FC<MessageItemProps> = ({ children }) => {
  return (
    <div className="w-full h-12 mt-2 bg-gray-50 flex items-center justify-start p-2">
      {children}
    </div>
  )
}
