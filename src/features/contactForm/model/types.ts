export type ContactMethod = 'telegram' | 'whatsapp' | 'email'

export type ContactFormPayload = {
  name?: string
  method: ContactMethod
  contact: string
}

export type ContactFormResponse = Record<string, unknown>
