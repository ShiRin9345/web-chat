import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState } from 'react'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

type OssInfo = {
  OSSAccessKeyId: string
  policy: string
  Signature: string
  host: string
}

function RouteComponent() {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const handleDrop = async (files: Array<File>) => {
    const response = await axios.get<OssInfo>('/api/oss-signature')
    const ossInfo = response.data
    const file = files[0]

    const formdata = new FormData()

    formdata.append('key', file.name)
    formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
    formdata.append('policy', ossInfo.policy)
    formdata.append('signature', ossInfo.Signature)
    formdata.append('success_action_status', '200')
    formdata.append('file', file)

    await axios.post(ossInfo.host, formdata)
    const filePath = ossInfo.host + '/' + file.name
    console.log(filePath)
    setImgUrl(filePath)
  }

  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <Dropzone
        accept={{ 'image/*': [] }}
        maxSize={1024 * 1024 * 10}
        maxFiles={1}
        minSize={0}
        onError={console.error}
        onDrop={handleDrop}
        className="w-1/2"
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {imgUrl && <img src={imgUrl} alt="img" />}
    </div>
  )
}
