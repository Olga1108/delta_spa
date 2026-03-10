import { DEFAULT_UI_LOCALE, normalizeUiLocale, type UiLocale } from '@shared/config/locales'

export type Dictionary = Record<string, string>

export const dictionaries: Record<UiLocale, Dictionary> = {
  en: {
    'header.nav.benefits': 'Benefits',
    'header.nav.tasks': 'Tasks',
    'header.nav.join': 'Join',
    'footer.scrollToTop': 'Scroll to top',
    'form.name': 'Name',
    'form.contact': 'Contact',
    'form.submit': 'Submit',
    'modal.close': 'Close',
    'modal.thankYou': 'Thank you',
  },
  ua: {
    'header.nav.benefits': 'Переваги',
    'header.nav.tasks': 'Завдання',
    'header.nav.join': 'Приєднатися',
    'footer.scrollToTop': 'Прокрутити вгору',
    'form.name': "Ім'я",
    'form.contact': 'Контакт',
    'form.submit': 'Надіслати',
    'modal.close': 'Закрити',
    'modal.thankYou': 'Дякуємо',
  },
}

export const getDictionary = (locale?: string | null): Dictionary =>
  dictionaries[normalizeUiLocale(locale)] ?? dictionaries[DEFAULT_UI_LOCALE]
