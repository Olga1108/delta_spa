import { useDevice } from '@shared/lib/device'
import { DesktopHome } from './DesktopHome'
import { MobileHome } from './MobileHome'

export const HomePage = () => {
  const { isMobile } = useDevice()

  if (isMobile) {
    return <MobileHome />
  }

  return <DesktopHome />
}
