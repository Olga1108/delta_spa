import { BREAKPOINTS } from '@shared/config/breakpoints'
import { useViewport } from './useViewport'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export type DeviceInfo = {
  width: number
  height: number
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isMdUp: boolean
  isLgUp: boolean
  isXlUp: boolean
  isXxlUp: boolean
}

const getDeviceType = (width: number): DeviceType => {
  if (width < BREAKPOINTS.md) {
    return 'mobile'
  }
  if (width < BREAKPOINTS.lg) {
    return 'tablet'
  }
  return 'desktop'
}

export const useDevice = (): DeviceInfo => {
  const { width, height } = useViewport()
  const deviceType = getDeviceType(width)

  return {
    width,
    height,
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isMdUp: width >= BREAKPOINTS.md,
    isLgUp: width >= BREAKPOINTS.lg,
    isXlUp: width >= BREAKPOINTS.xl,
    isXxlUp: width >= BREAKPOINTS.xxl,
  }
}
