import { useLocation } from 'react-router-dom'
import logoImg from '@shared/assets/Images/icons/logo-main.svg'
import { useDictionary } from '@shared/lib/dictionary'
import { heroMenuLinks } from '../../model/constants'
import { HeroAnimatedBackground } from './HeroAnimatedBackground'
import { HeroSocialLinks } from './HeroSocialLinks'

type HeroMobileMenuProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const HeroMobileMenu = ({ isOpen, onOpen, onClose }: HeroMobileMenuProps) => {
  const { translate, locale } = useDictionary()
  const { pathname } = useLocation()
  const basePath = pathname.replace(/#.*$/, '') || '/'

  if (!isOpen) {
    return (
      <div className="flex items-center justify-between pt-4 pb-5 md:hidden">
        <a href={basePath} className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white">
          <img
            src={logoImg}
            alt="CPA"
            width={26.238}
            height={24}
            className="h-[24px] w-[26.238px] shrink-0 object-contain"
          />
        </a>
        <button
          type="button"
          onClick={onOpen}
          className="align-middle text-right font-heading text-[16px] leading-[1] font-bold tracking-normal text-[var(--color-yellow)] uppercase underline decoration-solid underline-offset-4"
        >
          Menu
        </button>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-30 flex flex-col px-4 pt-4 pb-5 md:hidden">
      <HeroAnimatedBackground />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <a
            href={basePath}
            className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
            onClick={onClose}
          >
            <img
              src={logoImg}
              alt="CPA"
              width={43.806}
              height={40}
              className="h-[40px] w-[43.806px] shrink-0 object-contain"
            />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="align-middle text-right font-heading text-[24px] leading-[1] font-[500] tracking-normal text-[var(--color-yellow)] uppercase"
            aria-label="Close menu"
          >
            x
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-end gap-10">
          <nav className="mt-[10vh] flex flex-col items-center gap-10 text-center" aria-label="Mobile menu">
            {heroMenuLinks.map((item) => (
              <a
                key={item.id}
                href={`${basePath}#${item.id}`}
                onClick={onClose}
                className="align-middle font-heading text-[32px] leading-[1] font-[500] tracking-normal text-[var(--color-yellow)] uppercase underline decoration-solid underline-offset-4 decoration-1"
              >
                {translate(item.labelKey)}
              </a>
            ))}
          </nav>

          <HeroSocialLinks className="mt-auto flex items-center justify-center gap-8 pb-8" />

          <div className="flex justify-center pb-6 font-heading text-[32px] leading-none font-[500] tracking-tight uppercase">
            <a
              href="/"
              className={locale === 'en' ? 'text-white no-underline' : 'text-white/85 underline decoration-white/80'}
            >
              Eng
            </a>
            <span className="px-1 text-[var(--color-yellow)]">/</span>
            <a
              href="/ua"
              className={
                locale === 'ua'
                  ? 'text-[var(--color-yellow)] underline decoration-[var(--color-yellow)]'
                  : 'text-[var(--color-yellow)]'
              }
            >
              Укр
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
