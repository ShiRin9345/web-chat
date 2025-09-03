import { useForm } from '@tanstack/react-form'
import { CirclePlus } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import type { User } from 'generated/index'
import EmojiPicker from '@/components/emojiPicker.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import ImageDialog from '@/components/ImageDialog.tsx'
import { chatInputMutateOptions } from '@/features/reactQuery/options.ts'
import { scrollBottom } from '@/lib/scroll.ts'

export const messageType = {
  IMAGE: 'IMAGE',
  TEXT: 'TEXT',
  PDF: 'PDF',
}

interface Props {
  groupId?: string
  conversationId?: string
  friendUserId?: string
}

const ChatInput: React.FC<Props> = ({
  groupId,
  friendUserId,
  conversationId,
}) => {
  const queryClient = useQueryClient()
  const { user } = useUser()
  const sender = {
    imageUrl: user?.imageUrl,
    fullName: user?.fullName,
    userId: user?.id,
  }
  const { mutateAsync } = useMutation(
    chatInputMutateOptions({
      groupId,
      friendUserId,
      conversationId,
      sender: sender as User,
      queryClient,
    }),
  )
  const form = useForm({
    onSubmit: async ({ value }) => {
      await mutateAsync({ content: value.content, type: 'TEXT' })
      scrollBottom()
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
          <div className="bg-white/90 dark:bg-gray-900/90 orange:bg-orange-50/90 flex backdrop-blur-md  pt-2 flex-col px-5 w-full">
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
                className="bg-white dark:bg-gray-800 orange:bg-orange-100 resize-none  max-h-[10rem] focus-visible:ring-0! focus-visible:border-input dark:text-white orange:text-orange-900 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600"
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
              <ImageDialog
                groupId={groupId}
                conversationId={conversationId}
                friendUserId={friendUserId}
              />
              <CirclePlus className="chatInput_icon" />
            </div>
          </div>
        )}
      </form.Field>
    </form>
  )
}
export default ChatInput
