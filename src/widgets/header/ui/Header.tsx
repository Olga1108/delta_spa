import { useLocation } from 'react-router-dom'
import { useDictionary } from '@shared/lib/dictionary'

import logoImg from '@shared/assets/Images/icons/logo-main.svg'

/** Halvar Breit (Figma: Halvar Breitschrift), 20 / 700 / uppercase */
const headerNavTypeClass =
  'font-heading text-[20px] font-bold leading-none tracking-normal align-middle uppercase text-[var(--color-yellow)]'

const headerNavLinkClass = `${headerNavTypeClass} underline decoration-solid decoration-[var(--color-yellow)] underline-offset-4 [text-decoration-thickness:0%] transition-colors hover:text-white hover:decoration-white`

/** Active locale: white, no underline (inactive uses `headerNavLinkClass`). */
const headerNavLocaleActiveClass =
  'font-heading text-[20px] font-bold leading-none tracking-normal align-middle uppercase text-white no-underline transition-colors'

export const Header = () => {
  const { translate, locale } = useDictionary()
  const { pathname } = useLocation()
  const basePath = pathname.replace(/#.*$/, '') || '/'

  return (
    <header className="flex shrink-0 items-center justify-between pt-6 md:pt-8">
      <a href={basePath} className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white">
        <img src={logoImg} alt="CPA" className="h-8 w-auto md:h-9" />
      </a>
      <nav className="flex items-center gap-6 md:gap-8" aria-label="Main">
        <a href={`${basePath}#benefits`} className={headerNavLinkClass}>
          {translate('header.nav.team')}
        </a>
        <a href={`${basePath}#multiply`} className={headerNavLinkClass}>
          {translate('header.nav.benefits')}
        </a>
        <a href={`${basePath}#join`} className={headerNavLinkClass}>
          {translate('header.nav.join')}
        </a>
        <span className="inline-flex items-center gap-1 text-[var(--color-yellow)]">
          <a
            href="/"
            className={locale === 'en' ? headerNavLocaleActiveClass : headerNavLinkClass}
            aria-current={locale === 'en' ? 'page' : undefined}
          >
            ENG
          </a>
          <span aria-hidden>/</span>
          <a
            href="/ua"
            className={locale === 'ua' ? headerNavLocaleActiveClass : headerNavLinkClass}
            aria-current={locale === 'ua' ? 'page' : undefined}
          >
            UKR
          </a>
        </span>
      </nav>
    </header>
  )
}
