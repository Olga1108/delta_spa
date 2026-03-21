import { useQuery } from '@tanstack/react-query'
import { getMultiply } from '../api/getMultiply'
import { multiplyQueryKeys } from './queryKeys'

export const useMultiplyQuery = (locale?: string | null) => {
  return useQuery({
    queryKey: multiplyQueryKeys.byLocale(locale),
    queryFn: () => getMultiply(locale),
  })
}
