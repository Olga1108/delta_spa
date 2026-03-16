import { Container } from '@shared/ui/Container'

export const MultiplySectionMock = () => {
  return (
    <Container fullWidth>
      <p data-anim="meta" className="text-xs tracking-[0.18em] uppercase text-white/70">
        multiply
      </p>
      <h2 data-anim="title" className="mt-3 font-heading text-5xl leading-tight md:text-7xl">
        Multiply Section
      </h2>
      <p data-anim="text" className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
        Mock section for multiply flow and related interactions.
      </p>
    </Container>
  )
}
