import { apiClient } from '@shared/api'
import { toApiLocale } from '@shared/config/locales'
import type { TaskData } from '../lib/types'

const TASKS_ENDPOINT = 'tasks'

export const getTasks = async (locale?: string | null): Promise<TaskData> => {
  const apiLocale = toApiLocale(locale)
  return apiClient.get<TaskData>(`/${apiLocale}/${TASKS_ENDPOINT}`)
}
