import { createFileRoute } from '@tanstack/react-router'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState } from 'react'
import { AIResponse } from '@/components/ui/shadcn-io/ai/response.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  })
  const [input, setInput] = useState<string>('')
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part) =>
            part.type === 'text' ? <AIResponse>{part.text}</AIResponse> : null,
          )}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) {
            sendMessage({ text: input })
            setInput('')
          }
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== 'ready'}
          placeholder="Enter some text..."
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
