import React from 'react'
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

interface Props {
  setOpen: (open: boolean) => void
}
const groupSchema = z.object({
  name: z.string().min(1),
})

const NewGroupForm: React.FC<Props> = ({ setOpen }) => {
  const queryClient = useQueryClient()

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
      })
      queryClient.invalidateQueries(sidebarListQueryOptions)
      setOpen(false)
    },
  })

  return (
    <div>
      {' '}
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
