import logoMain from '@shared/assets/Images/icons/logo-main.svg'
import { MultiplyMarquee } from './MultiplyMarquee'

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
      <div className="flex items-start justify-between">
        <img src={logoMain} alt="CPA logo" className="h-auto w-[26px]" />
        <button
          type="button"
          className="font-heading text-base font-[700] text-[var(--color-yellow)] uppercase underline underline-offset-4"
        >
          Menu
        </button>
      </div>

      <div className="mt-8">
        <h2 className="max-w-[359px] font-heading text-[32px] font-[700] leading-[0.9] tracking-[-0.02em] text-white">
          {titleBeforeHighlight}
          <span className="text-[var(--color-yellow)]">{titleHighlight}</span>
          {titleAfterHighlight}
        </h2>
        <p className="mt-4 max-w-[330px] font-heading text-base leading-5 font-[500] text-white">
          {description}
        </p>
      </div>

      <div className="mt-10 -mx-4">
        <MultiplyMarquee mobile scalePx={() => '0px'} scaleFloatPx={() => '0px'} />
      </div>

      <div className="mt-12 space-y-9">
        {benefits.map((benefit) => (
          <p
            key={benefit}
            className="rounded-lg bg-[var(--color-purple-main)] px-4 py-4 font-heading text-[20px] font-[700] leading-6 text-white"
          >
            {benefit}
          </p>
        ))}
      </div>
    </div>
  )
}
