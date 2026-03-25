import { useDevice } from '@shared/lib/device'
import { DesktopNotFoundPage } from './DesktopNotFoundPage'
import { MobileNotFoundPage } from './MobileNotFoundPage'

export const NotFoundPage = () => {
  const { isMobile } = useDevice()

  if (isMobile) {
    return <MobileNotFoundPage />
  }

  return <DesktopNotFoundPage />
}
