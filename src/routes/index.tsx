import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import socket from '@/lib/socket.ts'
import { useChatStore } from '@/store/chatStore.ts'
import { db } from '@/lib/db.ts'

export const Route = createFileRoute('/')({
  beforeLoad: () => ({
    chatMessagesQueryOptions: {
      queryKey: ['chat-messages'],
      queryFn: async () => {
        const messages = await db.message.findMany()
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
  const addMessage = useChatStore((state) => state.addMessage)
  useEffect(() => {
    socket.on('received', addMessage)
    return () => {
      socket.off('received', addMessage)
    }
  }, [addMessage])
  return (
    <main className="flex flex-col h-full">
      <ChatHeader />
      <div className="p-2 flex-1 h-full overflow-auto">
        {messages?.map((message) => (
          <MessageItem>{message.content}</MessageItem>
        ))}
      </div>
      <div className="flex  items-center justify-center">
        <ChatInput />
      </div>
    </main>
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
