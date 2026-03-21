import iconInstagram from '@shared/assets/Images/icons/icon-instagram-light.svg'
import iconLinkedin from '@shared/assets/Images/icons/icon-linkedin-light.svg'
import iconTelegram from '@shared/assets/Images/icons/icon-telegram-light.svg'

export const heroSocialLinks = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: '#',
    icon: iconInstagram,
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: '#',
    icon: iconTelegram,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: iconLinkedin,
  },
] as const

export const heroMenuLinks = [
  { id: 'hero', labelKey: 'header.nav.main' },
  { id: 'benefits', labelKey: 'header.nav.team' },
  { id: 'multiply', labelKey: 'header.nav.benefits' },
  { id: 'join', labelKey: 'header.nav.join' },
] as const
