import { Image } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import type { MessageType } from '@/type'
import type { User } from 'generated/index'
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
  const handleDrop = async (uploadFiles: Array<File>) => {
    setFiles(uploadFiles)
    const file = uploadFiles[0]
    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
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
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen: boolean) => {
        if (!newOpen) {
          setFiles(undefined)
        }
        setOpen(newOpen)
      }}
    >
      <DialogTrigger>
        <Image className="chatInput_icon" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Send image</DialogHeader>
        <Dropzone onDrop={handleDrop} src={files} accept={{ 'image/*': [] }}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}
export default ImageDialog
