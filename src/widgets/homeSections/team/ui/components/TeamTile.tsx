const teamCardTitleClassName =
  'font-heading text-[28px] leading-[28px] font-bold tracking-normal text-[var(--color-yellow)] uppercase'

const teamCardTextClassName =
  'mt-2 max-w-[27ch] font-body text-[20px] leading-[24px] font-normal tracking-normal text-white md:max-w-[20ch] md:text-[18px] md:leading-[22px] xl:max-w-[27ch] xl:text-[20px] xl:leading-[24px]'

type TeamTileProps = {
  title: string
  text: string
  variant: 'mobile' | 'desktop'
  dataAnim?: 'text'
  className?: string
  titleClassName?: string
  textClassName?: string
}

export const TeamTile = ({
  title,
  text,
  variant,
  dataAnim,
  className,
  titleClassName,
  textClassName,
}: TeamTileProps) => {
  if (variant === 'mobile') {
    return (
      <article className={`rounded-[8px] bg-[var(--color-purple-main)] px-3 py-4 ${className ?? ''}`.trim()}>
        <h3 className={titleClassName ?? teamCardTitleClassName}>{title}</h3>
        <p className={textClassName ?? teamCardTextClassName}>{text}</p>
      </article>
    )
  }

  return (
    <article
      data-anim={dataAnim}
      className={`h-full rounded-[10px] bg-[var(--color-purple-main)] p-5 ${className ?? ''}`.trim()}
    >
      <h3 className={titleClassName ?? teamCardTitleClassName}>{title}</h3>
      <p className={textClassName ?? teamCardTextClassName}>{text}</p>
    </article>
  )
}
