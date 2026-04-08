import { Container } from '@shared/ui/Container'
import { SectionErrorState } from '@shared/ui/SectionRequestState'

import { HomePageHeroBackdrop } from './HomePageHeroBackdrop'

type HomePageDataErrorProps = {
  title: string
  description: string
  actionLabel: string
  onRetry: () => void
}

export const HomePageDataError = ({
  title,
  description,
  actionLabel,
  onRetry,
}: HomePageDataErrorProps) => {
  return (
    <main className='relative flex min-h-dvh flex-col overflow-hidden bg-black text-white'>
      <HomePageHeroBackdrop />
      <Container fullWidth className='relative z-10 flex min-h-dvh flex-1 items-center justify-center py-12'>
        <SectionErrorState
          title={title}
          description={description}
          actionLabel={actionLabel}
          onAction={onRetry}
        />
      </Container>
    </main>
  )
}
