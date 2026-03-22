import { useState } from 'react'
import { useBenefitsQuery } from '@entities/benefit'
import { useMultiplyQuery } from '@entities/multiply'
import { useTasksQuery } from '@entities/task'
import { HeroMobileMenu } from '@widgets/homeSections/hero'
import { useDictionary } from '@shared/lib/dictionary'
import { Container } from '@shared/ui/Container'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { locale, translate } = useDictionary()
  const benefitsQuery = useBenefitsQuery(locale)
  const multiplyQuery = useMultiplyQuery(locale)
  const tasksQuery = useTasksQuery(locale)

  if (benefitsQuery.isLoading || multiplyQuery.isLoading || tasksQuery.isLoading) {
    return (
      <main className="bg-black text-white">
        <section className="relative flex min-h-dvh items-center justify-center bg-[linear-gradient(122deg,#dc8400_2%,#560080_50%,#220032_92%)]">
          <SectionLoadingState />
        </section>
      </main>
    )
  }

  if (benefitsQuery.isError || multiplyQuery.isError || tasksQuery.isError) {
    return (
      <main className="bg-black text-white">
        <section className="relative flex min-h-dvh items-center justify-center bg-[linear-gradient(122deg,#dc8400_2%,#560080_50%,#220032_92%)]">
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
        </section>
      </main>
    )
  }

  return (
    <main className="relative bg-black text-white">
      <Container fullWidth className="fixed inset-x-0 top-0 z-50 md:hidden">
        <HeroMobileMenu
          isOpen={isMenuOpen}
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        />
      </Container>

      {homeSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative flex min-h-dvh bg-linear-to-b ${section.color} ${
            section.id === 'multiply' || section.id === 'join'
              ? 'items-start pt-0 pb-16'
              : 'items-stretch py-0'
          }`}
        >
          <section.Component />
        </section>
      ))}
    </main>
  )
}
