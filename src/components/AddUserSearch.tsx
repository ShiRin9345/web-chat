import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { toast } from 'sonner'
import { ArrowRight, Loader } from 'lucide-react'
import type { User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'

interface Props {
  currentUserId?: string
  onResults: (users: Array<User>) => void
  isSearching: boolean
  setIsSearching: (v: boolean) => void
}

const addUserFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export default function AddUserSearch({
  currentUserId,
  onResults,
  isSearching,
  setIsSearching,
}: Props) {
  const form = useForm({
    defaultValues: { name: '' },
    validators: { onChange: addUserFormSchema },
    onSubmit: async ({ value }) => {
      if (!value.name.trim()) return
      setIsSearching(true)
      try {
        const response = await axios.get<Array<User>>('/api/users', {
          params: { name: value.name },
        })
        const filteredResults = response.data.filter(
          (user) => user.userId !== currentUserId,
        )
        onResults(filteredResults)
      } catch (error) {
        toast.error('Failed to search users')
      } finally {
        setIsSearching(false)
      }
    },
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await form.handleSubmit()
      }}
      className="space-y-2"
    >
      <form.Field
        name="name"
        children={(field) => (
          <div className="flex gap-2">
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Search by name or code..."
              className="flex-1"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isSearching}
              className="px-3"
            >
              {isSearching ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      />
    </form>
  )
}
