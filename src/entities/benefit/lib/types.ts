import type { z } from 'zod'
import type { benefitsResponseSchema } from './schema'

export type BenefitData = z.infer<typeof benefitsResponseSchema>
