import type { MultiplySectionContent } from '@entities/multiply'
import snakeBottomImage from '@shared/assets/Images/hero/hero-decor-aqsu@1x.png'
import { SectionMetaHeading } from '@widgets/homeSections/shared/ui/SectionMetaHeading'
import { AudienceButtonsDesktop } from './AudienceButtonsDesktop'
import { JoinFooterDesktop } from './JoinFooterDesktop'
import { JoinInfoPanelDesktop } from './JoinInfoPanelDesktop'

type JoinDesktopLayoutProps = {
  items: MultiplySectionContent[]
  getAudienceLabel: (key: MultiplySectionContent['key']) => string
  desktopScale: number
  desktopContentTop: number
  activeAudience: number
  hoveredAudience: number | null
  setActiveAudience: (index: number) => void
  setHoveredAudience: (index: number | null) => void
  scalePx: (value: number) => string
  scaleFloatPx: (value: number) => string
  leftBlockScale: number
  scaleLeftPx: (value: number) => string
  rightTextSize: number
  rightArrowSize: number
  getCtaLabel: (key: MultiplySectionContent['key']) => string
}

export const JoinDesktopLayout = ({
  items,
  getAudienceLabel,
  desktopScale,
  desktopContentTop,
  activeAudience,
  hoveredAudience,
  setActiveAudience,
  setHoveredAudience,
  scalePx,
  scaleFloatPx,
  leftBlockScale,
  scaleLeftPx,
  rightTextSize,
  rightArrowSize,
  getCtaLabel,
}: JoinDesktopLayoutProps) => {
  const currentItem = items[activeAudience] ?? items[0]

  return (
    <div className='relative hidden h-full w-full md:block'>
      <SectionMetaHeading
        className='absolute'
        as='h3'
        style={{
          top: '20px',
          right: '30px',
          fontSize: scalePx(30),
          lineHeight: scaleFloatPx(27),
        }}
      >
        MULTIPLY WITH US
      </SectionMetaHeading>

      <div
        className='absolute grid items-start'
        style={{
          top: `${desktopContentTop}px`,
          left: '30px',
          right: '30px',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
          columnGap: scalePx(21),
        }}
      >
        <AudienceButtonsDesktop
          items={items}
          getAudienceLabel={getAudienceLabel}
          activeAudience={activeAudience}
          hoveredAudience={hoveredAudience}
          setActiveAudience={setActiveAudience}
          setHoveredAudience={setHoveredAudience}
          leftBlockScale={leftBlockScale}
          scaleLeftPx={scaleLeftPx}
        />
        <JoinInfoPanelDesktop
          desktopScale={desktopScale}
          scalePx={scalePx}
          rightTextSize={rightTextSize}
          rightArrowSize={rightArrowSize}
          step1={currentItem.step1}
          step2={currentItem.step2}
          ctaLabel={getCtaLabel(currentItem.key)}
        />
      </div>

      <img
        src={snakeBottomImage}
        alt=''
        aria-hidden='true'
        className='pointer-events-none absolute bottom-0 left-0 hidden w-[48.6875rem] max-w-none select-none 2xl:block'
      />

      <JoinFooterDesktop
        desktopScale={desktopScale}
        scalePx={scalePx}
        className='absolute right-[30px] bottom-[20px] left-[30px] flex items-end justify-between text-[var(--color-yellow)] 2xl:hidden'
      />

      <div
        className='absolute right-[30px] bottom-[20px] left-[30px] hidden items-end 2xl:grid'
        style={{
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 3fr)',
          columnGap: scalePx(21),
        }}
      >
        <div />
        <JoinFooterDesktop desktopScale={desktopScale} scalePx={scalePx} className='relative' />
      </div>
    </div>
  )
}
