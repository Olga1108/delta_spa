import { apiClient } from '@shared/api'
import { toApiLocale } from '@shared/config/locales'
import type { BenefitData } from '../lib/types'
import { benefitsResponseSchema } from '../lib/schema'

const BENEFITS_ENDPOINT = 'benefits'

export const getBenefits = async (locale?: string | null): Promise<BenefitData> => {
  const apiLocale = toApiLocale(locale)
  return apiClient.getValidated(`/${apiLocale}/${BENEFITS_ENDPOINT}`, benefitsResponseSchema)
}
