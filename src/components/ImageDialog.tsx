import { Image } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { MessageType } from '@/type'
import type { User } from 'generated/index'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import { messageType } from '@/components/chatInput.tsx'
import { chatInputMutateOptions } from '@/features/reactQuery/options.ts'
import { scrollBottom } from '@/lib/scroll.ts'
import { Progress } from './ui/progress'

export type OssInfo = {
  OSSAccessKeyId: string
  Signature: string
  policy: string
  host: string
}

const ImageDialog = ({
  conversationId,
  friendUserId,
  groupId,
}: {
  conversationId?: string
  friendUserId?: string
  groupId?: string
}) => {
  const [files, setFiles] = useState<Array<File> | undefined>()
  const [open, setOpen] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [eventSource, setEventSource] = useState<EventSource | null>(null)

  const { user } = useUser()
  const sender = {
    imageUrl: user?.imageUrl,
    fullName: user?.fullName,
    userId: user?.id,
  }
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(
    chatInputMutateOptions({
      queryClient,
      conversationId,
      friendUserId,
      groupId,
      sender: sender as User,
    }),
  )

  // 清理EventSource
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [eventSource])

  const handleDrop = async (uploadFiles: Array<File>) => {
    const file = uploadFiles[0]
    setFiles(uploadFiles)

    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
    if (file.size > 1024 * 1024 * 100) {
      // 大文件：使用服务器上传 + 进度监控
      setIsUploading(true)
      setUploadProgress(null)

      try {
        const formdata = new FormData()
        formdata.append('file', file)

        // 1. 启动上传（POST请求）
        const response = await axios.post('/api/upload', formdata)
        const { uploadId } = response.data

        // 2. 连接SSE监听进度（GET请求）
        const es = new EventSource(`/api/upload-progress/${uploadId}`)
        setEventSource(es)

        es.onmessage = (event) => {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case 'connected':
              console.log('Progress monitoring connected')
              break

            case 'progress':
              setUploadProgress(data)
              break

            case 'completed': {
              setUploadProgress(data)
              setIsUploading(false)
              es.close()
              setEventSource(null)

              // 上传完成，发送消息
              const targetUrl = ossInfo.host + '/' + file.name
              const extension = file.name.split('.').pop()
              const type =
                extension === 'pdf' ? messageType.PDF : messageType.IMAGE

              mutateAsync({ content: targetUrl, type: type as MessageType })
              scrollBottom()
              setFiles(undefined)
              setOpen(false)
              break
            }

            case 'error': {
              console.error('Upload failed:', data.error)
              setIsUploading(false)
              es.close()
              setEventSource(null)
              break
            }
          }
        }

        es.onerror = (error) => {
          console.error('EventSource failed:', error)
          setIsUploading(false)
          es.close()
          setEventSource(null)
        }
      } catch (error) {
        console.error('Upload start failed:', error)
        setIsUploading(false)
      }
    } else {
      // 小文件：直接上传到OSS

      const formdata = new FormData()

      formdata.append('key', file.name)
      formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
      formdata.append('policy', ossInfo.policy)
      formdata.append('signature', ossInfo.Signature)
      formdata.append('success_action_status', '200')
      formdata.append('file', file)

      await axios.post(ossInfo.host, formdata)
      const targetUrl = ossInfo.host + '/' + file.name
      const extension = file.name.split('.').pop()
      const type = extension === 'pdf' ? messageType.PDF : messageType.IMAGE

      mutateAsync({ content: targetUrl, type: type as MessageType })
      scrollBottom()
      setFiles(undefined)
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen: boolean) => {
        if (!newOpen) {
          setFiles(undefined)
          setUploadProgress(null)
          setIsUploading(false)
          if (eventSource) {
            eventSource.close()
            setEventSource(null)
          }
        }
        setOpen(newOpen)
      }}
    >
      <DialogTrigger>
        <Image className="chatInput_icon" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Files</DialogTitle>
          <DialogDescription>
            Upload images or PDF files to share with others.
          </DialogDescription>
        </DialogHeader>

        {/* 上传进度显示 */}
        {isUploading && uploadProgress && (
          <div className="mb-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{uploadProgress.fileName}</span>
              <span className="text-blue-600">{uploadProgress.progress}%</span>
            </div>

            {/* <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress.progress}%` }}
              />
            </div> */}
            <Progress
              value={uploadProgress.progress}
              indicatorClassName="bg-blue-600"
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {Math.round(uploadProgress.uploadedBytes / 1024 / 1024)}MB /
                {Math.round(uploadProgress.fileSize / 1024 / 1024)}MB
              </span>
              <span>
                {uploadProgress.speed}MB/s - 剩余{' '}
                {Math.round(uploadProgress.estimatedTimeLeft)}s
              </span>
            </div>
          </div>
        )}

        <Dropzone
          onDrop={handleDrop}
          src={files}
          accept={{ 'image/*': [], 'application/pdf': [] }}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
