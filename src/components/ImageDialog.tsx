import { Image } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from '@tanstack/react-router'
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
import { MessageType } from '@/components/chatInput.tsx'

export type OssInfo = {
  OSSAccessKeyId: string
  Signature: string
  policy: string
  host: string
}

const ImageDialog = () => {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const [files, setFiles] = useState<Array<File> | undefined>()
  const [open, setOpen] = useState<boolean>(false)
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
    await axios.post('/api/groupMessages', {
      groupId,
      content: targetUrl,
      type: extension === 'pdf' ? MessageType.PDF : MessageType.IMAGE,
    })
    setFiles(undefined)
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
        <Dropzone onDrop={handleDrop} src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}
export default ImageDialog
