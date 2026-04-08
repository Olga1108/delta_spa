import { MobileHomeMenuProvider } from '@shared/lib/MobileHomeMenuProvider'
import { HeroMobileMenuOverlay } from '@widgets/homeSections/hero'
import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
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
