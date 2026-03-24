type JoinInfoPanelDesktopProps = {
  desktopScale: number
  scalePx: (value: number) => string
  rightTextSize: number
  rightArrowSize: number
  step1: string
  step2: string
  ctaLabel: string
}

import { ParallelogramButton } from '@shared/ui/ParallelogramButton'
import { LineArrow } from './LineArrow'

export const JoinInfoPanelDesktop = ({
  desktopScale,
  scalePx,
  rightTextSize,
  rightArrowSize,
  step1,
  step2,
  ctaLabel,
}: JoinInfoPanelDesktopProps) => {
  return (
    <div
      data-anim='title'
      className='rounded-xl'
      style={{
        width: '100%',
        height: scalePx(512),
        padding: scalePx(20),
        backgroundImage: 'linear-gradient(133.8deg, #a30ee9 5.95%, #8a00cc 98.41%)',
      }}
    >
      <div
        className='mx-auto flex flex-col items-center text-center'
        style={{
          width: '100%',
          maxWidth: scalePx(560),
          paddingTop: scalePx(81),
          rowGap: scalePx(16),
        }}
      >
        <p
          className='font-heading font-[500] text-white'
          style={{
            fontSize: `${rightTextSize}px`,
            lineHeight: scalePx(24),
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {step1}
        </p>

        <LineArrow
          width={rightArrowSize}
          color='var(--color-black)'
          strokeWidth={2.4}
          className='rotate-90'
        />

        <p
          className='font-heading font-[500] text-white'
          style={{
            fontSize: `${rightTextSize}px`,
            lineHeight: scalePx(24),
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {step2}
        </p>

        <LineArrow
          width={rightArrowSize}
          color='var(--color-black)'
          strokeWidth={2.4}
          className='rotate-90'
        />

        <ParallelogramButton
          className='mt-[2px] text-[var(--color-black)]'
          width={330 * desktopScale}
          height={82 * desktopScale}
          faceHeight={72 * desktopScale}
          sideWidth={10 * desktopScale}
          style={{
            fontSize: scalePx(20),
            letterSpacing: scalePx(4),
          }}
        >
          {ctaLabel}
        </ParallelogramButton>
      </div>
    </div>
  )
}
