import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'
import { Observer } from 'gsap/all'
import { registerGsapPlugins } from '@shared/lib/gsap'

export type FullPageScrollDirection = 'down' | 'up'

export type FullPageSectionAnimationTimelineContext = {
  section: HTMLElement
  targets: HTMLElement[]
  direction: FullPageScrollDirection
  timeline: gsap.core.Timeline
  at: number
}

export type FullPageSectionAnimationStrategy = {
  enter?: (context: FullPageSectionAnimationTimelineContext) => void
  leave?: (context: FullPageSectionAnimationTimelineContext) => void
}

type UseFullPageEngineParams = {
  viewportRef: RefObject<HTMLElement | null>
  trackRef: RefObject<HTMLElement | null>
  sectionIds: string[]
  sectionAnimationStrategies?: Partial<Record<string, FullPageSectionAnimationStrategy>>
  duration?: number
  ease?: string
}

type UseFullPageEngineResult = {
  activeIndex: number
  isAnimating: boolean
  goTo: (index: number) => void
  next: () => void
  prev: () => void
}

const clampIndex = (index: number, maxIndex: number) => Math.max(0, Math.min(index, maxIndex))

const getViewportHeight = (viewport: HTMLElement) => {
  if (viewport.clientHeight > 0) {
    return viewport.clientHeight
  }

  return window.innerHeight
}

const getSectionElement = (track: HTMLElement, index: number) => {
  const section = track.children.item(index)
  return section instanceof HTMLElement ? section : null
}

const getAnimTargets = (section: HTMLElement | null) => {
  if (!section) {
    return [] as HTMLElement[]
  }

  return Array.from(section.querySelectorAll<HTMLElement>('[data-anim]'))
}

const getIndexFromHash = (sectionIds: string[], hashValue: string) => {
  const normalizedHash = hashValue.replace(/^#/, '')
  const targetIndex = sectionIds.indexOf(normalizedHash)
  return targetIndex >= 0 ? targetIndex : 0
}

const getInitialActiveIndex = (sectionIds: string[], maxIndex: number) => {
  if (typeof window === 'undefined') {
    return 0
  }

  return clampIndex(getIndexFromHash(sectionIds, window.location.hash), maxIndex)
}

export const useFullPageEngine = ({
  viewportRef,
  trackRef,
  sectionIds,
  sectionAnimationStrategies,
  duration = 0.8,
  ease = 'power3.inOut',
}: UseFullPageEngineParams): UseFullPageEngineResult => {
  const maxIndex = sectionIds.length - 1
  const GESTURE_MAX_LOCK_MS = 1200

  const [activeIndex, setActiveIndex] = useState(() => getInitialActiveIndex(sectionIds, maxIndex))
  const [isAnimating, setIsAnimating] = useState(false)

  const activeIndexRef = useRef(activeIndex)
  const isAnimatingRef = useRef(false)
  const pendingDirectionRef = useRef<1 | -1 | 0>(0)
  const gestureConsumedRef = useRef(false)
  const gestureUnlockTimeoutRef = useRef<number | null>(null)
  const tweenRef = useRef<gsap.core.Animation | null>(null)
  const goToRef = useRef<(targetIndex: number) => void>(() => {})

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || sectionIds.length === 0) {
      return
    }

    registerGsapPlugins()

    const clearGestureUnlockTimeout = () => {
      if (gestureUnlockTimeoutRef.current === null) {
        return
      }

      window.clearTimeout(gestureUnlockTimeoutRef.current)
      gestureUnlockTimeoutRef.current = null
    }

    const unlockGesture = () => {
      gestureConsumedRef.current = false
      clearGestureUnlockTimeout()
    }

    const scheduleGestureUnlock = () => {
      clearGestureUnlockTimeout()
      gestureUnlockTimeoutRef.current = window.setTimeout(() => {
        unlockGesture()
      }, GESTURE_MAX_LOCK_MS)
    }

    const updateHash = (index: number) => {
      const targetHash = `#${sectionIds[index]}`
      if (window.location.hash === targetHash) {
        return
      }

      window.history.replaceState(null, '', targetHash)
    }

    const initialIndex = clampIndex(getIndexFromHash(sectionIds, window.location.hash), maxIndex)
    activeIndexRef.current = initialIndex
    gsap.set(track, { y: -initialIndex * getViewportHeight(viewport) })
    updateHash(initialIndex)

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const getReducedMotion = () => mediaQuery.matches

    Array.from(track.children).forEach((_, index) => {
      const section = getSectionElement(track, index)
      const targets = getAnimTargets(section)
      if (targets.length === 0) {
        return
      }

      gsap.set(targets, { autoAlpha: index === initialIndex ? 1 : 0, y: 0 })
    })

    const requestStep = (direction: 1 | -1) => {
      const currentIndex = activeIndexRef.current
      const nextIndex = clampIndex(currentIndex + direction, maxIndex)
      if (nextIndex === currentIndex) {
        pendingDirectionRef.current = 0
        return
      }

      animateTo(nextIndex)
    }

    const consumePendingStep = () => {
      if (isAnimatingRef.current || pendingDirectionRef.current === 0) {
        return
      }

      const direction = pendingDirectionRef.current
      pendingDirectionRef.current = 0
      requestStep(direction)
    }

    const handleGestureStep = (direction: 1 | -1) => {
      if (gestureConsumedRef.current) {
        return
      }

      gestureConsumedRef.current = true
      scheduleGestureUnlock()

      if (isAnimatingRef.current) {
        pendingDirectionRef.current = direction
        return
      }

      requestStep(direction)
    }

    const animateTo = (rawIndex: number) => {
      const nextIndex = clampIndex(rawIndex, maxIndex)
      const currentIndex = activeIndexRef.current

      if (nextIndex === currentIndex || isAnimatingRef.current) {
        return
      }

      isAnimatingRef.current = true
      setIsAnimating(true)
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)

      const direction: FullPageScrollDirection = nextIndex > currentIndex ? 'down' : 'up'
      const leaveFallbackY = direction === 'down' ? -22 : 22
      const enterFallbackY = direction === 'down' ? 40 : -40
      const currentSection = getSectionElement(track, currentIndex)
      const nextSection = getSectionElement(track, nextIndex)
      const currentTargets = getAnimTargets(currentSection)
      const nextTargets = getAnimTargets(nextSection)
      const currentSectionStrategy = sectionAnimationStrategies?.[sectionIds[currentIndex]]
      const nextSectionStrategy = sectionAnimationStrategies?.[sectionIds[nextIndex]]
      const leaveOffsetY = leaveFallbackY
      const enterOffsetY = enterFallbackY
      const leaveDuration = 0.22
      const enterDuration = 0.42
      const leaveEase = 'power2.out'
      const enterEase = 'power2.out'
      const leaveStaggerEach = 0.03
      const enterStaggerEach = 0.05
      const nextY = -nextIndex * getViewportHeight(viewport)

      tweenRef.current?.kill()

      if (getReducedMotion()) {
        gsap.set(track, { y: nextY })
        if (currentTargets.length > 0) {
          gsap.set(currentTargets, { autoAlpha: 0, y: 0 })
        }
        if (nextTargets.length > 0) {
          gsap.set(nextTargets, { autoAlpha: 1, y: 0 })
        }

        isAnimatingRef.current = false
        setIsAnimating(false)
        updateHash(nextIndex)
        consumePendingStep()
        return
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false
          setIsAnimating(false)
          updateHash(nextIndex)
          consumePendingStep()
        },
        onInterrupt: () => {
          isAnimatingRef.current = false
          setIsAnimating(false)
        },
      })

      if (currentSection && currentSectionStrategy?.leave) {
        currentSectionStrategy.leave({
          section: currentSection,
          targets: currentTargets,
          direction,
          timeline,
          at: 0,
        })
      } else if (currentTargets.length > 0) {
        timeline.to(
          currentTargets,
          {
            autoAlpha: 0,
            y: leaveOffsetY,
            duration: leaveDuration,
            ease: leaveEase,
            stagger: {
              each: leaveStaggerEach,
              from: direction === 'down' ? 'start' : 'end',
            },
          },
          0,
        )
      }

      timeline.to(
        track,
        {
          y: nextY,
          duration,
          ease,
        },
        0,
      )

      const enterAt = Math.min(duration * 0.5, Math.max(duration - 0.18, 0))

      if (nextSection && nextSectionStrategy?.enter) {
        nextSectionStrategy.enter({
          section: nextSection,
          targets: nextTargets,
          direction,
          timeline,
          at: enterAt,
        })
      } else if (nextTargets.length > 0) {
        gsap.set(nextTargets, { autoAlpha: 0, y: enterOffsetY })
        timeline.to(
          nextTargets,
          {
            autoAlpha: 1,
            y: 0,
            duration: enterDuration,
            ease: enterEase,
            stagger: {
              each: enterStaggerEach,
              from: direction === 'down' ? 'start' : 'end',
            },
          },
          enterAt,
        )
      }

      tweenRef.current = timeline
    }

    goToRef.current = animateTo

    const observer = Observer.create({
      target: viewport,
      type: 'wheel,touch',
      tolerance: 12,
      wheelSpeed: 1,
      preventDefault: true,
      onStopDelay: 0.12,
      onStop: () => {
        unlockGesture()
      },
      onDown: () => {
        handleGestureStep(1)
      },
      onUp: () => {
        handleGestureStep(-1)
      },
    })

    const handleHashChange = () => {
      const hashIndex = clampIndex(getIndexFromHash(sectionIds, window.location.hash), maxIndex)
      animateTo(hashIndex)
    }

    const handleResize = () => {
      tweenRef.current?.kill()
      gsap.set(track, { y: -activeIndexRef.current * getViewportHeight(viewport) })
      isAnimatingRef.current = false
      pendingDirectionRef.current = 0
      unlockGesture()
      setIsAnimating(false)
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('resize', handleResize)

    return () => {
      observer.kill()
      tweenRef.current?.kill()
      tweenRef.current = null
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('resize', handleResize)

      isAnimatingRef.current = false
      pendingDirectionRef.current = 0
      unlockGesture()
      setIsAnimating(false)
    }
  }, [
    GESTURE_MAX_LOCK_MS,
    duration,
    ease,
    maxIndex,
    sectionAnimationStrategies,
    sectionIds,
    trackRef,
    viewportRef,
  ])

  const goTo = useCallback((targetIndex: number) => {
    goToRef.current(targetIndex)
  }, [])

  const next = useCallback(() => {
    goToRef.current(activeIndexRef.current + 1)
  }, [])

  const prev = useCallback(() => {
    goToRef.current(activeIndexRef.current - 1)
  }, [])

  return { activeIndex, isAnimating, goTo, next, prev }
}
