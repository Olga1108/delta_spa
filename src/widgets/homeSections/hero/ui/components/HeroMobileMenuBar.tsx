import logoImg from '@shared/assets/Images/icons/logo-main.svg'
import { useDictionary } from '@shared/lib/dictionary'
import { useMobileMenuOpenState } from '@shared/lib/useMobileHomeMenu'
import { useBasePath } from '@shared/lib/useBasePath'

type HeroMobileMenuBarProps = {
  /** Extra classes for the closed bar row (e.g. compact padding inside a sticky team header). */
  barClassName?: string
}

export const HeroMobileMenuBar = ({ barClassName = '' }: HeroMobileMenuBarProps) => {
  const { translate } = useDictionary()
  const basePath = useBasePath()
  const { onOpen } = useMobileMenuOpenState()

  return (
    <div
      className={`flex items-center justify-between pt-4 pb-5 md:hidden ${barClassName}`.trim()}
    >
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
        {translate('header.menu.open')}
      </button>
    </div>
  )
}
