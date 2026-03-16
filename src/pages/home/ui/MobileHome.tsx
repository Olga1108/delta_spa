import { homeSections } from '../config/fullPageMock'

export const MobileHome = () => {
  return (
    <main className="bg-black text-white">
      {homeSections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative flex min-h-dvh items-center py-16 bg-linear-to-b ${section.color}`}
        >
          <section.Component />
        </section>
      ))}
    </main>
  )
}
