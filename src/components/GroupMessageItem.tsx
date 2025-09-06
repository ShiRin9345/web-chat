import { forwardRef, memo } from 'react'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import type { UserResource } from '@clerk/types'
import type { MessageType, User } from 'generated/index'
import { cn } from '@/lib/utils.ts'
import { groupWithMembersAndModeratorsAndOwnerQueryOptions } from '@/features/reactQuery/options'
import { MessageAvatarPopover } from '@/components/message/MessageAvatarPopover'
import { GroupMessageHeader } from '@/components/message/MessageHeader'
import { MessageContent } from '@/components/message/MessageContent'

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
  sender: User
  timestamp: string
}

export const GroupMessageItem = memo(
  forwardRef<HTMLDivElement, MessageItemProps>(
    ({ content, type, user, index, sender }, ref) => {
      const isSelfMessage = sender.userId === user.id
      const { groupId } = useParams({ from: '/(main)/group/$groupId' })
      const { data: group } = useQuery(
        groupWithMembersAndModeratorsAndOwnerQueryOptions(groupId),
      )
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
            <GroupMessageHeader
              isSelf={isSelfMessage}
              isOwner={!!group && group.owner.userId === sender.userId}
              isModerator={
                !!group &&
                group.moderators.some((m) => m.userId === sender.userId)
              }
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
