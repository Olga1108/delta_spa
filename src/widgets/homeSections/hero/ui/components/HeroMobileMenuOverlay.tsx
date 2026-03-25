import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import logoImg from '@shared/assets/Images/icons/logo-main.svg'
import { useDictionary } from '@shared/lib/dictionary'
import { useMobileHomeMenu } from '@shared/lib/useMobileHomeMenu'
import { useBasePath } from '@shared/lib/useBasePath'
import { LocaleSwitcher } from '@shared/ui/LocaleSwitcher'
import { heroMenuLinks } from '../../model/constants'
import { HeroSocialLinks } from './HeroSocialLinks'

export const HeroMobileMenuOverlay = () => {
  const ctx = useMobileHomeMenu()
  const { translate } = useDictionary()
  const basePath = useBasePath()
  const isOpen = ctx?.isOpen ?? false
  const onClose = ctx?.close ?? (() => {})

  useEffect(() => {
    if (!isOpen) {
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!ctx || !isOpen) {
    return null
  }

  const overlay = (
    <div className='fixed inset-0 z-[100] flex max-h-dvh flex-col overflow-hidden overscroll-behavior-none bg-mobile px-4 pt-4 pb-5 md:hidden'>
      <div className='relative z-10 flex min-h-0 flex-1 flex-col'>
        <div className='flex shrink-0 items-center justify-between'>
          <a
            href={basePath}
            className='focus-visible:outline focus-visible:ring-2 focus-visible:ring-white'
            onClick={onClose}
          >
            <img
              src={logoImg}
              alt='CPA'
              width={43.806}
              height={40}
              className='h-[40px] w-[43.806px] shrink-0 object-contain'
            />
          </a>
          <button
            type='button'
            onClick={onClose}
            className='align-middle text-right font-heading text-[24px] leading-[1] font-[500] tracking-normal text-[var(--color-yellow)] uppercase'
            aria-label={translate('header.menu.close')}
          >
            x
          </button>
        </div>
        <div className='flex min-h-0 flex-1 flex-col justify-end gap-10 overflow-y-auto'>
          <nav
            className='mt-[10vh] flex flex-col items-center gap-10 py-4 text-center'
            aria-label='Mobile menu'
          >
            {heroMenuLinks.map((item) => (
              <a
                key={item.id}
                href={`${basePath}#${item.id}`}
                onClick={onClose}
                className='align-middle font-heading text-[32px] leading-[1] font-[500] tracking-normal text-[var(--color-yellow)] uppercase underline decoration-solid underline-offset-4 decoration-1'
              >
                {translate(item.labelKey)}
              </a>
            ))}
          </nav>

          <HeroSocialLinks className='mt-auto flex shrink-0 items-center justify-center gap-8 pb-8' />

          <LocaleSwitcher variant='mobileMenu' />
        </div>
      </div>
    </div>
  )

  return createPortal(overlay, document.body)
}
