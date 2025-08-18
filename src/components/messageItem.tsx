import { forwardRef } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import type { MessageType } from '../../type'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import PendingPage from '@/components/pendingPage.tsx'

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
                className="max-h-[25rem] image-anchor w-auto object-contain object-left max-w-1/2 rounded-md self-start"
                loading="lazy"
              />
              <a
                className="image_download_link rounded-full hover:bg-zinc-300 p-1 transition duration-200 bg-white "
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
                className="pdf_download_link rounded-full hover:bg-zinc-300 p-1 transition duration-200 bg-white "
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
