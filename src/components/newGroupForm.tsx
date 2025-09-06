import React, { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import type { Group } from 'generated/index'
import { sidebarListQueryOptions } from '@/routes/(main)/route.tsx'
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import imageCompression from 'browser-image-compression'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'

interface Props {
  setOpen: (open: boolean) => void
}
const groupSchema = z.object({
  name: z.string().min(1),
})

const NewGroupForm: React.FC<Props> = ({ setOpen }) => {
  const queryClient = useQueryClient()
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [files, setFiles] = useState<Array<File>>([])

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

  const handleDrop = async (uploadFiles: Array<File>) => {
    const file = uploadFiles[0]
    setFiles(uploadFiles)
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
      {imageUrl && (
        <div className="px-1">
          <img
            src={imageUrl}
            alt="group-cover"
            className="w-full max-h-40 object-cover rounded-md border"
          />
        </div>
      )}
      <div className="px-1">
        <Dropzone
          onDrop={handleDrop}
          src={files}
          accept={{ 'image/*': [] }}
          maxFiles={1}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
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
