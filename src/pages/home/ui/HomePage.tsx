import { useMediaQuery } from '@shared/lib/media'
import { DesktopHome } from './DesktopHome'
import { MobileHome } from './MobileHome'

export const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return <MobileHome />
  }

  return <DesktopHome />
}
