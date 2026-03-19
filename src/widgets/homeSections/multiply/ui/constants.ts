export const benefitCards = [
  {
    text: 'We take on outsourced projects across any niche — from iGaming and dating to e-commerce and recruitment',
    desktopMinHeight: 112,
  },
  {
    text: 'We deliver what has already proven effective — many times over',
    desktopMinHeight: 88,
  },
  {
    text: "We don't learn at the client's expense",
    desktopMinHeight: 64,
  },
]

export const desktopLayout = {
  label: { top: 20, right: 30 },
  left: { top: 87, left: 30, width: 511 },
  right: { top: 220, right: 30, width: 511 },
  snake: { size: 324, top: 32, left: -320 },
}

export const getDesktopStageScale = () => {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = (window.innerWidth - 60) / 1220
  const heightScale = (window.innerHeight - 120) / 560
  const targetScale = Math.min(widthScale, heightScale)

  return Math.min(1.32, Math.max(1, targetScale))
}
