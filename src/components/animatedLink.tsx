import { useLocation, useNavigate, useRouter } from '@tanstack/react-router'
import gsap from 'gsap'
import type { ReactNode } from 'react'

const AnimatedLink = ({
  groupId,
  children,
  friendUserId,
  roomId,
  url,
}: {
  groupId?: string
  children: ReactNode
  friendUserId?: string
  roomId?: string
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
        friendUserId,
        roomId,
      },
    })
    if (location.pathname === parsedUrl.pathname) {
      return
    }

    // 获取容器元素
    const gsapContainer = document.getElementById('gsapContainer')
    if (!gsapContainer) {
      // 如果容器不存在，直接跳转
      navigate({
        to: url,
        params: { groupId, friendUserId, roomId },
      })
      return
    }

    // 创建淡出动画
    const tl = gsap.timeline({
      onComplete: () => {
        // 动画完成后立即跳转
        navigate({
          to: url,
          params: { groupId, friendUserId, roomId },
        })
      },
    })

    tl.to(gsapContainer, {
      opacity: 0,
      duration: 0.15, // 减少动画时间，提升响应速度
      ease: 'power2.inOut',
    })
  }
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  )
}

export default AnimatedLink
