import { Image } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'

import type { User } from 'generated/index'
import type { MessageType } from '@/type'
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
import { Progress } from '@/components/ui/progress'

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
  const [uploadProgress, setUploadProgress] = useState<Map<string, any>>(
    new Map(),
  )
  const [isUploading, setIsUploading] = useState<Map<string, boolean>>(
    new Map(),
  )
  const [eventSources, setEventSources] = useState<Map<string, EventSource>>(
    new Map(),
  )

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

  useEffect(() => {
    return () => {
      eventSources.forEach((es) => {
        es.close()
      })
    }
  }, [])

  const uploadFile = async (file: File) => {
    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
    if (file.size > 1024 * 1024 * 100) {
      setIsUploading((prev) => new Map(prev).set(file.name, true))

      try {
        const formdata = new FormData()
        formdata.append('file', file)

        // 1. 启动上传（POST请求）
        const response = await axios.post('/api/upload', formdata)
        const { uploadId } = response.data

        // 2. 连接SSE监听进度（GET请求）
        const es = new EventSource(`/api/upload-progress/${uploadId}`)
        setEventSources((prev) => new Map(prev).set(file.name, es))

        es.onmessage = (event) => {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case 'connected':
              console.log('Progress monitoring connected')
              break

            case 'progress':
              setUploadProgress((prev) => new Map(prev).set(file.name, data))
              break

            case 'completed': {
              setUploadProgress((prev) => new Map(prev).set(file.name, data))
              setIsUploading((prev) => new Map(prev).set(file.name, false))
              es.close()
              setEventSources((prev) => {
                const newMap = new Map(prev)
                newMap.delete(file.name)
                return newMap
              })

              // 上传完成，发送消息
              const targetUrl = ossInfo.host + '/' + file.name
              const extension = file.name.split('.').pop()
              const type =
                extension === 'pdf' ? messageType.PDF : messageType.IMAGE

              mutateAsync({ content: targetUrl, type: type as MessageType })
              scrollBottom()
              setFiles((prev) => prev?.filter((f) => f.name !== file.name))
              break
            }

            case 'error': {
              console.error('Upload failed:', data.error)
              setIsUploading((prev) => new Map(prev).set(file.name, false))
              es.close()
              setEventSources((prev) => {
                const newMap = new Map(prev)
                newMap.delete(file.name)
                return newMap
              })
              break
            }
          }
        }

        es.onerror = (error) => {
          console.error('EventSource failed:', error)
          setIsUploading((prev) => new Map(prev).set(file.name, false))
          es.close()
          setEventSources((prev) => {
            const newMap = new Map(prev)
            newMap.delete(file.name)
            return newMap
          })
        }
      } catch (error) {
        console.error('Upload start failed:', error)
        setIsUploading((prev) => new Map(prev).set(file.name, false))
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
      setFiles((prev) => prev?.filter((f) => f.name !== file.name))
    }
  }
  const handleDrop = async (uploadFiles: Array<File>) => {
    setFiles((prev) => [
      ...(prev || []),
      ...uploadFiles.filter((f) => !prev?.some((p) => p.name === f.name)),
    ])
    for (const file of uploadFiles) {
      if (files?.some((f) => f.name === file.name)) {
        continue
      }
      uploadFile(file)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen: boolean) => {
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
        <div className="max-h-[400px] overflow-y-auto">
          {isUploading.size > 0 &&
            uploadProgress.size > 0 &&
            files?.map((file) => (
              <div
                key={file.name + new Date()}
                className="mb-4 p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">
                    {uploadProgress.get(file.name)?.fileName}
                  </span>
                  <span className="text-blue-600">
                    {uploadProgress.get(file.name)?.progress}%
                  </span>
                </div>

                <Progress
                  value={uploadProgress.get(file.name)?.progress}
                  indicatorClassName="bg-blue-600"
                />

                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {Math.round(
                      uploadProgress.get(file.name)?.uploadedBytes /
                        1024 /
                        1024,
                    )}
                    MB /
                    {Math.round(
                      uploadProgress.get(file.name)?.fileSize / 1024 / 1024,
                    )}
                    MB
                  </span>
                  <span>
                    {uploadProgress.get(file.name)?.speed}MB/s - 剩余{' '}
                    {Math.round(
                      uploadProgress.get(file.name)?.estimatedTimeLeft,
                    )}
                    s
                  </span>
                </div>
              </div>
            ))}
        </div>
        <Dropzone
          onDrop={handleDrop}
          src={files}
          accept={{ 'image/*': [], 'application/pdf': [] }}
          maxFiles={8}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}

export default ImageDialog
