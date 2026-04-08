import { useDevice } from '@shared/lib/device'
import { useHomePageDataGate } from '../model/useHomePageDataGate'
import { DesktopHome } from './DesktopHome'
import { HomePageDataError } from './HomePageDataError'
import { HomePagePreloader } from './HomePagePreloader'
import { MobileHome } from './MobileHome'

export const HomePage = () => {
  const { isMobile } = useDevice()
  const { isLoading, isError, progress, refetchAll, translate } = useHomePageDataGate()

  if (isLoading) {
    return <HomePagePreloader progress={progress} />
  }

  if (isError) {
    return (
      <HomePageDataError
        title={translate('section.error.title')}
        description={translate('section.error.description')}
        actionLabel={translate('section.error.retry')}
        onRetry={refetchAll}
      />
    )
  }

  if (isMobile) {
    return <MobileHome />
  }

  return <DesktopHome />
}
