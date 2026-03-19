import { useEffect, useState } from 'react'
import { Container } from '@shared/ui/Container'
import { MultiplyDesktopLayout } from './components/MultiplyDesktopLayout'
import { MultiplyMarquee } from './components/MultiplyMarquee'
import { MultiplyMobileLayout } from './components/MultiplyMobileLayout'
import { getDesktopStageScale } from './constants'

export const MultiplySection = () => {
  const [desktopScale, setDesktopScale] = useState(1)
  const scalePx = (value: number) => `${Math.round(value * desktopScale)}px`
  const scaleFloatPx = (value: number) => `${(value * desktopScale).toFixed(3)}px`

  useEffect(() => {
    const updateScale = () => {
      setDesktopScale(getDesktopStageScale())
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
        MULTI-BENEFITS
      </p>

      <MultiplyDesktopLayout scalePx={scalePx} scaleFloatPx={scaleFloatPx} />
      <MultiplyMobileLayout />
      <MultiplyMarquee scalePx={scalePx} scaleFloatPx={scaleFloatPx} />
    </Container>
  )
}
