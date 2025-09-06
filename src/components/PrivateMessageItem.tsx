import { forwardRef, memo } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import PDFDisplay from '@/components/PDFDisplay'
import type { MessageType, User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { cn } from '@/lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { UserProfile } from '@/components/UserProfile'

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
              <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
                {sender.fullName}
              </span>
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


