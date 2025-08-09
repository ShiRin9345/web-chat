import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

export const Route = createFileRoute('/(initial)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoaded) return
    async function initial() {
      if (!user) {
        navigate({ to: '/signIn' })
      }
      await axios.post('/api/initialUser')
      navigate({ to: '/start' })
    }
    initial()
  }, [navigate, user])
  return <div>Hello "/(initial)/"!</div>
}
