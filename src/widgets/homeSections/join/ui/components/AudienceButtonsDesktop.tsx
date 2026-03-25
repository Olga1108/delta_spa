import type { MultiplySectionContent } from '@entities/multiply'
import { getAudienceTabId, handleAudienceTabKeyDown } from '../lib/audienceTabs'
import { LineArrow } from './LineArrow'

type AudienceButtonsDesktopProps = {
  items: MultiplySectionContent[]
  getAudienceLabel: (key: MultiplySectionContent['key']) => string
  activeAudience: number
  hoveredAudience: number | null
  setActiveAudience: (index: number) => void
  setHoveredAudience: (index: number | null) => void
  leftBlockScale: number
  scaleLeftPx: (value: number) => string
  panelId: string
}

export const AudienceButtonsDesktop = ({
  items,
  getAudienceLabel,
  activeAudience,
  hoveredAudience,
  setActiveAudience,
  setHoveredAudience,
  leftBlockScale,
  scaleLeftPx,
  panelId,
}: AudienceButtonsDesktopProps) => {
  return (
    <div
      data-anim='text'
      className='flex flex-col'
      role='tablist'
      aria-label='Audience categories'
      aria-orientation='vertical'
      style={{
        rowGap: scaleLeftPx(20),
      }}
    >
      {items.map((item, index) => {
        const isHighlighted = index === activeAudience || index === hoveredAudience
        const isSelected = index === activeAudience
        const arrowWidth = Math.max(38, 50 * leftBlockScale)
        const compressedRatio = Math.max(0, 0.9 - leftBlockScale)
        const arrowRightInset = Math.max(10, 57 * leftBlockScale - compressedRatio * 120)
        const textGap = Math.max(18, 20 * leftBlockScale - compressedRatio * 10)
        const textRightReserve = arrowRightInset + arrowWidth + textGap
        const tabId = getAudienceTabId(item.key)

        return (
          <button
            key={tabId}
            id={tabId}
            type='button'
            role='tab'
            aria-selected={isSelected}
            aria-controls={panelId}
            tabIndex={isSelected ? 0 : -1}
            onMouseEnter={() => setHoveredAudience(index)}
            onMouseLeave={() => setHoveredAudience(null)}
            onFocus={() => setHoveredAudience(index)}
            onBlur={() => setHoveredAudience(null)}
            onClick={() => setActiveAudience(index)}
            onKeyDown={(event) =>
              handleAudienceTabKeyDown({
                event,
                index,
                items,
                setActiveAudience,
                setHoveredAudience,
              })
            }
            className='relative flex cursor-pointer items-center rounded-full font-heading transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-purple-main)]'
            style={{
              width: `${((item.buttonWidth / 511) * 100).toFixed(3)}%`,
              height: scaleLeftPx(80),
              paddingLeft: scaleLeftPx(57),
              borderStyle: 'solid',
              borderWidth: `${(2.5 * leftBlockScale).toFixed(3)}px`,
              borderColor: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
              backgroundColor: isHighlighted ? 'var(--color-yellow)' : 'transparent',
              color: isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)',
            }}
          >
            <span
              className='block overflow-hidden text-ellipsis whitespace-nowrap font-[500]'
              style={{
                fontSize: scaleLeftPx(28),
                lineHeight: scaleLeftPx(30),
                maxWidth: `calc(100% - ${textRightReserve.toFixed(3)}px)`,
              }}
            >
              {getAudienceLabel(item.key)}
            </span>
            <span
              className='absolute top-1/2 -translate-y-1/2'
              style={{ right: `${arrowRightInset.toFixed(3)}px` }}
            >
              <LineArrow
                width={arrowWidth}
                color={isHighlighted ? 'var(--color-black)' : 'var(--color-yellow)'}
                strokeWidth={3}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
