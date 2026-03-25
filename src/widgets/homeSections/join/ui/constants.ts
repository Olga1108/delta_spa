export const fallbackJoinContent = [
  {
    key: 'media_buyers',
    buttonWidth: 484,
    step1:
      'Got experience with sweepstakes and large ad budgets? Looking for a team where you can grow and scale without limits?',
    step2:
      'Multiply your profits with MULTICPA — we provide the budget, all the tools and high profit shares',
  },
  {
    key: 'businesses',
    buttonWidth: 451,
    step1:
      'Need real customers — not theories on how to get them? Have a budget, but no traffic team, creatives, or strategy?',
    step2:
      "Contact us — we'll build everything from the ground up, drive traffic, and deliver leads in any niche",
  },
  {
    key: 'partners',
    buttonWidth: 406,
    step1:
      'Experienced solo buyer or running a whole team? Need a reliable partner program with fast onboarding in sweepstakes and full support?',
    step2:
      'Work with us — you run the traffic, we handle everything else. From infrastructure and tech support to funnels, creatives, and expert guidance',
  },
] as const

export const getDesktopStageScale = (viewportWidth: number, viewportHeight: number) => {
  const widthScale = (viewportWidth - 60) / 1220
  const heightScale = (viewportHeight - 40) / 660
  const targetScale = Math.min(widthScale, heightScale)

  return Math.min(1.08, targetScale)
}

export const getDesktopContentTop = (viewportHeight: number) => {
  const extraHeight = Math.max(0, viewportHeight - 700)
  return 87 + Math.min(56, extraHeight * 0.28)
}
