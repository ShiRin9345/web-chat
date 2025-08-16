import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import type { Group } from 'generated/index'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

const groupSchema = z.object({
  name: z.string().min(1),
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onBlur: groupSchema,
      onSubmit: groupSchema,
    },
    onSubmit: async ({ value }) => {
      await axios.post<Group>('/api/group', {
        name: value.name,
      })
    },
  })
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <Dialog>
        <DialogTrigger>open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Group name</DialogTitle>
          </DialogHeader>
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
                      onBlur={field.handleBlur}
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
