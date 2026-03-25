import { useLocation } from 'react-router-dom'
import { getLocaleFromPathname } from '@shared/config/locales'
import { getDictionary } from './dictionaries'

export function useDictionary() {
  const { pathname } = useLocation()
  const locale = getLocaleFromPathname(pathname)
  const dict = getDictionary(locale)

  const translate = (key: string) => dict[key] ?? key

  return { translate, locale }
}
