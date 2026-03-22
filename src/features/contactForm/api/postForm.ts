import { apiClient } from '@shared/api'
import { postFormResponseSchema } from '../model/schema'
import type { ContactFormPayload, ContactFormResponse } from '../model/types'

const FORM_ENDPOINT = '/form'

export const postForm = (payload: ContactFormPayload): Promise<ContactFormResponse> => {
  return apiClient.postValidated(FORM_ENDPOINT, postFormResponseSchema, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
