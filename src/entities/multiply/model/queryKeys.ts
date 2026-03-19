import { toApiLocale } from '@shared/config/locales'

export const multiplyQueryKeys = {
  all: ['multiply'] as const,
  byLocale: (locale?: string | null) => [...multiplyQueryKeys.all, toApiLocale(locale)] as const,
}
