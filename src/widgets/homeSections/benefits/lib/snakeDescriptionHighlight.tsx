import type { ReactNode } from 'react'
import type { UiLocale } from '@shared/config/locales'

/** EN: highlight "in-house team". UA: highlight only "in-house" (word kept in Latin in copy). */
export const renderWordsWithHighlight = (
  description: string,
  locale: UiLocale,
): ReactNode => {
  const yellowClass = 'text-[var(--color-yellow)]'
  if (locale === 'en') {
    const parts = description.split(/(in-house team)/gi)
    return parts.map((part, index) =>
      /^in-house team$/i.test(part) ? (
        <span key={index} className={yellowClass}>
          {part}
        </span>
      ) : (
        part
      ),
    )
  }
  const parts = description.split(/(in-house)/gi)
  return parts.map((part, index) =>
    /^in-house$/i.test(part) ? (
      <span key={index} className={yellowClass}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}
