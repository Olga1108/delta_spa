import { DEFAULT_UI_LOCALE, normalizeUiLocale, type UiLocale } from '@shared/config/locales'

export type Dictionary = Record<string, string>

export const dictionaries: Record<UiLocale, Dictionary> = {
  en: {
    'hero.title': 'Practice Makes Profit',
    'hero.description':
      'We provide effective solutions, tested and refined on our own products and budgets',
    'header.nav.benefits': 'Benefits',
    'header.nav.team': 'Team',
    'header.nav.join': 'Join Us',
    'footer.scrollToTop': 'Scroll to top',
    'join.audience.media_buyers': 'For Media Buyers',
    'join.audience.businesses': 'For Businesses',
    'join.audience.partners': 'For Partners',
    'join.cta.media_buyers': 'JOIN THE TEAM',
    'join.cta.businesses': 'LAUNCH NOW',
    'join.cta.partners': 'PARTNER UP',
    'form.title': 'Fields with an asterisk (*) are mandatory',
    'form.name': 'Your Name',
    'form.contact': 'YourContact',
    'form.contact.method': 'Contact Method',
    'form.submit': 'Submit',
    'modal.title': 'We have received your application!',
    'modal.text': 'We will process your request and get in touch with you',
    'modal.button.done': 'Done',
  },
  ua: {
    'hero.title': 'Practice Makes Profit',
    'hero.description':
      'Пропонуємо ефективні рішення, які вже протестували на своїх продуктах та бюджетах',
    'header.nav.benefits': 'Переваги',
    'header.nav.team': 'Команда',
    'header.nav.join': 'З нами',
    'footer.scrollToTop': 'Прокрутити вгору',
    'join.audience.media_buyers': 'Медіабайєрам',
    'join.audience.businesses': 'Бізнесам',
    'join.audience.partners': 'Партнерам',
    'join.cta.media_buyers': 'В КОМАНДУ',
    'join.cta.businesses': 'ЗАПУСТИТИ ПРОЄКТ',
    'join.cta.partners': 'СТАТИ ПАРТНЕРОМ',
    'form.title': "Поля із зірочкою (*) є обов'язковими",
    'form.name': "Ваше Ім'я",
    'form.contact': 'Ваш Контакт',
    'form.contact.method': "Спосіб зв'язку",
    'form.submit': 'Надіслати',
    'modal.title': 'Ми отримали вашу заявку!',
    'modal.text': "Ми опрацюємо ваш запит і зв'яжемося з вами",
    'modal.button.done': 'Готово',
  },
}

export const getDictionary = (locale?: string | null): Dictionary =>
  dictionaries[normalizeUiLocale(locale)] ?? dictionaries[DEFAULT_UI_LOCALE]
