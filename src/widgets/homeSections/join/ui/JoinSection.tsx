import { useEffect, useState } from 'react'
import type { MultiplySectionContent } from '@entities/multiply'
import { mapMultiplyData, useMultiplyQuery } from '@entities/multiply'
import { useDictionary } from '@shared/lib/dictionary'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { Container } from '@shared/ui/Container'
import { JoinDesktopLayout } from './components/JoinDesktopLayout'
import { JoinMobileLayout } from './components/JoinMobileLayout'
import { getDesktopContentTop, getDesktopStageScale } from './constants'

export const JoinSection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useMultiplyQuery(locale)
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
  const items: MultiplySectionContent[] = data ? mapMultiplyData(data) : []
  const getAudienceLabel = (key: (typeof items)[number]['key']) => translate(`join.audience.${key}`)
  const getCtaLabel = (key: (typeof items)[number]['key']) => translate(`join.cta.${key}`)

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

  useEffect(() => {
    if (activeAudience >= items.length) {
      setActiveAudience(0)
    }
  }, [activeAudience, items.length])

  return (
    <Container fullWidth className="relative h-full w-full self-start pt-3 pb-8 md:self-stretch md:py-0">
      {isError ? (
        <SectionErrorState
          title={translate('section.error.title')}
          description={translate('section.error.description')}
          actionLabel={translate('section.error.retry')}
          onAction={() => void refetch()}
        />
      ) : isLoading || items.length === 0 ? (
        <SectionLoadingState />
      ) : (
        <>
      <JoinDesktopLayout
        items={items}
        getAudienceLabel={getAudienceLabel}
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
        getCtaLabel={getCtaLabel}
      />

      <JoinMobileLayout
        items={items}
        activeAudience={activeAudience}
        setActiveAudience={setActiveAudience}
        getAudienceLabel={getAudienceLabel}
        getCtaLabel={getCtaLabel}
      />
        </>
      )}
    </Container>
  )
}
