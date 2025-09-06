import { ArrowDownToLine } from 'lucide-react'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import PDFDisplay from '@/components/PDFDisplay'
import { cn } from '@/lib/utils'
import type { MessageType } from 'generated/index'

interface Props {
  type: MessageType
  content: string
  isSelf: boolean
}

export function MessageContent({ type, content, isSelf }: Props) {
  if (type === 'TEXT') {
    return (
      <p
        className={cn(
          'text-sm max-w-[20rem] break-words text-white bg-blue-500 rounded-md self-start py-1 px-2',
          isSelf && 'ml-auto',
        )}
      >
        {content}
      </p>
    )
  }
  if (type === 'IMAGE') {
    return (
      <ImageZoom zoomMargin={100}>
        <img
          src={content}
          alt="image message"
          className={cn(
            'max-h-[25rem]  image-anchor w-auto object-contain object-left max-w-1/2 rounded-md self-start',
            isSelf && 'ml-auto',
          )}
          loading="lazy"
        />
        <a
          className={cn(
            ' rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
            isSelf ? 'image_download_link_right' : 'image_download_link',
          )}
          href={content}
          download
        >
          <ArrowDownToLine className="cursor-pointer! size-5" />
        </a>
      </ImageZoom>
    )
  }
  // PDF
  return (
    <div
      className={cn(
        'w-min pdf-anchor rounded-md overflow-hidden',
        isSelf && 'ml-auto',
      )}
    >
      <PDFDisplay fileName={content.split('/').pop() || 'Unknown File'} />
      <a
        className={cn(
          'rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
          isSelf ? 'pdf_download_link_right' : 'pdf_download_link',
        )}
        href={content}
        download
      >
        <ArrowDownToLine className="cursor-pointer! size-5" />
      </a>
    </div>
  )
}
