import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useParams } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { GroupMessage } from '@prisma/client'
import EmojiPicker from '@/components/emojiPicker.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import ImageDialog from '@/components/ImageDialog.tsx'

export const MessageType = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  PDF: 'PDF',
}

const ChatInput = () => {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationKey: ['messages', groupId],
    mutationFn: async (content: string) => {
      try {
        const response = await axios.post<GroupMessage>('/api/groupMessages', {
          content,
          groupId,
          type: MessageType.TEXT,
        })
        return response.data
      } catch (e) {
        throw new Error('Error creating chat')
      }
    },
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: ['messages', groupId] })
      queryClient.setQueryData(['messages', groupId], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [
                  {
                    id: `optimistic-${Date.now()}`,
                    content,
                    type: MessageType.TEXT,
                  },
                ],
              },
            ],
          }
        }
        const newData = [...oldData.pages]
        const lastIndex = newData.length - 1
        newData[lastIndex] = {
          ...newData[lastIndex],
          messages: newData[lastIndex].messages.concat({
            id: `optimistic-${Date.now()}`,
            content,
            type: MessageType.TEXT,
          }),
        }
        return {
          ...oldData,
          pages: newData,
        }
      })
    },
    onSuccess: (newMessage: GroupMessage) => {
      queryClient.setQueryData(['messages', groupId], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData
        }
        const newData = [...oldData.pages]
        const lastIndex = newData.length - 1
        const newMessages = newData[lastIndex].messages.map(
          (message: GroupMessage) => {
            if (message.id.startsWith('optimistic-')) {
              return newMessage
            }
            return message
          },
        )
        newData[lastIndex] = {
          ...newData[lastIndex],
          messages: newMessages,
        }
      })
    },
  })
  const form = useForm({
    onSubmit: async ({ value }) => {
      await mutateAsync(value.content)
    },
    defaultValues: {
      content: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        if (!value.content || !value.content.trim()) {
          return 'no content'
        }
      },
    },
  })
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        e.stopPropagation()
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
                    await form.handleSubmit()
                    form.reset()
                  }
                }}
                className="bg-white resize-none  max-h-[10rem] focus-visible:ring-0! focus-visible:border-input"
              />
              <Button
                variant="send"
                disabled={!field.state.value.trim() || form.state.isSubmitting}
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
              <ImageDialog />
              <CirclePlus className="chatInput_icon" />
            </div>
          </div>
        )}
      </form.Field>
    </form>
  )
}
export default ChatInput
