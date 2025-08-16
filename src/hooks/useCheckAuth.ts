import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export function useCheckAuth() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      navigate({ to: '/signIn' })
    }
  }, [isLoaded, isSignedIn, navigate])
  return { isSignedIn, isLoaded }
}
