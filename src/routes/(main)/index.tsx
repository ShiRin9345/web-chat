import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { userProfileQueryOptions } from '@/features/reactQuery/options.ts'
import { RegionSelector } from '@/routes/test.tsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import WallpaperUpload from '@/components/wallpaperUpload.tsx'
import AvatarUpload from '@/components/AvatarUpload.tsx'
import TagsField from '@/components/TagsField.tsx'
import { useParallaxBg } from '@/hooks/useParallaxBg.ts'
import { useProfileForm } from '@/hooks/useProfileForm.ts'

export const Route = createFileRoute('/(main)/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(userProfileQueryOptions)
  },
})

function RouteComponent() {
  const { data } = useQuery(userProfileQueryOptions)
  const { scopeRef, bgImageRef } = useParallaxBg()
  const form = useProfileForm(data)
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
            onSubmit={async (e) => {
              e.preventDefault()
              await form.handleSubmit()
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
                      onValueChange={(val) =>
                        field.handleChange(val as 'man' | 'woman')
                      }
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
                    <TagsField
                      savedTags={data?.tags ?? []}
                      currentTags={field.state.value}
                      onChange={field.handleChange}
                    />
                  </>
                )}
              />

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    className="col-span-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 orange:bg-orange-600 orange:hover:bg-orange-700 text-white"
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      'Change'
                    )}
                  </Button>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
