import { createFileRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import PendingPage from '@/components/pendingPage.tsx'

export const Route = createFileRoute('/(auth)/initial/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoaded, isSignedIn } = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSignedIn) {
      const initial = async () => {
        await axios.post('/api/initialUser')
        navigate({ to: '/' })
      }
      initial()
    }
  }, [isLoaded, isSignedIn])
  return <PendingPage />
}
