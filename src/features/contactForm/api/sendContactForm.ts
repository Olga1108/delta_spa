import { postForm } from './postForm'
import type { ContactFormPayload, ContactFormResponse } from '../model/types'

export const sendContactForm = (payload: ContactFormPayload): Promise<ContactFormResponse> => {
  return postForm(payload)
}
