import { MultiplyMarqueeContent } from './MultiplyMarqueeContent'

type MultiplyMarqueeProps = {
  scalePx: (value: number) => string
  scaleFloatPx: (value: number) => string
}

export const MultiplyMarquee = ({ scalePx, scaleFloatPx }: MultiplyMarqueeProps) => {
  return (
    <div className="mt-8 md:absolute md:right-0 md:bottom-[44px] md:left-0 md:mt-0">
      <div className="overflow-hidden border-y-2 border-[var(--color-yellow)] py-2 md:w-[calc(100%+96px)] md:origin-center md:-translate-x-12 md:rotate-[2.2deg] md:py-0">
        <div
          className="section-marquee-track inline-flex h-full w-max items-center font-heading text-4xl font-[500] leading-none text-[var(--color-yellow)] md:text-[56px]"
          style={{
            height: scalePx(78),
            fontSize: scaleFloatPx(52.5),
            animationDuration: '15s',
          }}
        >
          <MultiplyMarqueeContent />
          <MultiplyMarqueeContent />
        </div>
      </div>
    </div>
  )
}
