import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input.tsx'
import socket from '@/lib/socket.ts'

const ChatInput = () => {
  const form = useForm({
    defaultValues: {
      message: '',
    },
    onSubmit: ({ value }) => {
      socket.emit('send', value.message)
      form.reset()
    },
  })
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await form.handleSubmit()
      }}
      className="w-1/2"
    >
      {form.Field({
        name: 'message',
        children: (field) => (
          <Input
            value={field.state.value}
            placeholder="Send your message..."
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={form.state.isSubmitting}
            className="w-full  focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        ),
      })}
    </form>
  )
}
export default ChatInput
