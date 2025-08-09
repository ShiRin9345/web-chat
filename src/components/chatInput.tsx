import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { Input } from '@/components/ui/input.tsx'

const ChatInput = () => {
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        const content = value.content
        await axios.post('/api/messages', {
          content,
        })
      } catch (e) {
        console.error(e)
        throw new Error('Error creating chat')
      }
    },
    defaultValues: {
      content: '',
    },
  })
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await form.handleSubmit()
        form.reset()
      }}
    >
      <form.Field
        name="content"
        children={(field) => (
          <Input
            disabled={form.state.isSubmitting}
            placeholder="Send your message"
            className="bg-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0 border-none border-0"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
    </form>
  )
}
export default ChatInput
