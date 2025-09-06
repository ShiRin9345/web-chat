import { forwardRef, memo } from 'react'
import type { MessageType, User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import { cn } from '@/lib/utils.ts'
import { MessageAvatarPopover } from '@/components/message/MessageAvatarPopover'
import { MessageContent } from '@/components/message/MessageContent'
import { PrivateMessageHeader } from '@/components/message/MessageHeader'

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
  sender: User
  timestamp: string
}

export const PrivateMessageItem = memo(
  forwardRef<HTMLDivElement, MessageItemProps>(
    ({ content, type, user, index, sender }, ref) => {
      const isSelfMessage = sender.userId === user.id
      return (
        <div
          data-index={index}
          className={cn(
            'w-full mt-2  flex p-2 rounded-sm items-start space-x-2',
            isSelfMessage && 'flex-row-reverse space-x-0',
          )}
          ref={ref}
        >
          <MessageAvatarPopover
            isSelfMessage={isSelfMessage}
            userImageUrl={user.imageUrl}
            senderImageUrl={sender.imageUrl}
            sender={sender}
          />

          <div className="flex space-y-2 flex-col">
            <PrivateMessageHeader
              isSelf={isSelfMessage}
              senderName={sender.fullName}
            />
            <MessageContent
              type={type}
              content={content}
              isSelf={isSelfMessage}
            />
          </div>
        </div>
      )
    },
  ),
)
