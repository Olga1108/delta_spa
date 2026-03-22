import { useState } from 'react'
import { HeroMobileMenu } from '@widgets/homeSections/hero'
import { Container } from '@shared/ui/Container'
import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          className={`relative flex min-h-dvh items-stretch py-0 bg-linear-to-b ${section.color}`}
        >
          <section.Component />
        </section>
      ))}
    </main>
  )
}
