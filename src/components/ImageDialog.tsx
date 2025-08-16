import { Image } from 'lucide-react'
import { useState } from 'react'
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
import axios from 'axios'

type OssInfo = {
  OSSAccessKeyId: string
  Signature: string
  policy: string
  host: string
}

const ImageDialog = () => {
  const [files, setFiles] = useState<Array<File> | undefined>()
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
    const res = await axios.post(ossInfo.host, formdata)
    const targetUrl = ossInfo.host + '/' + file.name
    if (res.status === 200) {
      alert(`upload to ${targetUrl}`)
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Image className="chatInput_icon" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Upload image</DialogHeader>
        <Dropzone onDrop={handleDrop} src={files}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}
export default ImageDialog
