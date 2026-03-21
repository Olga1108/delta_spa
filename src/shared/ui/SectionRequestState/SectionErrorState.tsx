import { ParallelogramButton } from '@shared/ui/ParallelogramButton'

type SectionErrorStateProps = {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export const SectionErrorState = ({
  title,
  description,
  actionLabel,
  onAction,
}: SectionErrorStateProps) => {
  return (
    <div className="flex min-h-[min(32rem,70dvh)] w-full flex-col items-center justify-center px-4 text-center">
      <h2 className="max-w-[10ch] font-heading text-[2.5rem] font-[700] leading-[0.88] text-white md:text-[5rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-[36rem] text-base leading-6 text-white/80 md:text-lg">
        {description}
      </p>
      <ParallelogramButton
        onClick={onAction}
        width="min(100%, 330px)"
        className="mt-8 text-[18px] font-[700] tracking-[0.2em] text-[var(--color-black)] md:text-[20px]"
      >
        {actionLabel}
      </ParallelogramButton>
    </div>
  )
}
