import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import imageCompression from 'browser-image-compression'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'

const AvatarUpload = () => {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<Array<File>>([])
  const { user } = useUser()

  const handleDrop = async (uploadFiles: Array<File>) => {
    const file = uploadFiles[0]
    setOpen(false)
    setFiles([])

    toast.loading('Uploading avatar...')

    const formdata = new FormData()

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    }

    const compressedFile = await imageCompression(file, options)

    const response = await axios.get<OssInfo>('/api/oss-signature')

    const ossInfo = response.data
    formdata.append('key', file.name)
    formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
    formdata.append('policy', ossInfo.policy)
    formdata.append('signature', ossInfo.Signature)
    formdata.append('success_action_status', '200')
    formdata.append('file', compressedFile)

    const fileName = file.name.replace(/\.[^/.]+$/, '.webp')
    await axios.post(ossInfo.host, formdata)
    const targetUrl = ossInfo.host + '/' + fileName
    await user?.setProfileImage({ file: compressedFile })
    await axios.post('/api/avatar', { imageUrl: targetUrl })

    toast.dismiss()
    toast.success('Avatar uploaded successfully')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen: boolean) => {
        setOpen(newOpen)
        setFiles([])
      }}
    >
      <DialogTrigger>
        <Avatar className="size-32">
          <AvatarImage
            src={user?.imageUrl}
            alt="avatar"
            className="cursor-pointer object-cover"
          />
          <AvatarFallback className="bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
            <Loader className="animate-spin" />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
          <DialogDescription>Upload avatar to your profile</DialogDescription>
        </DialogHeader>
        <Dropzone
          onDrop={handleDrop}
          src={files}
          accept={{ 'image/*': [] }}
          maxFiles={8}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  )
}

export default AvatarUpload
