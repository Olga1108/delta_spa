import { toApiLocale } from '@shared/config/locales'

export const benefitQueryKeys = {
  all: ['benefits'] as const,
  byLocale: (locale?: string | null) => [...benefitQueryKeys.all, toApiLocale(locale)] as const,
}
