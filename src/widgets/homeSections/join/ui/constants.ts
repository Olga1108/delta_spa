export const audienceButtons = [
  { label: 'For Media Buyers', width: 484 },
  { label: 'For Businesses', width: 451 },
  { label: 'For Partners', width: 406 },
]

export const getDesktopStageScale = () => {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = (window.innerWidth - 60) / 1220
  const heightScale = (window.innerHeight - 40) / 660
  const targetScale = Math.min(widthScale, heightScale)

  return Math.min(1.08, targetScale)
}

export const getDesktopContentTop = () => {
  if (typeof window === 'undefined') {
    return 87
  }

  const extraHeight = Math.max(0, window.innerHeight - 700)
  return 87 + Math.min(56, extraHeight * 0.28)
}
