import { useCallback, useRef } from 'react'
import { FullPageNavigationProvider, useFullPageEngine } from '@features/animations'
import {
  homeSectionAnimationStrategies,
  homeSectionIds,
  homeSections,
} from '../config/fullPageMock'

export const DesktopHome = () => {
  const viewportRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { activeIndex, goTo } = useFullPageEngine({
    viewportRef,
    trackRef,
    sectionIds: homeSectionIds,
    sectionAnimationStrategies: homeSectionAnimationStrategies,
  })

  const goToSectionId = useCallback(
    (id: string) => {
      const index = homeSectionIds.findIndex((sectionId) => sectionId === id)
      if (index !== -1) {
        goTo(index)
      }
    },
    [goTo],
  )

  return (
    <FullPageNavigationProvider value={{ goToSectionId }}>
      <main ref={viewportRef} className="relative h-dvh overflow-hidden bg-black text-white">
        <div ref={trackRef} className="will-change-transform">
          {homeSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              data-active={activeIndex === index}
              className={`relative flex h-dvh items-center bg-linear-to-b ${section.color}`}
            >
              <section.Component />
            </section>
          ))}
        </div>
      </main>
    </FullPageNavigationProvider>
  )
}
