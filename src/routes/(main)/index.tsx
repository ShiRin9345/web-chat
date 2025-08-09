import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { Message } from '@prisma/client'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import { db } from '@/lib/db.ts'
import useChatSocket from '@/hooks/useChatSocket.tsx'

export const Route = createFileRoute('/(main)/')({
  beforeLoad: () => ({
    chatMessagesQueryOptions: {
      queryKey: ['chat-messages'],
      queryFn: async () => {
        const messages: Array<Message> = await db.message.findMany()
        return messages
      },
    },
  }),
  component: Home,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(context.chatMessagesQueryOptions)
  },
})

function Home() {
  const { chatMessagesQueryOptions } = Route.useRouteContext()
  const { data: messages } = useQuery(chatMessagesQueryOptions)
  useChatSocket('group', ['chat-messages'])
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
