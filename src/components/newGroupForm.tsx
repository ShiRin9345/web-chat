import React, { useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import imageCompression from 'browser-image-compression'
import { Loader, User as UserIcon } from 'lucide-react'
import type { Group } from 'generated/index'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { sidebarListQueryOptions } from '@/routes/(main)/route.tsx'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  setOpen: (open: boolean) => void
}
const groupSchema = z.object({
  name: z.string().min(1),
})

const NewGroupForm: React.FC<Props> = ({ setOpen }) => {
  const queryClient = useQueryClient()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: groupSchema,
      onChange: groupSchema,
    },
    onSubmit: async ({ value }) => {
      await axios.post<Group>('/api/group', {
        name: value.name,
        imageUrl,
      })
      queryClient.invalidateQueries(sidebarListQueryOptions)
      setOpen(false)
    },
  })

  const handleSelect = async (file: File) => {
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
    setImageUrl(targetUrl)
  }

  return (
    <div>
      {' '}
      <DialogHeader>
        <DialogTitle>Group name</DialogTitle>
      </DialogHeader>
      <div className="px-1 py-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            if (f) {
              setIsUploading(true)
              try {
                await handleSelect(f)
              } finally {
                setIsUploading(false)
              }
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 orange:border-orange-300 flex items-center justify-center bg-gray-50 dark:bg-gray-800 orange:bg-orange-100"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="group-cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 orange:text-orange-700" />
          )}
          {isUploading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Loader className="w-5 h-5 text-white animate-spin" />
            </div>
          )}
        </button>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 orange:text-orange-700">
          Optional cover. Click the icon to upload.
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await form.handleSubmit()
          form.reset()
        }}
        className="space-y-6"
      >
        <form.Field
          name="name"
          children={(field) => (
            <>
              <div>
                <Label
                  htmlFor="name"
                  className="mb-2"
                  onClick={() => console.log(field.state.meta.errors)}
                >
                  name:
                </Label>
                <Input
                  placeholder="New group name..."
                  name="name"
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <em role="alert" className="text-red-400">
                    {field.state.meta.errors
                      .map((error) => error?.message)
                      .join(' ')}
                  </em>
                )}
              </div>
            </>
          )}
        />
        <DialogFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit} variant="send">
                Submit
              </Button>
            )}
          />
        </DialogFooter>
      </form>
    </div>
  )
}
export default NewGroupForm
