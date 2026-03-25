import snakeImage from '@shared/assets/Images/hero/hero-image-05@1x.svg'
import { SectionMetaHeading } from '@widgets/homeSections/shared/ui/SectionMetaHeading'
import { benefitCardDesktopHeights, desktopLayout } from '../constants'

type MultiplyDesktopLayoutProps = {
  scalePx: (value: number) => string
  scaleFloatPx: (value: number) => string
  titleBeforeHighlight: string
  titleHighlight: string
  titleAfterHighlight: string
  description: string
  benefits: string[]
}

export const MultiplyDesktopLayout = ({
  scalePx,
  scaleFloatPx,
  titleBeforeHighlight,
  titleHighlight,
  titleAfterHighlight,
  description,
  benefits,
}: MultiplyDesktopLayoutProps) => {
  return (
    <div className='relative hidden h-full w-full md:block'>
      <div className='absolute inset-0 overflow-visible'>
        <SectionMetaHeading
          className='absolute text-center'
          as='h3'
          style={{
            top: `${desktopLayout.label.top}px`,
            right: `${desktopLayout.label.right}px`,
            fontSize: scalePx(30),
            lineHeight: scaleFloatPx(27),
          }}
        >
          MULTI-BENEFITS
        </SectionMetaHeading>

        <div
          className='absolute'
          style={{
            top: `${desktopLayout.left.top}px`,
            left: `${desktopLayout.left.left}px`,
            width: scalePx(desktopLayout.left.width),
          }}
        >
          <h2
            data-anim='title'
            className='font-heading font-[500] text-white'
            style={{ fontSize: scalePx(40), lineHeight: scalePx(40) }}
          >
            {titleBeforeHighlight}
            <span className='text-[var(--color-yellow)]'>{titleHighlight}</span>
            {titleAfterHighlight}
          </h2>
          <p
            data-anim='text'
            className='mt-5 font-heading font-[500] text-white'
            style={{
              width: scalePx(510),
              fontSize: scalePx(16),
              lineHeight: scalePx(24),
            }}
          >
            {description}
          </p>
        </div>

        <div
          className='absolute'
          style={{
            top: `${desktopLayout.right.top}px`,
            right: `${desktopLayout.right.right}px`,
            width: scalePx(desktopLayout.right.width),
          }}
        >
          <div className='relative'>
            <div
              className='pointer-events-none absolute z-10 flex items-center justify-center'
              style={{
                top: scalePx(desktopLayout.snake.top),
                left: scalePx(desktopLayout.snake.left),
                width: scalePx(desktopLayout.snake.size),
                height: scalePx(desktopLayout.snake.size),
              }}
            >
              <img src={snakeImage} alt='Purple snake' className='h-full w-full object-contain' />
            </div>

            <div className='relative z-20' style={{ rowGap: scalePx(20), display: 'grid' }}>
              {benefits.map((benefit, index) => (
                <p
                  key={benefit}
                  className='rounded-lg bg-[var(--color-purple-main)] font-heading font-[500] text-white transition-colors duration-200 ease-out md:hover:bg-[var(--color-yellow)] md:hover:text-[var(--color-black)]'
                  style={{
                    padding: scalePx(20),
                    fontSize: scalePx(20),
                    lineHeight: scalePx(24),
                    minHeight: scalePx(
                      benefitCardDesktopHeights[index] ?? benefitCardDesktopHeights.at(-1) ?? 64,
                    ),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
