import type { z } from 'zod'
import type { contactFormSchema, contactMethodSchema, postFormResponseSchema } from './schema'

export type ContactMethod = z.infer<typeof contactMethodSchema>
export type ContactFormValues = z.input<typeof contactFormSchema>
export type ContactFormPayload = z.output<typeof contactFormSchema>
export type ContactFormResponse = z.infer<typeof postFormResponseSchema>
