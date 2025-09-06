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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog } from '@radix-ui/react-dialog'

interface Props {
  setOpen: (open: boolean) => void
}
const groupSchema = z.object({
  name: z.string().min(1),
})

const NewGroupForm: React.FC<Props> = ({ setOpen }) => {
  const queryClient = useQueryClient()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
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
      let uploadedUrl: string | undefined
      if (selectedFile) {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp',
          }
          const compressedFile = await imageCompression(selectedFile, options)
          const response = await axios.get<OssInfo>('/api/oss-signature')
          const ossInfo = response.data
          const formdata = new FormData()
          formdata.append('key', selectedFile.name)
          formdata.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId)
          formdata.append('policy', ossInfo.policy)
          formdata.append('signature', ossInfo.Signature)
          formdata.append('success_action_status', '200')
          formdata.append('file', compressedFile)
          const fileName = selectedFile.name.replace(/\.[^/.]+$/, '.webp')
          await axios.post(ossInfo.host, formdata)
          uploadedUrl = ossInfo.host + '/' + fileName
        } catch (error) {
          console.error('Upload failed:', error)
        }
      }

      await axios.post<Group>('/api/group', {
        name: value.name,
        imageUrl: uploadedUrl,
      })
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(undefined)
      setSelectedFile(undefined)
      queryClient.invalidateQueries(sidebarListQueryOptions)
      setOpen(false)
    },
  })

  const handleSelect = (file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Group</DialogTitle>
        <DialogDescription>
          Create a group with a name and an optional cover image.
        </DialogDescription>
      </DialogHeader>
      <div className="px-1  flex flex-col items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0]
            if (f) {
              try {
                await handleSelect(f)
              } catch (error) {
                console.error('Upload failed:', error)
              }
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 orange:border-orange-300 flex items-center justify-center bg-gray-50 dark:bg-gray-800 orange:bg-orange-100"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="group-cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-8 h-8 text-gray-500 dark:text-gray-400 orange:text-orange-700" />
          )}
          {form.state.isSubmitting && (
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
        className="gap-6 flex flex-col"
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
        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="self-end"
              variant="send"
            >
              {form.state.isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          )}
        />
      </form>
    </>
  )
}
export default NewGroupForm
