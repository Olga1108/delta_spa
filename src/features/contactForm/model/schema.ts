import { z } from 'zod'

export const contactMethodSchema = z.enum(['telegram', 'whatsapp', 'email'])

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .max(120)
    .or(z.literal(''))
    .transform((value) => (value === '' ? undefined : value)),
  method: contactMethodSchema,
  contact: z.string().trim().min(1).max(120),
})

export const postFormResponseSchema = z.object({}).passthrough()
