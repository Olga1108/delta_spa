type MultiplyMobileLayoutProps = {
  titleBeforeHighlight: string
  titleHighlight: string
  titleAfterHighlight: string
  description: string
  benefits: string[]
}

export const MultiplyMobileLayout = ({
  titleBeforeHighlight,
  titleHighlight,
  titleAfterHighlight,
  description,
  benefits,
}: MultiplyMobileLayoutProps) => {
  return (
    <div className="md:hidden">
      <h2 className="font-heading text-4xl font-[500] leading-[0.95] text-white">
        {titleBeforeHighlight}
        <span className="text-[var(--color-yellow)]">{titleHighlight}</span>
        {titleAfterHighlight}
      </h2>
      <p className="mt-4 max-w-[510px] font-heading text-base leading-6 font-[500] text-white">{description}</p>
      <div className="mt-6 space-y-3">
        {benefits.map((benefit) => (
          <p
            key={benefit}
            className="rounded-lg bg-[var(--color-purple-main)] p-4 font-heading text-xl font-[500] leading-6 text-white"
          >
            {benefit}
          </p>
        ))}
      </div>
    </div>
  )
}
