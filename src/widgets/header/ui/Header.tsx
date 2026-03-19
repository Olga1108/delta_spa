import { useLocation } from 'react-router-dom'
import { useDictionary } from '@shared/lib/dictionary'

import logoImg from '@shared/assets/Images/icons/logo-main.svg'

const navLinkClass =
  'font-body text-xs font-normal uppercase tracking-[0.18em] text-white underline decoration-white/60 underline-offset-4 transition hover:decoration-white'

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
        <a href={`${basePath}#benefits`} className={navLinkClass}>
          {translate('header.nav.team')}
        </a>
        <a href={`${basePath}#multiply`} className={navLinkClass}>
          {translate('header.nav.benefits')}
        </a>
        <a href={`${basePath}#join`} className={navLinkClass}>
          {translate('header.nav.join')}
        </a>
        <span className="font-body text-xs uppercase tracking-wider text-white/80">
          <a
            href="/"
            className={locale === 'en' ? 'underline decoration-white' : 'no-underline hover:underline'}
          >
            EN
          </a>
          <span className="mx-1">/</span>
          <a
            href="/ua"
            className={locale === 'ua' ? 'underline decoration-white' : 'no-underline hover:underline'}
          >
            UA
          </a>
        </span>
      </nav>
    </header>
  )
}
