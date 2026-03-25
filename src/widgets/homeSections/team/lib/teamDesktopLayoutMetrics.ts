export type TeamDesktopLayoutMetrics = {
  sideOffsetPx: number
  bottomOffsetPx: number
  headingToGridGapPx: number
}

const clampRound = (value: number, min: number, max: number) =>
  Math.round(Math.max(min, Math.min(max, value)))

export const isTeamTabletWidth = (width: number) => width >= 768 && width <= 870

/** Desktop-only: offsets and heading gap for absolute Team grid (not tablet). */
export const getTeamDesktopLayoutMetrics = (
  width: number,
  height: number,
): TeamDesktopLayoutMetrics => {
  const isTabletWidth = isTeamTabletWidth(width)
  const isMidDesktopWidth = width > 870 && width <= 1166
  const isWideMidDesktopWidth = width > 1166 && width <= 1385

  const widthExtra = Math.max(0, width - 1600)
  const widthDeficit = Math.max(0, 1000 - width)
  const sideOffsetPx = clampRound(30 + widthExtra * 0.18 - widthDeficit * 0.02, 24, 260)

  const heightExtra = Math.max(0, height - 900)
  const heightDeficit = Math.max(0, 820 - height)

  let bottomOffsetPx: number
  if (isTabletWidth) {
    bottomOffsetPx = clampRound(86 + heightExtra * 0.25, 86, 140)
  } else if (isMidDesktopWidth) {
    bottomOffsetPx = clampRound(126 - heightDeficit * 0.35 + heightExtra * 0.25, 84, 180)
  } else if (isWideMidDesktopWidth) {
    bottomOffsetPx = clampRound(114 - heightDeficit * 0.2 + heightExtra * 0.3, 96, 200)
  } else {
    bottomOffsetPx = clampRound(126 + heightExtra * 0.55, 126, 300)
  }

  let headingToGridGapPx: number
  if (isTabletWidth) {
    headingToGridGapPx = 70
  } else if (isMidDesktopWidth) {
    headingToGridGapPx = clampRound(56 - heightDeficit * 0.2 + heightExtra * 0.08, 30, 90)
  } else if (isWideMidDesktopWidth) {
    headingToGridGapPx = clampRound(60 - heightDeficit * 0.08 + heightExtra * 0.1, 42, 96)
  } else {
    headingToGridGapPx = Math.round(Math.min(140, 70 + heightExtra * 0.08))
  }

  return { sideOffsetPx, bottomOffsetPx, headingToGridGapPx }
}
