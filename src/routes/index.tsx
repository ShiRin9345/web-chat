import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import ChatHeader from '@/components/chatHeader.tsx'
import ChatInput from '@/components/chatInput.tsx'
import socket from '@/lib/socket.ts'
import { useChatStore } from '@/store/chatStore.ts'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const messages = useChatStore((state) => state.messages)
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
        {messages.map((message) => (
          <MessageItem>{message}</MessageItem>
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
