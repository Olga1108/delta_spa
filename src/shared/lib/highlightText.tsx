import type { ReactNode } from 'react'

export type TextHighlightParts = {
  before: string
  highlight: string
  after: string
}

/** First case-insensitive occurrence only; preserves original casing in segments. */
export const getTextHighlightParts = (text: string, phrase: string): TextHighlightParts => {
  if (!phrase) {
    return { before: text, highlight: '', after: '' }
  }
  const lowerText = text.toLowerCase()
  const lowerPhrase = phrase.toLowerCase()
  const highlightIndex = lowerText.indexOf(lowerPhrase)
  if (highlightIndex < 0) {
    return { before: text, highlight: '', after: '' }
  }
  return {
    before: text.slice(0, highlightIndex),
    highlight: text.slice(highlightIndex, highlightIndex + phrase.length),
    after: text.slice(highlightIndex + phrase.length),
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Wraps every case-insensitive occurrence of `phrase` in a span with `className`. */
export const renderPhraseHighlightsInText = (
  text: string,
  phrase: string,
  className: string,
): ReactNode => {
  if (!phrase) {
    return text
  }
  const pattern = new RegExp(`(${escapeRegExp(phrase)})`, 'gi')
  const parts = text.split(pattern)
  const lowerPhrase = phrase.toLowerCase()
  return parts.map((part, index) =>
    part.toLowerCase() === lowerPhrase ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}
