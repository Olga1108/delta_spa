import type { ZodIssue } from 'zod'

export class ApiRequestError extends Error {
  readonly status: number

  constructor(status: number) {
    super(`Request failed with status ${status}`)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

export class ApiResponseValidationError extends Error {
  readonly path: string
  readonly issues: ZodIssue[]

  constructor(path: string, issues: ZodIssue[]) {
    super(`Response validation failed for "${path}"`)
    this.name = 'ApiResponseValidationError'
    this.path = path
    this.issues = issues
  }
}
