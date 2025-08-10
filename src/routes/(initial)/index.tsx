import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import axios from 'axios'

export const Route = createFileRoute('/(initial)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return

    if (!user) {
      navigate({ to: '/signIn' })
      return
    }

    axios.post('/api/initialUser').then(() => {
      navigate({ to: '/start' })
    })
  }, [isLoaded, user, navigate])

  if (!isLoaded) return <div>Loading...</div>

  return <div>Loading...</div>
}
