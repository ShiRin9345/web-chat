import { forwardRef, memo } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import PDFDisplay from '@/components/PDFDisplay'
import type { MessageType, User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { cn } from '@/lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge'
import { UserProfile } from '@/components/UserProfile'
import { groupWithMembersAndModeratorsAndOwnerQueryOptions } from '@/features/reactQuery/options'

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
          <Popover>
            <PopoverTrigger>
              <Avatar className="ml-2 size-12 cursor-pointer">
                <AvatarImage
                  src={isSelfMessage ? user.imageUrl : sender.imageUrl}
                  alt="avatar"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent side={isSelfMessage ? 'left' : 'right'} className="p-0">
              <UserProfile userId={sender.userId} sender={sender} />
            </PopoverContent>
          </Popover>

          <div className="flex space-y-2 flex-col">
            <div
              className={cn(
                'flex items-center gap-2 ',
                isSelfMessage && 'self-end',
                !isSelfMessage && 'self-start',
              )}
            >
              {isSelfMessage && group?.owner.userId === sender.userId && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
                >
                  Owner
                </Badge>
              )}
              {isSelfMessage &&
                group?.moderators.some(
                  (moderator) => moderator.userId === sender.userId,
                ) && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
                  >
                    Moderator
                  </Badge>
                )}
              <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
                {sender.fullName}
              </span>
              {!isSelfMessage && group?.owner.userId === sender.userId && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
                >
                  Owner
                </Badge>
              )}
              {!isSelfMessage &&
                group?.moderators.some(
                  (moderator) => moderator.userId === sender.userId,
                ) && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
                  >
                    Moderator
                  </Badge>
                )}
            </div>

            {type === 'TEXT' && (
              <p
                className={cn(
                  'text-sm max-w-[20rem] break-words text-white bg-blue-500 rounded-md self-start py-1 px-2',
                  isSelfMessage && 'ml-auto',
                )}
              >
                {content}
              </p>
            )}
            {type === 'IMAGE' && (
              <ImageZoom zoomMargin={100}>
                <img
                  src={content}
                  alt="image message"
                  className={cn(
                    'max-h-[25rem]  image-anchor w-auto object-contain object-left max-w-1/2 rounded-md self-start',
                    isSelfMessage && 'ml-auto',
                  )}
                  loading="lazy"
                />
                <a
                  className={cn(
                    ' rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage ? 'image_download_link_right' : 'image_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </ImageZoom>
            )}
            {type === 'PDF' && (
              <div
                className={cn(
                  'w-min pdf-anchor rounded-md overflow-hidden',
                  isSelfMessage && 'ml-auto',
                )}
              >
                <PDFDisplay fileName={content.split('/').pop() || 'Unknown File'} />
                <a
                  className={cn(
                    'rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage ? 'pdf_download_link_right' : 'pdf_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )
    },
  ),
)


