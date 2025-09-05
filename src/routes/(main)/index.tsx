import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import { Loader, Plus, X } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import type { OssInfo } from '@/components/ImageDialog.tsx'
import { userProfileQueryOptions } from '@/features/reactQuery/options.ts'
import { RegionSelector } from '@/routes/test.tsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import WallpaperUpload from '@/components/wallpaperUpload.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const Route = createFileRoute('/(main)/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(userProfileQueryOptions)
  },
})

const profileFormSchema = z.object({
  email: z.email(),
  position: z.string(),
  sex: z.enum(['man', 'woman']),
  phone: z.string(),
  signature: z.string(),
  tags: z
    .array(z.string().max(20, 'Tag length cannot exceed 20 characters'))
    .max(8, 'Maximum 8 tags allowed'),
})

gsap.registerPlugin(ScrollTrigger)

function RouteComponent() {
  const { data } = useQuery(userProfileQueryOptions)
  const scopeRef = useRef<HTMLInputElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)
  useGSAP(() => {
    if (!bgImageRef.current) return
    gsap.to(bgImageRef.current, {
      y: '20%',
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: bgImageRef.current,
        scroller: '#scroll-container',
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    })
    gsap.to(bgImageRef.current, {
      x: () => 'random(10, 30)',
      y: () => 'random(10, 30)',
      repeatRefresh: true,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      duration: 4,
    })
  }, [{ scope: scopeRef }])
  const form = useForm({
    defaultValues: {
      email: data?.email ?? '',
      position: data?.position ?? '',
      sex: data?.sex ?? 'man',
      signature: data?.signature ?? '',
      phone: data?.phone ?? '',
      tags: data?.tags ?? [],
    },
    validators: {
      onChange: profileFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await axios.patch('/api/profile', {
          data: {
            email: value.email,
            sex: value.sex,
            phone: value.phone,
            signature: value.signature,
            position: value.position,
            tags: value.tags,
          },
        })
        console.log('uplaod success')
      } catch (e) {
        console.error(e)
      }
    },
  })

  useEffect(() => {
    if (!data) return
    form.reset({
      email: data.email,
      position: data.position,
      sex: data.sex === 'man' || data.sex === 'woman' ? data.sex : 'man',
      signature: data.signature,
      phone: data.phone,
      tags: data.tags,
    })
  }, [data, form])
  return (
    <div
      className="overflow-y-auto overflow-x-hidden scrollbar-none h-dvh"
      id="scroll-container"
      ref={scopeRef}
    >
      <div className="w-full h-[calc(100vh+7.5rem)] flex relative items-center  justify-center ">
        {data?.bgImageUrl && (
          <img
            className="absolute w-full h-full -z-10 inset-0  pointer-events-none scale-110 object-cover"
            alt="bgImage"
            src={data.bgImageUrl}
            ref={bgImageRef}
          />
        )}
        <div className="flex flex-col ">
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              console.log('submit clicked')
              form.handleSubmit()
            }}
          >
            <div className="grid grid-cols-[100px_1fr] bg-white dark:bg-gray-800 orange:bg-orange-50 px-4 py-2 rounded-md gap-5 shadow-lg dark:shadow-gray-900/50 orange:shadow-orange-200/50">
              <div
                id="card"
                className="bg-white dark:bg-gray-700 orange:bg-orange-100 rounded-lg w-[25rem] justify-self-center h-[9rem]  col-span-2 border-1 border-gray-200 dark:border-gray-600 orange:border-orange-300 flex relative -top-8 p-2 shadow-md dark:shadow-gray-900/30 orange:shadow-orange-200/30"
              >
                <AvatarUpload />
                <div className="right-2 top-16 absolute">
                  <WallpaperUpload />
                </div>
              </div>
              <form.Field
                name="position"
                children={(field) => (
                  <>
                    <span className="text-gray-700 dark:text-gray-300 orange:text-orange-800 font-medium">
                      Position
                    </span>
                    <RegionSelector
                      initialRegion={data?.position as string}
                      handelChange={field.handleChange}
                    />
                  </>
                )}
              />
              <form.Field
                name="sex"
                children={(field) => (
                  <>
                    <span className="text-gray-700 dark:text-gray-300 orange:text-orange-800 font-medium">
                      Sex
                    </span>
                    <RadioGroup
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      className="flex-row flex mt-2"
                    >
                      <RadioGroupItem value="man" id="man" />
                      <Label
                        htmlFor="man"
                        className="text-gray-700 dark:text-gray-300 orange:text-orange-800"
                      >
                        男
                      </Label>
                      <RadioGroupItem value="woman" id="woman" />
                      <Label
                        htmlFor="woman"
                        className="text-gray-700 dark:text-gray-300 orange:text-orange-800"
                      >
                        女
                      </Label>
                    </RadioGroup>
                  </>
                )}
              />
              <form.Field
                name="phone"
                children={(field) => (
                  <>
                    <span className="text-gray-700 dark:text-gray-300 orange:text-orange-800 font-medium">
                      Phone
                    </span>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600"
                    />
                  </>
                )}
              />
              <form.Field
                name="email"
                children={(field) => (
                  <>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 orange:text-orange-800">
                      Email
                    </span>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600"
                    />
                  </>
                )}
              />
              <form.Field
                name="signature"
                children={(field) => (
                  <>
                    <span className="text-gray-700 dark:text-gray-300 orange:text-orange-800 font-medium">
                      Signature
                    </span>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600 resize-none"
                    />
                  </>
                )}
              />
              <form.Field
                name="tags"
                children={(field) => (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 dark:text-gray-300 orange:text-orange-800 font-medium">
                        Tags
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 orange:text-orange-600">
                        {field.state.value.length}/8
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 w-full max-w-[20rem]">
                        {(() => {
                          const savedTags = data?.tags ?? []
                          const currentTags = field.state.value
                          const combined = Array.from(
                            new Set([...savedTags, ...currentTags]),
                          )
                          return combined.map((tag) => {
                            const isSaved = savedTags.includes(tag)
                            const inCurrent = currentTags.includes(tag)
                            const baseClasses =
                              'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full'
                            const savedClasses =
                              'bg-blue-100 dark:bg-blue-900/30 orange:bg-orange-100 text-blue-800 dark:text-blue-300 orange:text-orange-800'
                            const addClasses =
                              'bg-emerald-100 dark:bg-emerald-900/30 orange:bg-green-100 text-emerald-800 dark:text-emerald-300 orange:text-green-800'
                            const removeClasses =
                              'bg-gray-200 dark:bg-gray-700 orange:bg-orange-200 text-gray-600 dark:text-gray-300 orange:text-orange-700 line-through opacity-60'

                            return (
                              <div
                                key={tag}
                                className={`${baseClasses} ${
                                  inCurrent && isSaved
                                    ? savedClasses
                                    : inCurrent && !isSaved
                                      ? addClasses
                                      : removeClasses
                                }`}
                              >
                                <span>{tag}</span>
                                {inCurrent ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newTags = currentTags.filter(
                                        (t) => t !== tag,
                                      )
                                      field.handleChange(newTags)
                                    }}
                                    className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 orange:hover:bg-orange-200 rounded-full p-0.5"
                                    aria-label="Remove tag"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (
                                        currentTags.length < 8 &&
                                        !currentTags.includes(tag)
                                      ) {
                                        field.handleChange([
                                          ...currentTags,
                                          tag,
                                        ])
                                      }
                                    }}
                                    className="ml-1 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 orange:hover:bg-green-200 rounded-full p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Add tag back"
                                    disabled={currentTags.length >= 8}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            )
                          })
                        })()}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag..."
                          maxLength={20}
                          disabled={field.state.value.length >= 8}
                          className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const input = e.target as HTMLInputElement
                              const newTag = input.value.trim()
                              if (
                                newTag &&
                                newTag.length <= 20 &&
                                field.state.value.length < 8 &&
                                !field.state.value.includes(newTag)
                              ) {
                                field.handleChange([
                                  ...field.state.value,
                                  newTag,
                                ])
                                input.value = ''
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={field.state.value.length >= 8}
                          onClick={() => {
                            const input = document.querySelector(
                              'input[placeholder="Add a tag..."]',
                            ) as HTMLInputElement
                            const newTag = input.value.trim()
                            if (
                              newTag &&
                              newTag.length <= 20 &&
                              field.state.value.length < 8 &&
                              !field.state.value.includes(newTag)
                            ) {
                              field.handleChange([...field.state.value, newTag])
                              input.value = ''
                            }
                          }}
                          className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 hover:bg-gray-50 dark:hover:bg-gray-600 orange:hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              />

              <Button
                className="col-span-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 orange:bg-orange-600 orange:hover:bg-orange-700 text-white"
                type="submit"
              >
                Change
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function AvatarUpload() {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<Array<File>>([])
  const { user } = useUser()
  const handleDrop = async (uploadFiles: Array<File>) => {
    const file = uploadFiles[0]
    setFiles(uploadFiles)
    const formdata = new FormData()

    const options = {
      maxSizeMB: 1, // 最大文件大小1MB
      maxWidthOrHeight: 1920, // 最大宽度或高度1920px
      useWebWorker: true, // 使用Web Worker提升性能
      fileType: 'image/webp', // 输出WebP格式
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
    setOpen(false)
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen: boolean) => {
        setOpen(newOpen)
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
