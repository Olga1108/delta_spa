import { useQuery } from '@tanstack/react-query'
import { getBenefits } from '../api/getBenefits'
import { benefitQueryKeys } from './queryKeys'

export const useBenefitsQuery = (locale?: string | null) => {
  return useQuery({
    queryKey: benefitQueryKeys.byLocale(locale),
    queryFn: () => getBenefits(locale),
  })
}
