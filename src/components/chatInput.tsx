import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useParams } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { CirclePlus, Image } from 'lucide-react'
import EmojiPicker from '@/components/emojiPicker.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'

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
      <form.Field name="content">
        {(field) => (
          <div className="bg-white/90  flex backdrop-blur-md  pt-2 flex-col px-5 w-full">
            <div className="flex items-center justify-center space-x-5 ">
              <Textarea
                placeholder="Type your message here..."
                value={field.state.value}
                disabled={form.state.isSubmitting}
                onChange={(e) => field.handleChange(e.target.value)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    if (field.state.value.trim()) {
                      await form.handleSubmit()
                      form.reset()
                    }
                  }
                }}
                className="bg-white resize-none  max-h-[10rem] focus-visible:ring-0! focus-visible:border-input"
              />
              <Button
                variant="send"
                disabled={field.state.value === '' || form.state.isSubmitting}
                type="submit"
                className="self-end"
              >
                Send
              </Button>
            </div>
            <div className="w-full h-12 justify-around items-center flex ">
              <EmojiPicker
                onChange={(emoji: string) =>
                  field.handleChange(`${field.state.value} ${emoji} `)
                }
              />
              <Image className="chatInput_icon" />
              <CirclePlus className="chatInput_icon" />
            </div>
          </div>
        )}
      </form.Field>
    </form>
  )
}
export default ChatInput
