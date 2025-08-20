import { useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import gsap from 'gsap'
import type { ReactNode } from 'react'

const AnimatedLink = ({
  groupId,
  children,
  url,
}: {
  groupId?: string
  children: ReactNode
  url: string
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const router = useRouter()
  const onClick = () => {
    const parsedUrl = router.buildLocation({
      to: url,
      params: {
        groupId,
      },
    })
    if (location.pathname === parsedUrl.pathname) {
      return
    }
    gsap.to('#gsapContainer', {
      opacity: 0,
      duration: 0.125,
      ease: 'power2.inOut',
    })

    setTimeout(() => {
      navigate({
        to: url,
        params: {
          groupId,
        },
      })
    }, 125)
  }
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  )
}

export default AnimatedLink
