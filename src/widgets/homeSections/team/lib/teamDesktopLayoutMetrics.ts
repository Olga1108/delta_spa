export type TeamDesktopLayoutMetrics = {
  sideOffsetPx: number
  bottomOffsetPx: number
  headingToGridGapPx: number
}

const clampRound = (value: number, min: number, max: number) =>
  Math.round(Math.max(min, Math.min(max, value)))

export const isTeamTabletWidth = (width: number) => width >= 768 && width <= 870

type TeamDesktopWidthBand = 'tablet' | 'desktop-compact' | 'desktop-medium' | 'desktop-wide'

type TeamDesktopBandMetrics = {
  bottom: { base: number; min: number; max: number; deficitFactor: number; extraFactor: number }
  headingGap: { base: number; min: number; max: number; deficitFactor: number; extraFactor: number }
}

const TEAM_DESKTOP_BAND_METRICS: Record<TeamDesktopWidthBand, TeamDesktopBandMetrics> = {
  tablet: {
    bottom: { base: 86, min: 86, max: 140, deficitFactor: 0, extraFactor: 0.25 },
    headingGap: { base: 70, min: 70, max: 70, deficitFactor: 0, extraFactor: 0 },
  },
  'desktop-compact': {
    bottom: { base: 86, min: 24, max: 160, deficitFactor: 0.35, extraFactor: 0.25 },
    headingGap: { base: 56, min: 30, max: 90, deficitFactor: 0.2, extraFactor: 0.08 },
  },
  'desktop-medium': {
    bottom: { base: 114, min: 96, max: 200, deficitFactor: 0.2, extraFactor: 0.3 },
    headingGap: { base: 60, min: 42, max: 96, deficitFactor: 0.08, extraFactor: 0.1 },
  },
  'desktop-wide': {
    bottom: { base: 96, min: 20, max: 210, deficitFactor: 0.5, extraFactor: 0.35 },
    headingGap: { base: 56, min: 28, max: 110, deficitFactor: 0.24, extraFactor: 0.08 },
  },
}

const getTeamDesktopWidthBand = (width: number): TeamDesktopWidthBand => {
  if (isTeamTabletWidth(width)) {
    return 'tablet'
  }
  if (width <= 1166) {
    return 'desktop-compact'
  }
  if (width <= 1385) {
    return 'desktop-medium'
  }
  return 'desktop-wide'
}

const resolveAdaptiveMetric = (
  metric: TeamDesktopBandMetrics['bottom'] | TeamDesktopBandMetrics['headingGap'],
  heightDeficit: number,
  heightExtra: number,
) =>
  clampRound(
    metric.base - heightDeficit * metric.deficitFactor + heightExtra * metric.extraFactor,
    metric.min,
    metric.max,
  )

export const getTeamDesktopLayoutMetrics = (
  width: number,
  height: number,
): TeamDesktopLayoutMetrics => {
  const widthBand = getTeamDesktopWidthBand(width)
  const bandMetrics = TEAM_DESKTOP_BAND_METRICS[widthBand]

  const widthExtra = Math.max(0, width - 1600)
  const widthDeficit = Math.max(0, 1000 - width)
  const sideOffsetPx = clampRound(30 + widthExtra * 0.18 - widthDeficit * 0.02, 24, 260)

  const heightExtra = Math.max(0, height - 900)
  const heightDeficit = Math.max(0, 820 - height)

  const bottomOffsetPx = resolveAdaptiveMetric(bandMetrics.bottom, heightDeficit, heightExtra)
  const headingToGridGapPx = resolveAdaptiveMetric(
    bandMetrics.headingGap,
    heightDeficit,
    heightExtra,
  )

  return { sideOffsetPx, bottomOffsetPx, headingToGridGapPx }
}
