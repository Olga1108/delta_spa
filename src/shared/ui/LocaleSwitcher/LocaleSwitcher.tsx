import { useDictionary } from '@shared/lib/dictionary'

const headerNavTypeClass =
  'font-heading text-[20px] font-bold leading-none tracking-normal align-middle uppercase text-[var(--color-yellow)]'

const headerNavLinkClass = `${headerNavTypeClass} underline decoration-solid decoration-[var(--color-yellow)] underline-offset-4 [text-decoration-thickness:0%] transition-colors hover:text-white hover:decoration-white`

const headerNavLocaleActiveClass =
  'font-heading text-[20px] font-bold leading-none tracking-normal align-middle uppercase text-white no-underline transition-colors'

type LocaleSwitcherProps = {
  variant: 'header' | 'mobileMenu'
}

export const LocaleSwitcher = ({ variant }: LocaleSwitcherProps) => {
  const { locale, translate } = useDictionary()

  if (variant === 'header') {
    return (
      <span className="inline-flex items-center gap-1 text-[var(--color-yellow)]">
        <a
          href="/"
          className={locale === 'en' ? headerNavLocaleActiveClass : headerNavLinkClass}
          aria-current={locale === 'en' ? 'page' : undefined}
        >
          {translate('header.locale.en')}
        </a>
        <span aria-hidden>/</span>
        <a
          href="/ua"
          className={locale === 'ua' ? headerNavLocaleActiveClass : headerNavLinkClass}
          aria-current={locale === 'ua' ? 'page' : undefined}
        >
          {translate('header.locale.ua')}
        </a>
      </span>
    )
  }

  return (
    <div className="flex justify-center pb-6 font-heading text-[32px] leading-none font-[500] tracking-tight uppercase">
      <a
        href="/"
        className={
          locale === 'en'
            ? 'text-white no-underline'
            : 'text-white/85 underline decoration-white/80'
        }
      >
        {translate('header.locale.en')}
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
        {translate('header.locale.ua')}
      </a>
    </div>
  )
}
