import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { registerGsapPlugins } from '@shared/lib/gsap'

type UseGsapBasicsTimelineParams = {
  scopeRef: RefObject<HTMLElement | null>
}

type UseGsapBasicsTimelineResult = {
  replay: () => void
}

export const useGsapBasicsTimeline = ({
  scopeRef,
}: UseGsapBasicsTimelineParams): UseGsapBasicsTimelineResult => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (!scope) {
      return
    }

    registerGsapPlugins()

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 0.55,
        },
      })

      timeline
        .from('[data-gsap="badge"]', {
          y: -10,
          opacity: 0,
          duration: 0.4,
        })
        .from('[data-gsap="title"]', {
          y: 36,
          opacity: 0,
        })
        .from(
          '[data-gsap="subtitle"]',
          {
            y: 24,
            opacity: 0,
            duration: 0.45,
          },
          '-=0.3',
        )
        .from(
          '[data-gsap="card"]',
          {
            y: 28,
            opacity: 0,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .fromTo(
          '[data-gsap="dot"]',
          { scale: 0.2, opacity: 0, rotate: -90 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
        )
        .to(
          '[data-gsap="action"]',
          {
            y: -3,
            duration: 0.16,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          },
          '-=0.05',
        )
        .to('[data-gsap="title"]', { x: 20, duration: 0.25, yoyo: true, repeat: 1 })

      timelineRef.current = timeline
    }, scope)

    return () => {
      timelineRef.current?.kill()
      timelineRef.current = null
      context.revert()
    }
  }, [scopeRef])

  const replay = () => {
    timelineRef.current?.restart()
  }

  return { replay }
}
