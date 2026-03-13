import { useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { Observer } from 'gsap/all'
import { registerGsapPlugins } from '@shared/lib/gsap'

type UseWheelObserverParams = {
  scopeRef: RefObject<HTMLElement | null>
  onNext: () => void
  onPrev: () => void
  isEnabled?: boolean
  lockDurationMs?: number
}

type UseWheelObserverResult = {
  isLocked: boolean
}

export const useWheelObserver = ({
  scopeRef,
  onNext,
  onPrev,
  isEnabled = true,
  lockDurationMs = 650,
}: UseWheelObserverParams): UseWheelObserverResult => {
  const lockRef = useRef(false)
  const [isLocked, setIsLocked] = useState(false)

  useLayoutEffect(() => {
    if (!isEnabled) {
      return
    }

    const scope = scopeRef.current
    if (!scope) {
      return
    }

    registerGsapPlugins()

    const runWithLock = (action: () => void) => {
      if (lockRef.current) {
        return
      }

      lockRef.current = true
      setIsLocked(true)
      action()
    }

    const observer = Observer.create({
      target: scope,
      type: 'wheel,touch',
      tolerance: 10,
      wheelSpeed: 1,
      preventDefault: true,
      onStopDelay: lockDurationMs / 1000,
      onStop: () => {
        lockRef.current = false
        setIsLocked(false)
      },
      onDown: () => runWithLock(onNext),
      onUp: () => runWithLock(onPrev),
    })

    return () => {
      observer.kill()
      lockRef.current = false
      setIsLocked(false)
    }
  }, [isEnabled, lockDurationMs, onNext, onPrev, scopeRef])

  return { isLocked }
}
