import { useMediaQuery } from '@shared/lib/media'
import { DesktopNotFoundPage } from './DesktopNotFoundPage'
import { MobileNotFoundPage } from './MobileNotFoundPage'

export const NotFoundPage = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return <MobileNotFoundPage />
  }

  return <DesktopNotFoundPage />
}
