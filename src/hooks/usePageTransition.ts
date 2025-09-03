import { useState, useCallback } from 'react'

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return {
    isTransitioning,
    startTransition,
    endTransition,
  }
}
