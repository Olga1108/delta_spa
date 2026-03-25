import { useMemo } from 'react'
import { useBenefitsQuery } from '@entities/benefit'
import { useDictionary } from '@shared/lib/dictionary'
import { useViewport } from '@shared/lib/device'
import { getTextHighlightParts } from '@shared/lib/highlightText'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { Container } from '@shared/ui/Container'
import { MultiplyDesktopLayout } from './components/MultiplyDesktopLayout'
import { MultiplyMarquee } from './components/MultiplyMarquee'
import { MultiplyMobileLayout } from './components/MultiplyMobileLayout'
import { getDesktopStageScale } from './constants'

const highlightedWordByLocale = {
  en: 'guaranteed',
  ua: 'гарантувати',
} as const

export const MultiplySection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useBenefitsQuery(locale)
  const { width, height } = useViewport()
  const desktopScale = useMemo(() => getDesktopStageScale(width, height), [width, height])
  const scalePx = (value: number) => `${Math.round(value * desktopScale)}px`
  const scaleFloatPx = (value: number) => `${(value * desktopScale).toFixed(3)}px`
  const titleParts = data ? getTextHighlightParts(data.title, highlightedWordByLocale[locale]) : null

  return (
    <Container
      fullWidth
      className='relative h-full w-full self-start pt-3 pb-8 md:self-stretch md:py-0'
    >
      {isError ? (
        <SectionErrorState
          title={translate('section.error.title')}
          description={translate('section.error.description')}
          actionLabel={translate('section.error.retry')}
          onAction={() => void refetch()}
        />
      ) : isLoading || !data || !titleParts ? (
        <SectionLoadingState />
      ) : (
        <>
          <MultiplyDesktopLayout
            scalePx={scalePx}
            scaleFloatPx={scaleFloatPx}
            titleBeforeHighlight={titleParts.before}
            titleHighlight={titleParts.highlight}
            titleAfterHighlight={titleParts.after}
            description={data.description}
            benefits={data.benefits}
          />
          <MultiplyMobileLayout
            titleBeforeHighlight={titleParts.before}
            titleHighlight={titleParts.highlight}
            titleAfterHighlight={titleParts.after}
            description={data.description}
            benefits={data.benefits}
          />
          <MultiplyMarquee scalePx={scalePx} scaleFloatPx={scaleFloatPx} />
        </>
      )}
    </Container>
  )
}
