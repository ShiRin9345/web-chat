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
  const { data, isLoading } = useQuery(userProfileQueryOptions)
  const { user } = useUser()
  const scopeRef = useRef<HTMLInputElement>(null)
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
  if (isLoading) {
    return null
  }
  useGSAP(() => {
    gsap.to('#bgImage', {
      y: '20%',
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#bgImage',
        scroller: '#scroll-container',
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    })
    gsap.to('#bgImage', {
      x: () => 'random(10, 30)',
      y: () => 'random(10, 30)',
      repeatRefresh: true,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      duration: 4,
    })
  }, [{ scope: scopeRef }])
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
            id="bgImage"
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
            <div className="grid grid-cols-[100px_1fr] bg-white px-4 py-2 rounded-md gap-5">
              <div
                id="card"
                className="bg-white rounded-lg w-[25rem] justify-self-center h-[9rem]  col-span-2 border-1 flex relative -top-8 p-2"
              >
                <Avatar className="size-32">
                  <AvatarImage src={user?.imageUrl} alt="avatar" />
                  <AvatarFallback>avatar</AvatarFallback>
                </Avatar>
                <div className="right-2 top-16 absolute">
                  <WallpaperUpload />
                </div>
              </div>
              <form.Field
                name="position"
                children={(field) => (
                  <>
                    <span>Position</span>
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
                    <span>Sex</span>
                    <RadioGroup
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      className="flex-row flex mt-2"
                    >
                      <RadioGroupItem value="man" id="man" />
                      <Label htmlFor="man">男</Label>
                      <RadioGroupItem value="woman" id="woman" />
                      <Label htmlFor="man">女</Label>
                    </RadioGroup>
                  </>
                )}
              />
              <form.Field
                name="phone"
                children={(field) => (
                  <>
                    <span>Phone</span>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
              <form.Field
                name="email"
                children={(field) => (
                  <>
                    <span>Email</span>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
              <form.Field
                name="signature"
                children={(field) => (
                  <>
                    <span>Signature</span>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />

              <Button className="col-span-2" type="submit">
                Change
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
