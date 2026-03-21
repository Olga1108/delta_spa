import { apiClient } from '@shared/api'
import { toApiLocale } from '@shared/config/locales'
import type { TaskData } from '../lib/types'
import { tasksResponseSchema } from '../lib/schema'

const TASKS_ENDPOINT = 'tasks'

export const getTasks = async (locale?: string | null): Promise<TaskData> => {
  const apiLocale = toApiLocale(locale)
  return apiClient.getValidated(`/${apiLocale}/${TASKS_ENDPOINT}`, tasksResponseSchema)
}
