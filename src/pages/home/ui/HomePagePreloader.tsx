import logoImg from '@shared/assets/Images/icons/logo-main.svg'
import { useDevice } from '@shared/lib/device'
import { useDictionary } from '@shared/lib/dictionary'
import { useBasePath } from '@shared/lib/useBasePath'
import { Container } from '@shared/ui/Container'
import { Header } from '@widgets/header'

import { HomePageHeroBackdrop } from './HomePageHeroBackdrop'

type HomePagePreloaderProps = {
  progress: number
}

export const HomePagePreloader = ({ progress }: HomePagePreloaderProps) => {
  const { isMdUp } = useDevice()
  const { translate } = useDictionary()
  const basePath = useBasePath()
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <main className='relative flex min-h-dvh flex-col overflow-hidden bg-black text-white'>
      <HomePageHeroBackdrop />

      <Container
        fullWidth
        className='relative z-10 flex min-h-0 flex-1 flex-col md:mb-8'
      >
        {isMdUp ? (
          <div className='hidden md:block'>
            <Header />
          </div>
        ) : (
          <div className='flex items-center justify-between pt-4 pb-5 md:hidden'>
            <a
              href={basePath}
              className='focus-visible:outline focus-visible:ring-2 focus-visible:ring-white'
            >
              <img
                src={logoImg}
                alt='CPA'
                width={26.238}
                height={24}
                className='h-[24px] w-[26.238px] shrink-0 object-contain'
              />
            </a>
            <span
              aria-hidden
              className='align-middle text-right font-heading text-[16px] leading-[1] font-bold tracking-normal text-[var(--color-yellow)] uppercase underline decoration-solid underline-offset-4'
            >
              {translate('header.menu.open')}
            </span>
          </div>
        )}

        <div className='flex flex-1 flex-col justify-end pb-16 md:justify-center md:pb-8'>
          <div
            className='flex w-full flex-col items-stretch px-[var(--container-padding-x)] md:mx-auto md:max-w-[min(40rem,calc(100%-2rem))] md:px-0'
            role='status'
            aria-live='polite'
            aria-busy
            aria-label={translate('home.preloader.label')}
          >
            <p
              className='text-center font-heading text-[clamp(3.25rem,14vw,5.5rem)] font-bold leading-none tracking-[-0.02em] text-white tabular-nums'
              aria-hidden
            >
              {clamped}%
            </p>
            <div
              className='mt-5 h-3 w-full overflow-hidden rounded-full bg-white md:mt-6 md:h-3.5'
              role='progressbar'
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={clamped}
              aria-label={translate('home.preloader.progress')}
            >
              <div
                className='h-full rounded-full bg-[var(--color-yellow)] transition-[width] duration-300 ease-out motion-reduce:transition-none'
                style={{ width: `${clamped}%` }}
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
