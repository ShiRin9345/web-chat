import { Image, Upload } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
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
import { Badge } from '@/components/ui/badge'
import { useUploadStore } from '@/store/uploadStore'

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
  const [open, setOpen] = useState<boolean>(false)

  // 生成会话ID
  const getConversationId = useCallback(() => {
    if (groupId) return `group_${groupId}`
    if (friendUserId) return `friend_${friendUserId}`
    return conversationId || 'default'
  }, [groupId, friendUserId, conversationId])

  const conversationIdKey = useMemo(
    () => getConversationId(),
    [getConversationId],
  )

  const conversations = useUploadStore((s) => s.conversations)
  const currentConversation = conversations.get(conversationIdKey)

  // 计算当前正在上传的文件数量
  const uploadingCount = useMemo(() => {
    if (!currentConversation) return 0
    return Array.from(currentConversation.isUploading.values()).filter(Boolean)
      .length
  }, [currentConversation])

  const setProgress = useUploadStore((s) => s.setProgress)
  const setUploading = useUploadStore((s) => s.setUploading)
  const addEventSource = useUploadStore((s) => s.addEventSource)
  const removeEventSource = useUploadStore((s) => s.removeEventSource)
  const removeProgress = useUploadStore((s) => s.removeProgress)
  const addFiles = useUploadStore((s) => s.addFiles)
  const removeFile = useUploadStore((s) => s.removeFile)
  const bindUploadId = useUploadStore((s) => s.bindUploadId)
  const removeFileByUploadId = useUploadStore((s) => s.removeFileByUploadId)

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

  const uploadFile = async (file: File) => {
    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
    if (file.size > 1024 * 1024 * 100) {
      try {
        const formdata = new FormData()
        formdata.append('file', file)

        // 1. 启动上传（POST请求）
        const startUploadRes = await axios.post('/api/upload', formdata)
        const { uploadId } = startUploadRes.data

        // 使用 uploadId 作为 key
        setUploading(conversationIdKey, uploadId, true)
        // 绑定 uploadId 和文件名，便于渲染查找
        bindUploadId(conversationIdKey, uploadId, file.name)

        // 2. 连接SSE监听进度（GET请求）
        const es = new EventSource(`/api/upload-progress/${uploadId}`)
        addEventSource(conversationIdKey, uploadId, es)

        es.onmessage = (event) => {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case 'connected':
              console.log('Progress monitoring connected')
              break

            case 'progress':
              setProgress(conversationIdKey, uploadId, data)
              break

            case 'completed': {
              setProgress(conversationIdKey, uploadId, data)
              setUploading(conversationIdKey, uploadId, false)
              es.close()
              removeEventSource(conversationIdKey, uploadId)

              // 上传完成，发送消息
              const targetUrl = ossInfo.host + '/' + file.name
              const extension = file.name.split('.').pop()
              const type =
                extension === 'pdf' ? messageType.PDF : messageType.IMAGE

              mutateAsync({ content: targetUrl, type: type as MessageType })
              scrollBottom()
              removeFileByUploadId(conversationIdKey, uploadId)

              // 清除进度状态，避免重复上传时显示旧进度
              removeProgress(conversationIdKey, uploadId)
              break
            }

            case 'error': {
              console.error('Upload failed:', data.error)
              setUploading(conversationIdKey, uploadId, false)
              es.close()
              removeEventSource(conversationIdKey, uploadId)

              // 清除进度状态
              removeProgress(conversationIdKey, uploadId)
              removeFileByUploadId(conversationIdKey, uploadId)
              break
            }
          }
        }

        es.onerror = (error) => {
          console.error('EventSource failed:', error)
          setUploading(conversationIdKey, uploadId, false)
          es.close()
          removeEventSource(conversationIdKey, uploadId)

          // 清除进度状态
          removeProgress(conversationIdKey, uploadId)
          removeFileByUploadId(conversationIdKey, uploadId)
        }
      } catch (error) {
        console.error('Upload start failed:', error)
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
      removeFile(conversationIdKey, file.name)
    }
  }
  const handleDrop = (uploadFiles: Array<File>) => {
    addFiles(conversationIdKey, uploadFiles)
    for (const file of uploadFiles) {
      if (currentConversation?.files.some((f) => f.name === file.name)) {
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
        <div className="relative">
          <Image className="chatInput_icon" />
          {uploadingCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 pointer-events-none -right-2 h-5 opacity-85 w-5 flex items-center justify-center p-0 text-xs"
            >
              <Upload className="size-1" />
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Files</DialogTitle>
          <DialogDescription>
            Upload images or PDF files to share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {(currentConversation?.isUploading.size ?? 0) > 0 &&
            (currentConversation?.uploadProgress.size ?? 0) > 0 &&
            currentConversation?.files.map((file) => {
              // 优先通过绑定的 uploadId 映射查找
              const uploadId = Array.from(
                currentConversation.uploadIdToFileName.entries(),
              ).find(([, name]) => name === file.name)?.[0]

              if (!uploadId) return null

              const progress = currentConversation.uploadProgress.get(uploadId)

              return (
                <div
                  key={uploadId}
                  className="mb-4 p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">
                      {progress?.fileName || file.name}
                    </span>
                    <span className="text-blue-600">
                      {progress?.progress ?? 0}%
                    </span>
                  </div>

                  <Progress
                    value={progress?.progress ?? 0}
                    indicatorClassName="bg-blue-600"
                  />

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {Math.round((progress?.uploadedBytes ?? 0) / 1024 / 1024)}
                      MB /{Math.round((progress?.fileSize ?? 0) / 1024 / 1024)}
                      MB
                    </span>
                    <span>
                      {progress?.speed ?? 0}MB/s - 剩余{' '}
                      {Math.round(progress?.estimatedTimeLeft ?? 0)}s
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
        <Dropzone
          onDrop={handleDrop}
          src={currentConversation?.files}
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
