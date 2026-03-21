import { useEffect, useState } from 'react'
import { useBenefitsQuery } from '@entities/benefit'
import { useDictionary } from '@shared/lib/dictionary'
import { Container } from '@shared/ui/Container'
import { MultiplyDesktopLayout } from './components/MultiplyDesktopLayout'
import { MultiplyMarquee } from './components/MultiplyMarquee'
import { MultiplyMobileLayout } from './components/MultiplyMobileLayout'
import { fallbackMultiplyContent, getDesktopStageScale } from './constants'

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
  const { locale } = useDictionary()
  const { data } = useBenefitsQuery(locale)
  const [desktopScale, setDesktopScale] = useState(1)
  const scalePx = (value: number) => `${Math.round(value * desktopScale)}px`
  const scaleFloatPx = (value: number) => `${(value * desktopScale).toFixed(3)}px`
  const content = data ?? fallbackMultiplyContent
  const titleParts = getTitleParts(content.title, locale)

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

      <MultiplyDesktopLayout
        scalePx={scalePx}
        scaleFloatPx={scaleFloatPx}
        titleBeforeHighlight={titleParts.before}
        titleHighlight={titleParts.highlight}
        titleAfterHighlight={titleParts.after}
        description={content.description}
        benefits={content.benefits}
      />
      <MultiplyMobileLayout
        titleBeforeHighlight={titleParts.before}
        titleHighlight={titleParts.highlight}
        titleAfterHighlight={titleParts.after}
        description={content.description}
        benefits={content.benefits}
      />
      <MultiplyMarquee scalePx={scalePx} scaleFloatPx={scaleFloatPx} />
    </Container>
  )
}
