import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import { ImagePlus } from 'lucide-react'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { messageType } from '@/components/chatInput.tsx'
import { cn } from '@/lib/utils.ts'

const DropFile = () => {
  const onDrop = async (uploadFiles: Array<File>) => {
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
    await axios.post('/api/groupMessages', {
      content: targetUrl,
      type: messageType.IMAGE,
    })
  }
  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    },
    onDrop,
    noDragEventsBubbling: true,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'absolute inset-0 transition-all z-50 duration-500 bg-transparent backdrop-blur-lg',
        !isDragActive && 'opacity-0',
      )}
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35rem] h-[13rem] bg-white flex flex-col items-center justify-center rounded-lg gap-2 py-4">
        <ImagePlus />
        <p className="font-semibold">Drag and drop your file here.</p>
      </div>
    </div>
  )
}
export default DropFile
