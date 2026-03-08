import { apiClient } from '@shared/api'
import { toApiLocale } from '@shared/config/locales'
import type { BenefitData } from '../lib/types'

const BENEFITS_ENDPOINT = 'benefits'

export const getBenefits = async (locale?: string | null): Promise<BenefitData> => {
  const apiLocale = toApiLocale(locale)
  return apiClient.get<BenefitData>(`/${apiLocale}/${BENEFITS_ENDPOINT}`)
}
