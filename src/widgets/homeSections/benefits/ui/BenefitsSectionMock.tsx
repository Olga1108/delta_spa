import { Container } from '@shared/ui/Container'

export const BenefitsSectionMock = () => {
  return (
    <Container fullWidth>
      <p data-anim="meta" className="text-xs tracking-[0.18em] uppercase text-white/70">
        benefits
      </p>
      <h2 data-anim="title" className="mt-3 font-heading text-5xl leading-tight md:text-7xl">
        Benefits Section
      </h2>
      <p data-anim="text" className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
        Mock section for API-driven benefits content.
      </p>
    </Container>
  )
}
