import type { z } from 'zod'
import type {
  multiplyItemSchema,
  multiplyResponseSchema,
  multiplyStepSchema,
} from './schema'

export type MultiplyStep = z.infer<typeof multiplyStepSchema>
export type MultiplyItem = z.infer<typeof multiplyItemSchema>
export type MultiplyData = z.infer<typeof multiplyResponseSchema>

export type MultiplyAudienceKey = 'media_buyers' | 'businesses' | 'partners'

export type MultiplySectionContent = {
  key: MultiplyAudienceKey
  buttonWidth: number
  step1: string
  step2: string
}
