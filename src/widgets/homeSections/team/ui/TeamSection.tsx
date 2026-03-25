import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'
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
  const [isTeamHeaderSticky, setIsTeamHeaderSticky] = useState(true)
  const [viewportWidth, setViewportWidth] = useState(1280)
  const [layout, setLayout] = useState(() =>
    getTeamDesktopLayoutMetrics(typeof window !== 'undefined' ? window.innerWidth : 1280, 800),
  )

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

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      setViewportWidth(w)
      setLayout(getTeamDesktopLayoutMetrics(w, h))
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const isTabletLayout = isTeamTabletWidth(viewportWidth)

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
              ? 'md:min-h-0 md:h-full md:overflow-hidden md:pt-4 md:pb-8'
              : 'md:min-h-0 md:h-full md:py-10'
          }`}
        >
          <TeamSectionMobile
            isTeamHeaderSticky={isTeamHeaderSticky}
            description={data.description}
            locale={locale}
            tiles={tiles}
            benefitsLabel={translate('benefits.multiTasks')}
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
