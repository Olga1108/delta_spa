import { useDevice } from '@shared/lib/device'
import { AnimatedBackground } from '@shared/ui/AnimatedBackground'
import { MobileStaticBackground } from '@shared/ui/MobileStaticBackground'

export const HomePageHeroBackdrop = () => {
  const { isMdUp } = useDevice()

  return (
    <>
      <div className='absolute inset-0 md:hidden'>
        <MobileStaticBackground />
      </div>
      {isMdUp ? (
        <div className='pointer-events-none absolute inset-0 hidden md:block'>
          <AnimatedBackground variant='default' />
        </div>
      ) : null}
    </>
  )
}
