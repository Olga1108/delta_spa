import { apiClient } from '@shared/api'
import type { ContactFormPayload, ContactFormResponse } from '../model/types'

const CONTACT_FORM_ENDPOINT = '/form'

export const sendContactForm = (payload: ContactFormPayload): Promise<ContactFormResponse> => {
  return apiClient.post<ContactFormResponse>(CONTACT_FORM_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
