export const UI_LOCALES = ['en', 'ua'] as const
export type UiLocale = (typeof UI_LOCALES)[number]

export const API_LOCALES = ['en', 'ua'] as const
export type ApiLocale = (typeof API_LOCALES)[number]

export const DEFAULT_UI_LOCALE: UiLocale = 'en'

const uiLocaleAliases: Record<string, UiLocale> = {
  en: 'en',
  ua: 'ua',
}

const normalizeLocaleToken = (value?: string | null) =>
  value?.trim().toLowerCase().replace(/^\/+/, '')

export const normalizeUiLocale = (value?: string | null): UiLocale => {
  const token = normalizeLocaleToken(value)
  return (token && uiLocaleAliases[token]) || DEFAULT_UI_LOCALE
}

export const toApiLocale = (value?: string | null): ApiLocale => normalizeUiLocale(value)

export const getLocaleFromPathname = (pathname: string): UiLocale => {
  const token = normalizeLocaleToken(pathname.split('/').filter(Boolean)[0])
  return normalizeUiLocale(token)
}
