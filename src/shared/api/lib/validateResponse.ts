import type { ZodType } from 'zod'
import { ApiResponseValidationError } from './errors'

export const validateResponse = <TOutput>(
  schema: ZodType<TOutput>,
  data: unknown,
  path: string,
): TOutput => {
  const result = schema.safeParse(data)

  if (!result.success) {
    throw new ApiResponseValidationError(path, result.error.issues)
  }

  return result.data
}
