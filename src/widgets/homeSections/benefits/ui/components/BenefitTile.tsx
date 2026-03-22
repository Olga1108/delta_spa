const benefitCardTitleClassName =
  'font-heading text-[28px] leading-[28px] font-bold tracking-normal text-[var(--color-yellow)] uppercase'

const benefitCardTextClassName =
  'mt-2 max-w-[27ch] font-body text-[20px] leading-[24px] font-normal tracking-normal text-white'

type BenefitTileProps = {
  title: string
  text: string
  variant: 'mobile' | 'desktop'
  dataAnim?: 'text'
}

export const BenefitTile = ({ title, text, variant, dataAnim }: BenefitTileProps) => {
  if (variant === 'mobile') {
    return (
      <article className="rounded-[8px] bg-[var(--color-purple-main)] px-3 py-4">
        <h3 className={benefitCardTitleClassName}>{title}</h3>
        <p className={benefitCardTextClassName}>{text}</p>
      </article>
    )
  }

  return (
    <article
      data-anim={dataAnim}
      className="h-full rounded-[10px] bg-[var(--color-purple-main)] p-5"
    >
      <h3 className={benefitCardTitleClassName}>{title}</h3>
      <p className={benefitCardTextClassName}>{text}</p>
    </article>
  )
}
