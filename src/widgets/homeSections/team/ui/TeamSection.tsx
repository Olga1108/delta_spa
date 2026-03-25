import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'
import { useViewport } from '@shared/lib/device'
import { Container } from '@shared/ui/Container'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { getTeamDesktopLayoutMetrics, isTeamTabletWidth } from '../lib/teamDesktopLayoutMetrics'
import { TeamSectionDesktopTablet } from './TeamSectionDesktopTablet'
import { TeamSectionDesktopWide } from './TeamSectionDesktopWide'
import { TeamSectionMobile } from './TeamSectionMobile'

export const TeamSection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useTasksQuery(locale)
  const tiles = data ? data.tiles.slice(0, 5) : []
  const teamMobileBlockRef = useRef<HTMLDivElement>(null)
  const { width, height } = useViewport()
  const [isTeamHeaderSticky, setIsTeamHeaderSticky] = useState(true)
  const layout = useMemo(() => getTeamDesktopLayoutMetrics(width, height), [width, height])

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

  const isTabletLayout = isTeamTabletWidth(width)

  return (
    <Container
      fullWidth
      className='relative flex h-full min-h-0 w-full flex-col self-stretch pt-0 pb-0 md:h-full md:self-stretch md:py-0'
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
          className={`relative -mx-[var(--container-padding-x)] flex min-h-dvh flex-col bg-[var(--color-purple-dark)] px-[var(--container-padding-x)] pt-0 pb-7 md:self-stretch md:bg-team-desktop md:px-[var(--container-padding-x)] ${
            isTabletLayout
              ? 'md:min-h-0 md:h-full md:overflow-hidden md:pt-4 md:pb-6 lg:pb-7 xl:pb-8'
              : 'md:min-h-0 md:h-full md:pt-7 md:pb-6 lg:pt-8 lg:pb-6 xl:pt-10 xl:pb-10'
          }`}
        >
          <TeamSectionMobile
            isTeamHeaderSticky={isTeamHeaderSticky}
            description={data.description}
            locale={locale}
            tiles={tiles}
          />

          <div className='relative hidden h-full md:block'>
            {isTabletLayout ? (
              <TeamSectionDesktopTablet
                sideOffsetPx={layout.sideOffsetPx}
                description={data.description}
                locale={locale}
                tiles={tiles}
              />
            ) : (
              <TeamSectionDesktopWide
                sideOffsetPx={layout.sideOffsetPx}
                bottomOffsetPx={layout.bottomOffsetPx}
                headingToGridGapPx={layout.headingToGridGapPx}
                description={data.description}
                locale={locale}
                tiles={tiles}
              />
            )}
          </div>
        </div>
      )}
    </Container>
  )
}
