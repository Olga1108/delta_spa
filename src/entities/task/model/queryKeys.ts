const TASK_QUERY_BASE = ['tasks'] as const

export const taskQueryKeys = {
  all: TASK_QUERY_BASE,
  byLocale: (locale?: string | null) => [...TASK_QUERY_BASE, locale ?? 'default'] as const,
}
