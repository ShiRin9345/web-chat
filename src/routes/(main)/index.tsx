import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import axios from 'axios'
import { userProfileQueryOptions } from '@/features/reactQuery/options.ts'
import { RegionSelector } from '@/routes/test.tsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'

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

function RouteComponent() {
  const { data, isLoading } = useQuery(userProfileQueryOptions)
  const { user } = useUser()
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
  if (isLoading && !data) {
    return null
  }
  return (
    <div className="w-full h-dvh flex relative items-center flex-col justify-center">
      <input type="file" />
      <div className="flex flex-col">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await form.handleSubmit()
            console.log(form.state.values)
          }}
        >
          <div className="grid grid-cols-[150px_1fr] gap-5">
            <span>Avatar</span>
            <img
              src={user?.imageUrl}
              alt="avatar"
              className="size-32 rounded-full aspect-square"
            />
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
  )
}
