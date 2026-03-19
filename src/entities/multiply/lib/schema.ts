import { z } from 'zod'

export const multiplyStepSchema = z.object({
  step_1: z.string().min(1),
  step_2: z.string().min(1),
})

export const multiplyItemSchema = z.object({
  title: z.string().min(1),
  steps: multiplyStepSchema,
})

export const multiplyResponseSchema = z.array(multiplyItemSchema).min(1)
