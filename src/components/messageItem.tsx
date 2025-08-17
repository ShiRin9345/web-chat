import { forwardRef } from 'react'
import type { MessageType } from '../../type'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
}

export const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(
  ({ content, type, user, index }, ref) => {
    return (
      <div
        data-index={index}
        className="w-full mt-2  flex p-2 rounded-sm items-start space-x-2"
        ref={ref}
      >
        <div className="flex items-start  ">
          <img src={user.imageUrl} alt="Avatar" className="rounded-full h-12" />
        </div>
        <div className="flex w-full space-y-2 flex-col">
          <span className="font-semibold">{user.fullName}</span>
          {type === 'TEXT' && (
            <p className="text-sm max-w-[20rem] break-words text-white bg-blue-500 rounded-md self-start py-1 px-2  ">
              {content}
            </p>
          )}
          {type === 'IMAGE' && (
            <ImageZoom zoomMargin={100}>
              <img
                src={content}
                alt="image message"
                className="max-h-[25rem] w-auto object-contain object-left max-w-1/2 rounded-md self-start"
                loading="lazy"
              />
            </ImageZoom>
          )}
        </div>
      </div>
    )
  },
)
