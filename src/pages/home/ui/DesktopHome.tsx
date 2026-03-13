import { useRef } from 'react'
import { useFullPageEngine } from '@features/animations'
import { homeSectionAnimationStrategies, homeSectionIds, homeSections } from '../config/fullPageMock'

export const DesktopHome = () => {
  const viewportRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { activeIndex, isAnimating, goTo, next, prev } = useFullPageEngine({
    viewportRef,
    trackRef,
    sectionIds: homeSectionIds,
    sectionAnimationStrategies: homeSectionAnimationStrategies,
  })

  return (
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

      <aside className="absolute top-4 right-4 z-20 flex flex-col gap-3 rounded-2xl border border-white/20 bg-black/45 p-3 backdrop-blur-md">
        <div className="text-xs text-white/75">
          Section {activeIndex + 1} / {homeSections.length}
        </div>
        <div className="text-xs text-white/75">Animating: {isAnimating ? 'yes' : 'no'}</div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-lg border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-lg border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
          >
            Next
          </button>
        </div>
        <div className="flex gap-2">
          {homeSections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                activeIndex === index ? 'bg-white' : 'bg-white/30'
              }`}
              aria-label={`Go to ${section.id}`}
            />
          ))}
        </div>
      </aside>
    </main>
  )
}
