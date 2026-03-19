import { useEffect, useState } from 'react'
import { Container } from '@shared/ui/Container'
import { JoinDesktopLayout } from './components/JoinDesktopLayout'
import { JoinMobileLayout } from './components/JoinMobileLayout'
import { getDesktopContentTop, getDesktopStageScale } from './constants'

export const JoinSection = () => {
  const [desktopScale, setDesktopScale] = useState(1)
  const [desktopContentTop, setDesktopContentTop] = useState(87)
  const [activeAudience, setActiveAudience] = useState(0)
  const [hoveredAudience, setHoveredAudience] = useState<number | null>(null)
  const scalePx = (value: number) => `${Math.round(value * desktopScale)}px`
  const scaleFloatPx = (value: number) => `${(value * desktopScale).toFixed(3)}px`
  const leftBlockScale = Math.min(desktopScale, 1)
  const scaleLeftPx = (value: number) => `${Math.round(value * leftBlockScale)}px`
  const rightTextSize = Math.max(16, 20 * desktopScale)
  const rightArrowSize = Math.max(28, 30 * desktopScale)

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(getDesktopStageScale())
      setDesktopContentTop(getDesktopContentTop())
    }

    updateScale()
    window.addEventListener('resize', updateScale)

    return () => {
      window.removeEventListener('resize', updateScale)
    }
  }, [])

  return (
    <Container fullWidth className="relative h-full w-full py-8 md:self-stretch md:py-0">
      <p className="mb-4 text-center font-heading text-xl font-[500] leading-none tracking-tight text-[var(--color-yellow)] uppercase md:hidden">
        MULTIPLY WITH US
      </p>

      <JoinDesktopLayout
        desktopScale={desktopScale}
        desktopContentTop={desktopContentTop}
        activeAudience={activeAudience}
        hoveredAudience={hoveredAudience}
        setActiveAudience={setActiveAudience}
        setHoveredAudience={setHoveredAudience}
        scalePx={scalePx}
        scaleFloatPx={scaleFloatPx}
        leftBlockScale={leftBlockScale}
        scaleLeftPx={scaleLeftPx}
        rightTextSize={rightTextSize}
        rightArrowSize={rightArrowSize}
      />

      <JoinMobileLayout />
    </Container>
  )
}
