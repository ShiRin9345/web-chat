import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useParams } from '@tanstack/react-router'
import { Input } from '@/components/ui/input.tsx'
import EmojiPicker from '@/components/emojiPicker.tsx'
import { useUser } from '@clerk/clerk-react'

const ChatInput = () => {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { user } = useUser()
  const form = useForm({
    onSubmit: async ({ value }) => {
      try {
        const content = value.content
        await axios.post('/api/groupMessages', {
          content,
          groupId,
          userId: user?.id,
        })
      } catch (e) {
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
          <div className="flex items-center justify-center ">
            <Input
              disabled={form.state.isSubmitting}
              placeholder="Send your message"
              className="bg-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0 border-none border-0"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <div className="ml-5">
              <EmojiPicker
                onChange={(emoji: string) =>
                  field.handleChange(`${field.state.value} ${emoji} `)
                }
              />
            </div>
          </div>
        )}
      />
    </form>
  )
}
export default ChatInput
