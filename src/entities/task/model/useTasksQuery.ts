import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api/getTasks'
import { taskQueryKeys } from './queryKeys'

export const useTasksQuery = (locale?: string | null) => {
  return useQuery({
    queryKey: taskQueryKeys.byLocale(locale),
    queryFn: () => getTasks(locale),
  })
}
