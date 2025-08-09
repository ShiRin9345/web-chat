import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

export const Route = createFileRoute('/(initial)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useUser()
  const navigate = useNavigate()
  if (!user) {
    navigate({ to: '/signIn' })
  }
  axios.post('initialUser')
  navigate({ to: '/main' })
  return <div>Hello "/(initial)/"!</div>
}
