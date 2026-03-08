import { DEFAULT_UI_LOCALE, normalizeUiLocale, type UiLocale } from '@shared/config/locales'

export type Dictionary = Record<string, string>

export const dictionaries: Record<UiLocale, Dictionary> = {
  en: {},
  ua: {},
}

export const getDictionary = (locale?: string | null): Dictionary =>
  dictionaries[normalizeUiLocale(locale)] ?? dictionaries[DEFAULT_UI_LOCALE]
