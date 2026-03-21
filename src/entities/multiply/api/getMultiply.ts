import { apiClient } from '@shared/api'
import { toApiLocale } from '@shared/config/locales'
import type { MultiplyData } from '../lib/types'
import { multiplyResponseSchema } from '../lib/schema'

const MULTIPLY_ENDPOINT = 'multiply'

export const getMultiply = async (locale?: string | null): Promise<MultiplyData> => {
  const apiLocale = toApiLocale(locale)
  return apiClient.getValidated(`/${apiLocale}/${MULTIPLY_ENDPOINT}`, multiplyResponseSchema)
}
