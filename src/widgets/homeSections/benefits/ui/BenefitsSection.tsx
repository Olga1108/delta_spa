import { useTasksQuery } from '@entities/task'
import { useDictionary } from '@shared/lib/dictionary'
import { Container } from '@shared/ui/Container'
import { SectionErrorState, SectionLoadingState } from '@shared/ui/SectionRequestState'
import { BenefitTile } from './components/BenefitTile'
import { SnakeIntroCard } from './components/SnakeIntroCard'

export const BenefitsSection = () => {
  const { locale, translate } = useDictionary()
  const { data, isLoading, isError, refetch } = useTasksQuery(locale)
  const tiles = data ? data.tiles.slice(0, 5) : []

  return (
    <Container
      fullWidth
      className="relative h-full w-full self-start pt-0 pb-8 md:h-full md:self-stretch md:py-0"
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
        <div className="relative -mx-[var(--container-padding-x)] px-[var(--container-padding-x)] py-7 md:h-full md:self-stretch md:py-10 bg-[linear-gradient(64.6deg,#9500DC_17.61%,#560080_57.18%,#220032_88.56%)] md:bg-[linear-gradient(111.06deg,#14091A_-3.49%,#14091A_49.69%,#220032_91.86%)]">
          <div className="md:hidden">
            <SnakeIntroCard description={data.description} locale={locale} variant="mobile" />

            <div className="mt-4 space-y-4">
              {tiles.map((item, index) => (
                <BenefitTile
                  key={`${item.title}-${index}`}
                  title={item.title}
                  text={item.text}
                  variant="mobile"
                />
              ))}
            </div>

            <div className="mt-5 border-t border-white/25 pt-5">
              <p className="text-center font-heading text-[36px] leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase">
                {translate('benefits.multiTasks')}
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <p
              data-anim="meta"
              className="mb-4 text-right font-heading text-2xl leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase"
            >
              {translate('benefits.multiTasks')}
            </p>

            <div className="grid h-[calc(100%-2.5rem)] min-h-[34rem] grid-cols-[1.12fr_1.12fr_0.82fr] [grid-template-rows:repeat(6,minmax(0,1fr))] gap-3">
              <SnakeIntroCard description={data.description} locale={locale} variant="desktop" />

              <div className="row-span-6 grid h-full grid-rows-2 gap-3">
                {tiles.slice(0, 2).map((item, index) => (
                  <BenefitTile
                    key={`${item.title}-${index}`}
                    title={item.title}
                    text={item.text}
                    variant="desktop"
                    dataAnim="text"
                  />
                ))}
              </div>

              <div className="row-span-6 grid h-full grid-rows-3 gap-3">
                {tiles.slice(2, 5).map((item, index) => (
                  <BenefitTile
                    key={`${item.title}-${index}`}
                    title={item.title}
                    text={item.text}
                    variant="desktop"
                    dataAnim="text"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
