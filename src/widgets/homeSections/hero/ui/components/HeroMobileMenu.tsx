import logoImg from '@shared/assets/Images/icons/logo-main.svg'
import { useDictionary } from '@shared/lib/dictionary'
import { useBasePath } from '@shared/lib/useBasePath'
import { LocaleSwitcher } from '@shared/ui/LocaleSwitcher'
import { heroMenuLinks } from '../../model/constants'
import { HeroAnimatedBackground } from './HeroAnimatedBackground'
import { HeroSocialLinks } from './HeroSocialLinks'

type HeroMobileMenuProps = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const HeroMobileMenu = ({ isOpen, onOpen, onClose }: HeroMobileMenuProps) => {
  const { translate } = useDictionary()
  const basePath = useBasePath()

  if (!isOpen) {
    return (
      <div className="flex items-center justify-between pt-4 pb-5 md:hidden">
        <a
          href={basePath}
          className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
        >
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
          {translate('header.menu.open')}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col px-4 pt-4 pb-5 md:hidden">
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
            aria-label={translate('header.menu.close')}
          >
            x
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-end gap-10">
          <nav
            className="mt-[10vh] flex flex-col items-center gap-10 text-center"
            aria-label="Mobile menu"
          >
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

          <LocaleSwitcher variant="mobileMenu" />
        </div>
      </div>
    </div>
  )
}
