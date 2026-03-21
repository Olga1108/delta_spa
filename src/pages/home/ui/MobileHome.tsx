import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
  return (
    <main className="bg-black text-white">
      {homeSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative flex min-h-dvh bg-linear-to-b ${section.color} ${
            section.id === 'hero' ? 'items-stretch py-0' : 'items-center py-16'
          }`}
        >
          <section.Component />
        </section>
      ))}
    </main>
  )
}
