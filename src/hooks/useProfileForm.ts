import { useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import axios from 'axios'

const profileFormSchema = z.object({
  email: z.string().email(),
  position: z.string(),
  sex: z.enum(['man', 'woman']),
  phone: z.string(),
  signature: z.string(),
  tags: z.array(z.string().max(20)).max(8),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

type LooseInitial = Partial<{
  email: string
  position: string
  sex: string
  phone: string
  signature: string
  tags: Array<string>
}>

export function useProfileForm(initial?: LooseInitial) {
  const form = useForm({
    defaultValues: {
      email: initial?.email ?? '',
      position: initial?.position ?? '',
      sex:
        initial?.sex === 'man' || initial?.sex === 'woman'
          ? initial.sex
          : 'man',
      signature: initial?.signature ?? '',
      phone: initial?.phone ?? '',
      tags: initial?.tags ?? [],
    },
    validators: { onChange: profileFormSchema },
    onSubmit: async ({ value }) => {
      await axios.patch('/api/profile', { data: value })
    },
  })

  useEffect(() => {
    if (!initial) return
    const safeTags = Array.isArray((initial as any).tags)
      ? (initial as any).tags
      : []
    form.reset({
      email: initial.email ?? '',
      position: initial.position ?? '',
      sex:
        initial.sex === 'man' || initial.sex === 'woman' ? initial.sex : 'man',
      signature: initial.signature ?? '',
      phone: initial.phone ?? '',
      tags: safeTags,
    })
  }, [initial, form])

  return form
}
