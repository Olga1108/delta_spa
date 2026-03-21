import { useEffect, useState } from 'react'
import { useBenefitsQuery } from '@entities/benefit'
import { useDictionary } from '@shared/lib/dictionary'
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

const getTitleParts = (title: string, locale: keyof typeof highlightedWordByLocale) => {
  const highlight = highlightedWordByLocale[locale]
  const normalizedTitle = title.toLowerCase()
  const normalizedHighlight = highlight.toLowerCase()
  const highlightIndex = normalizedTitle.indexOf(normalizedHighlight)

  if (highlightIndex < 0) {
    return {
      before: title,
      highlight: '',
      after: '',
    }
  }

  return {
    before: title.slice(0, highlightIndex),
    highlight: title.slice(highlightIndex, highlightIndex + highlight.length),
    after: title.slice(highlightIndex + highlight.length),
  }
}

export const MultiplySection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useBenefitsQuery(locale)
  const [desktopScale, setDesktopScale] = useState(1)
  const scalePx = (value: number) => `${Math.round(value * desktopScale)}px`
  const scaleFloatPx = (value: number) => `${(value * desktopScale).toFixed(3)}px`
  const titleParts = data ? getTitleParts(data.title, locale) : null

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
    <Container fullWidth className="relative h-full w-full self-start pt-3 pb-8 md:self-stretch md:py-0">
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
