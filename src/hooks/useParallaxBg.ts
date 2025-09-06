import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export function useParallaxBg() {
  const scopeRef = useRef<HTMLInputElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (!bgImageRef.current) return
    gsap.to(bgImageRef.current, {
      y: '20%',
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: bgImageRef.current,
        scroller: '#scroll-container',
        scrub: true,
        start: 'top top',
        end: 'bottom top',
      },
    })
    gsap.to(bgImageRef.current, {
      x: () => 'random(10, 30)',
      y: () => 'random(10, 30)',
      repeatRefresh: true,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      duration: 4,
    })
  }, [{ scope: scopeRef }])

  return { scopeRef, bgImageRef }
}
