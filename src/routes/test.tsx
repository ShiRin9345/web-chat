import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

const groupSchema = z.object({
  name: z.string().min(1),
})

function RouteComponent() {
  const form = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    const { name } = values
    await axios.post('/api/group', {
      name,
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>name:</FormLabel>
                <FormControl>
                  <Input placeholder="New name..." {...field} />
                </FormControl>
                <FormDescription>This is your new group name</FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
          name="name"
          control={form.control}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
