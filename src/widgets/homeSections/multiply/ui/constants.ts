export const fallbackMultiplyContent = {
  title: 'Results can only be guaranteed when you control every step',
  description:
    "That's why we built a full-time in-house team and custom infrastructure - tailored for every task, tested daily in the sweepstakes vertical",
  benefits: [
    'We run outsourced traffic projects across any niche — from iGaming and dating to e-commerce and recruitment',
    "We don't learn at the client's expense",
    'We use what works — proven again and again',
  ],
}

export const benefitCardDesktopHeights = [112, 88, 64]

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
