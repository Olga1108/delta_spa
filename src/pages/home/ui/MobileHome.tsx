import { useBenefitsQuery } from '@entities/benefit'
import { useMultiplyQuery } from '@entities/multiply'
import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'
import { MobileHomeMenuProvider } from '@shared/lib/MobileHomeMenuProvider'
import { MobileStaticBackground } from '@shared/ui/MobileStaticBackground'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { HeroMobileMenuOverlay } from '@widgets/homeSections/hero'
import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
  const { locale, translate } = useDictionary()
  const benefitsQuery = useBenefitsQuery(locale)
  const multiplyQuery = useMultiplyQuery(locale)
  const tasksQuery = useTasksQuery(locale)

  if (benefitsQuery.isLoading || multiplyQuery.isLoading || tasksQuery.isLoading) {
    return (
      <main className='bg-black text-white'>
        <section className='relative flex min-h-dvh items-center justify-center'>
          <MobileStaticBackground />
          <div className='relative z-10'>
            <SectionLoadingState />
          </div>
        </section>
      </main>
    )
  }

  if (benefitsQuery.isError || multiplyQuery.isError || tasksQuery.isError) {
    return (
      <main className='bg-black text-white'>
        <section className='relative flex min-h-dvh items-center justify-center'>
          <MobileStaticBackground />
          <div className='relative z-10'>
            <SectionErrorState
              title={translate('section.error.title')}
              description={translate('section.error.description')}
              actionLabel={translate('section.error.retry')}
              onAction={() => {
                void benefitsQuery.refetch()
                void multiplyQuery.refetch()
                void tasksQuery.refetch()
              }}
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <MobileHomeMenuProvider>
      <main className='relative bg-black text-white'>
        {homeSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`relative flex min-h-dvh ${
              section.id === 'multiply' || section.id === 'join'
                ? 'bg-mobile'
                : `bg-linear-to-b ${section.color}`
            } ${
              section.id === 'multiply' || section.id === 'join'
                ? 'items-start pt-0 pb-16'
                : 'items-stretch py-0'
            }`}
          >
            <section.Component />
          </section>
        ))}
      </main>
      <HeroMobileMenuOverlay />
    </MobileHomeMenuProvider>
  )
}
