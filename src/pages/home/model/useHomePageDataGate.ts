import { useMemo } from 'react'
import { useBenefitsQuery } from '@entities/benefit'
import { useMultiplyQuery } from '@entities/multiply'
import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'

export const useHomePageDataGate = () => {
  const { locale, translate } = useDictionary()
  const benefitsQuery = useBenefitsQuery(locale)
  const multiplyQuery = useMultiplyQuery(locale)
  const tasksQuery = useTasksQuery(locale)

  const isLoading = benefitsQuery.isLoading || multiplyQuery.isLoading || tasksQuery.isLoading

  const isError = benefitsQuery.isError || multiplyQuery.isError || tasksQuery.isError

  const progress = useMemo(() => {
    const settled =
      (benefitsQuery.isPending ? 0 : 1) +
      (multiplyQuery.isPending ? 0 : 1) +
      (tasksQuery.isPending ? 0 : 1)
    return Math.round((settled / 3) * 100)
  }, [benefitsQuery.isPending, multiplyQuery.isPending, tasksQuery.isPending])

  const refetchAll = () => {
    void benefitsQuery.refetch()
    void multiplyQuery.refetch()
    void tasksQuery.refetch()
  }

  return {
    isLoading,
    isError,
    progress,
    refetchAll,
    translate,
  }
}
