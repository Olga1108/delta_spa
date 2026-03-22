import { useState } from 'react'
import { ContactFormModal } from '@features/contactForm'
import { Container } from '@shared/ui/Container'
import { useDictionary } from '@shared/lib/dictionary'
import { ParallelogramButton } from '@shared/ui/ParallelogramButton'
import { Header } from '@widgets/header'
import heroSnake from '@shared/assets/Images/hero/hero-image-main@1x.png'
import { AnimatedBackground } from '@shared/ui/AnimatedBackground'
import { HeroMobileMenuBar } from './components/HeroMobileMenuBar'
import { HeroSocialLinks } from './components/HeroSocialLinks'

export const HeroSection = () => {
  const { translate } = useDictionary()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <div className="relative flex w-full min-h-screen min-h-dvh flex-col overflow-hidden bg-mobile md:h-full md:min-h-0 md:self-stretch md:bg-transparent">
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <AnimatedBackground />
      </div>
      <Container fullWidth className="relative z-10 flex min-h-0 flex-1 flex-col md:mb-8">
        <div data-anim="meta" className="hidden md:block">
          <Header />
        </div>

        <div className="md:hidden">
          <HeroMobileMenuBar />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col gap-0 pt-0 pb-4 md:flex-row md:items-stretch md:gap-12 md:py-8 lg:gap-16">
          <div className="z-10 flex flex-col justify-start md:max-w-[66%] md:flex-1 md:justify-center">
            <h1
              data-anim="title"
              className="max-w-[8.4em] font-heading text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.9] tracking-[-1.74px] text-white uppercase md:max-w-[8.8em] md:text-[80px]"
            >
              <span>{translate('hero.titlePrefix')}</span>
              <span className="text-[var(--color-yellow)]">{translate('hero.titleHighlight')}</span>
            </h1>
            <p
              data-anim="text"
              className="mt-4 max-w-[18em] align-middle font-body text-[20px] font-normal leading-[24px] tracking-normal text-white md:max-w-[30em]"
            >
              {translate('hero.description')}
            </p>
            <div className="mt-6 md:mt-8">
              <ParallelogramButton
                onClick={() => setIsContactModalOpen(true)}
                width="clamp(17rem, 52vw, 21rem)"
                height="clamp(5rem, 13vw, 5.75rem)"
                className="text-[22px] leading-none tracking-[0.22em] text-[var(--color-black)] focus-visible:outline focus-visible:ring-2 focus-visible:ring-white md:text-[26px]"
              >
                {translate('hero.cta')}
              </ParallelogramButton>
            </div>
          </div>
          <div className="pointer-events-none z-0 mt-0 ml-[-76px] h-auto w-[510px] max-w-none max-md:relative md:absolute md:top-auto md:right-[320px] md:bottom-[-64px] md:left-auto md:z-0 md:ml-0 md:mt-0 md:max-w-[64%]">
            <img
              src={heroSnake}
              alt=""
              className="h-full w-full max-w-none select-none object-contain md:block md:h-auto md:w-auto md:max-w-[52rem]"
              draggable={false}
            />
          </div>
        </div>

        <HeroSocialLinks className="hidden shrink-0 items-center gap-6 pb-0 md:flex" />
      </Container>
      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
