import { useLayoutEffect, useRef, useState } from 'react'
import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'
import { Container } from '@shared/ui/Container'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { HeroMobileMenuBar } from '@widgets/homeSections/hero'
import { TeamTile } from './components/TeamTile'
import { SnakeIntroCard } from './components/SnakeIntroCard'

export const TeamSection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useTasksQuery(locale)
  const tiles = data ? data.tiles.slice(0, 5) : []
  const teamMobileBlockRef = useRef<HTMLDivElement>(null)
  const [isTeamHeaderSticky, setIsTeamHeaderSticky] = useState(true)

  useLayoutEffect(() => {
    const el = teamMobileBlockRef.current
    if (!el) {
      return
    }

    const updateSticky = () => {
      const rect = el.getBoundingClientRect()
      setIsTeamHeaderSticky(rect.bottom > window.innerHeight + 0.5)
    }

    updateSticky()
    window.addEventListener('scroll', updateSticky, { passive: true })
    window.addEventListener('resize', updateSticky)
    return () => {
      window.removeEventListener('scroll', updateSticky)
      window.removeEventListener('resize', updateSticky)
    }
  }, [data])

  return (
    <Container
      fullWidth
      className="relative flex h-full min-h-0 w-full flex-col self-stretch pt-0 pb-0 md:h-full md:self-stretch md:py-0"
    >
      {isError ? (
        <SectionErrorState
          title={translate('section.error.title')}
          description={translate('section.error.description')}
          actionLabel={translate('section.error.retry')}
          onAction={() => void refetch()}
        />
      ) : isLoading || !data ? (
        <SectionLoadingState />
      ) : (
        <div
          ref={teamMobileBlockRef}
          className="relative -mx-[var(--container-padding-x)] flex min-h-dvh flex-col bg-[var(--color-purple-dark)] px-[var(--container-padding-x)] pt-0 pb-7 md:min-h-0 md:h-full md:self-stretch md:bg-team-desktop md:py-10"
        >
          <div className="flex flex-col md:hidden">
            <div
              className={`z-30 -mx-[var(--container-padding-x)] px-[var(--container-padding-x)] py-3 bg-[var(--color-purple-dark)] ${
                isTeamHeaderSticky ? 'sticky top-0' : 'relative'
              }`}
            >
              <HeroMobileMenuBar barClassName="!pt-0 !pb-0" />
            </div>

            <SnakeIntroCard description={data.description} locale={locale} variant="mobile" />

            <div className="mt-4 space-y-4">
              {tiles.map((item, index) => (
                <TeamTile
                  key={`${item.title}-${index}`}
                  title={item.title}
                  text={item.text}
                  variant="mobile"
                />
              ))}
            </div>

            <div className="mt-5 border-t border-white/25 pt-5">
              <p className="text-center font-heading text-[36px] leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase">
                {translate('benefits.multiTasks')}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <p
              data-anim="meta"
              className="mb-4 text-right font-heading text-2xl leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase"
            >
              {translate('benefits.multiTasks')}
            </p>

            <div className="grid h-[calc(100%-2.5rem)] min-h-[34rem] grid-cols-[1.12fr_1.12fr_0.82fr] [grid-template-rows:repeat(6,minmax(0,1fr))] gap-3">
              <SnakeIntroCard description={data.description} locale={locale} variant="desktop" />

              <div className="row-span-6 grid h-full grid-rows-2 gap-3">
                {tiles.slice(0, 2).map((item, index) => (
                  <TeamTile
                    key={`${item.title}-${index}`}
                    title={item.title}
                    text={item.text}
                    variant="desktop"
                    dataAnim="text"
                  />
                ))}
              </div>

              <div className="row-span-6 grid h-full grid-rows-3 gap-3">
                {tiles.slice(2, 5).map((item, index) => (
                  <TeamTile
                    key={`${item.title}-${index}`}
                    title={item.title}
                    text={item.text}
                    variant="desktop"
                    dataAnim="text"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
