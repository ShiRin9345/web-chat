import { forwardRef } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import type { MessageType, User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import PendingPage from '@/components/pendingPage.tsx'
import { cn } from '@/lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
  sender: User
}

export const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(
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
        <Avatar className="ml-2 size-12">
          <AvatarImage
            src={isSelfMessage ? user.imageUrl : sender.imageUrl}
            alt="avatar"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        <div className="flex w-full space-y-2 flex-col ">
          <span
            className={cn(
              'font-semibold text-gray-900 dark:text-white orange:text-orange-900',
              isSelfMessage && 'ml-auto',
            )}
          >
            {sender.fullName}
          </span>
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
                  isSelfMessage
                    ? 'image_download_link_right'
                    : 'image_download_link',
                )}
                href={content}
                download
              >
                <ArrowDownToLine className="cursor-pointer! size-5" />
              </a>
            </ImageZoom>
          )}
          {type === 'PDF' && (
            <div className="w-min pdf-anchor rounded-md overflow-hidden">
              <Document
                file={content}
                loading={<PendingPage />}
                className="pointer-events-none"
              >
                <Page loading={<PendingPage />} pageNumber={1} height={300} />
              </Document>
              <a
                className={cn(
                  'rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                  isSelfMessage
                    ? 'pdf_download_link_right'
                    : 'pdf_download_link',
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
)
