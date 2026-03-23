import type { MouseEvent } from 'react'
import { useFullPageNavigation } from '@features/animations'
import { useDictionary } from '@shared/lib/dictionary'
import { useBasePath } from '@shared/lib/useBasePath'
import { LocaleSwitcher } from '@shared/ui/LocaleSwitcher'

import logoImg from '@shared/assets/Images/icons/logo-main.svg'

const shouldUseNativeLinkNavigation = (event: MouseEvent<HTMLAnchorElement>) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0

const headerNavTypeClass =
  'font-heading text-[20px] font-bold leading-none tracking-normal align-middle uppercase text-[var(--color-yellow)]'

const headerNavLinkClass = `${headerNavTypeClass} underline decoration-solid decoration-[var(--color-yellow)] underline-offset-4 [text-decoration-thickness:0%] transition-colors hover:text-white hover:decoration-white`

export const Header = () => {
  const { translate } = useDictionary()
  const basePath = useBasePath()
  const fullPageNav = useFullPageNavigation()

  const onLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!fullPageNav || shouldUseNativeLinkNavigation(event)) {
      return
    }
    event.preventDefault()
    fullPageNav.goToSectionId('hero')
  }

  const onSectionNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (!fullPageNav || shouldUseNativeLinkNavigation(event)) {
      return
    }
    event.preventDefault()
    fullPageNav.goToSectionId(sectionId)
  }

  return (
    <header className="flex shrink-0 items-center justify-between pt-6 md:pt-8">
      <a
        href={basePath}
        onClick={onLogoClick}
        className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
      >
        <img src={logoImg} alt="CPA" className="h-8 w-auto md:h-9" />
      </a>
      <nav className="flex items-center gap-6 md:gap-8" aria-label="Main">
        <a
          href={`${basePath}#team`}
          onClick={(e) => onSectionNavClick(e, 'team')}
          className={headerNavLinkClass}
        >
          {translate('header.nav.team')}
        </a>
        <a
          href={`${basePath}#multiply`}
          onClick={(e) => onSectionNavClick(e, 'multiply')}
          className={headerNavLinkClass}
        >
          {translate('header.nav.multiply')}
        </a>
        <a
          href={`${basePath}#join`}
          onClick={(e) => onSectionNavClick(e, 'join')}
          className={headerNavLinkClass}
        >
          {translate('header.nav.join')}
        </a>
        <LocaleSwitcher variant="header" />
      </nav>
    </header>
  )
}
