import { useLocation } from 'react-router-dom'
import { Container } from '@shared/ui/Container'
import { useDictionary } from '@shared/lib/dictionary'
import { Header } from '@widgets/header'

import gridBg from '@shared/assets/Images/bg/hero-bg-grid-purple.svg'
import heroSnake from '@shared/assets/Images/hero/hero-image-main@1x.png'
import iconInstagram from '@shared/assets/Images/icons/icon-instagram-light.svg'
import iconTelegram from '@shared/assets/Images/icons/icon-telegram-light.svg'
import iconLinkedin from '@shared/assets/Images/icons/icon-linkedin-light.svg'

export const HeroSectionMock = () => {
  const { translate } = useDictionary()
  const { pathname } = useLocation()
  const basePath = pathname.replace(/#.*$/, '') || '/'

  return (
    <div className="relative flex min-h-full flex-col">
      {/* Background gradient and grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4B0082] via-[#3d0066] to-[#2E004F]"
        aria-hidden
      />
      <img
        src={gridBg}
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-auto w-[min(70%,420px)] select-none opacity-60"
        aria-hidden
      />

      <Container fullWidth className="relative z-10 flex min-h-full flex-col">
        <Header />

        {/* Main: two columns */}
        <div className="flex flex-1 flex-col items-center gap-10 py-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="flex flex-1 flex-col justify-center md:max-w-[50%]">
            <h1
              data-anim="title"
              className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span>{translate('hero.titlePrefix')}</span>
              <span className="text-[#E2FF6F]">{translate('hero.titleHighlight')}</span>
            </h1>
            <p
              data-anim="text"
              className="mt-4 max-w-lg font-body text-sm font-light leading-relaxed text-white/90 md:text-base lg:text-lg"
            >
              {translate('hero.description')}
            </p>
            <div className="mt-6 md:mt-8">
              <a
                href={`${basePath}#join`}
                className="inline-flex items-center justify-center rounded border-2 border-black bg-[#E2FF6F] px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-black shadow-[0_4px_0_0_rgba(0,0,0,1)] transition hover:bg-[#d4f065] focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
              >
                {translate('hero.cta')}
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-center md:max-w-[50%] md:justify-end">
            <img
              src={heroSnake}
              alt=""
              className="h-auto max-h-[60vh] w-full max-w-md select-none object-contain md:max-h-[75vh]"
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          </div>
        </div>

        {/* Hero social links (page footer is in the fourth section) */}
        <div className="flex shrink-0 items-center gap-6 pb-6 md:pb-8" aria-label="Social links">
          <a href="#" className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white" aria-label="Instagram">
            <img src={iconInstagram} alt="" className="h-6 w-6 opacity-90 hover:opacity-100" />
          </a>
          <a href="#" className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white" aria-label="Telegram">
            <img src={iconTelegram} alt="" className="h-6 w-6 opacity-90 hover:opacity-100" />
          </a>
          <a href="#" className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white" aria-label="LinkedIn">
            <img src={iconLinkedin} alt="" className="h-6 w-6 opacity-90 hover:opacity-100" />
          </a>
        </div>
      </Container>
    </div>
  )
}
