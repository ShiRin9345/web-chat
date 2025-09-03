import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { userProfileQueryOptions } from '@/features/reactQuery/options.ts'
import { RegionSelector } from '@/routes/test.tsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import WallpaperUpload from '@/components/wallpaperUpload.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { FontSelector } from '@/components/fontSelector'

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
})

gsap.registerPlugin(ScrollTrigger)

function RouteComponent() {
  const { data } = useQuery(userProfileQueryOptions)
  const { user } = useUser()
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
      email: data?.email,
      position: data?.position,
      sex: data?.sex ?? 'man',
      signature: data?.signature,
      phone: data?.phone,
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
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
  })
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
            onSubmit={async (e) => {
              e.preventDefault()
              await form.handleSubmit()
              console.log(form.state.values)
            }}
          >
            <div className="grid grid-cols-[100px_1fr] bg-white dark:bg-gray-800 orange:bg-orange-50 px-4 py-2 rounded-md gap-5 shadow-lg dark:shadow-gray-900/50 orange:shadow-orange-200/50">
              <div
                id="card"
                className="bg-white dark:bg-gray-700 orange:bg-orange-100 rounded-lg w-[25rem] justify-self-center h-[9rem]  col-span-2 border-1 border-gray-200 dark:border-gray-600 orange:border-orange-300 flex relative -top-8 p-2 shadow-md dark:shadow-gray-900/30 orange:shadow-orange-200/30"
              >
                <Avatar className="size-32">
                  <AvatarImage src={user?.imageUrl} alt="avatar" />
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
                    avatar
                  </AvatarFallback>
                </Avatar>
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
