import type { UiLocale } from '@shared/config/locales'
import { renderPhraseHighlightsInText } from '@shared/lib/highlightText'

const highlightPhraseByLocale = {
  /** Full phrase in EN copy */
  en: 'in-house team',
  /** UA copy keeps "in-house" in Latin */
  ua: 'in-house',
} as const satisfies Record<UiLocale, string>

const yellowClass = 'text-[var(--color-yellow)]'

export const renderWordsWithHighlight = (description: string, locale: UiLocale) =>
  renderPhraseHighlightsInText(description, highlightPhraseByLocale[locale], yellowClass)
