import type { KeyboardEvent } from 'react'
import type { MultiplySectionContent } from '@entities/multiply'

export const getAudienceTabId = (key: MultiplySectionContent['key']) => `join-audience-tab-${key}`

const moveAudienceFocus = (items: MultiplySectionContent[], nextIndex: number) => {
  const nextButton = document.getElementById(getAudienceTabId(items[nextIndex]?.key))

  if (nextButton instanceof HTMLButtonElement) {
    nextButton.focus()
  }
}

export const handleAudienceTabKeyDown = ({
  event,
  index,
  items,
  setActiveAudience,
  setHoveredAudience,
}: {
  event: KeyboardEvent<HTMLButtonElement>
  index: number
  items: MultiplySectionContent[]
  setActiveAudience: (index: number) => void
  setHoveredAudience: (index: number | null) => void
}) => {
  if (items.length === 0) {
    return
  }

  let nextIndex: number | null = null

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      nextIndex = (index + 1) % items.length
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      nextIndex = (index - 1 + items.length) % items.length
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = items.length - 1
      break
    default:
      return
  }

  event.preventDefault()
  setActiveAudience(nextIndex)
  setHoveredAudience(nextIndex)
  moveAudienceFocus(items, nextIndex)
}
