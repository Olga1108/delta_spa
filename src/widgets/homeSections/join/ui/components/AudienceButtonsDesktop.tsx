import { audienceButtons } from '../constants'
import { LineArrow } from './LineArrow'

type AudienceButtonsDesktopProps = {
  activeAudience: number
  hoveredAudience: number | null
  setActiveAudience: (index: number) => void
  setHoveredAudience: (index: number | null) => void
  leftBlockScale: number
  scaleLeftPx: (value: number) => string
}

export const AudienceButtonsDesktop = ({
  activeAudience,
  hoveredAudience,
  setActiveAudience,
  setHoveredAudience,
  leftBlockScale,
  scaleLeftPx,
}: AudienceButtonsDesktopProps) => {
  return (
    <div
      data-anim="text"
      className="flex flex-col"
      style={{
        rowGap: scaleLeftPx(20),
      }}
    >
      {audienceButtons.map((item, index) => {
        const isHighlighted = index === activeAudience || index === hoveredAudience
        const arrowWidth = Math.max(38, 50 * leftBlockScale)
        const compressedRatio = Math.max(0, 0.9 - leftBlockScale)
        const arrowRightInset = Math.max(10, 57 * leftBlockScale - compressedRatio * 120)
        const textGap = Math.max(18, 20 * leftBlockScale - compressedRatio * 10)
        const textRightReserve = arrowRightInset + arrowWidth + textGap

        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => setHoveredAudience(index)}
            onMouseLeave={() => setHoveredAudience(null)}
            onFocus={() => setHoveredAudience(index)}
            onBlur={() => setHoveredAudience(null)}
            onClick={() => setActiveAudience(index)}
            className="relative flex items-center rounded-full font-heading transition-colors duration-200 ease-out"
            style={{
              width: `${((item.width / 511) * 100).toFixed(3)}%`,
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
              className="block overflow-hidden text-ellipsis whitespace-nowrap font-[500]"
              style={{
                fontSize: scaleLeftPx(28),
                lineHeight: scaleLeftPx(24),
                maxWidth: `calc(100% - ${textRightReserve.toFixed(3)}px)`,
              }}
            >
              {item.label}
            </span>
            <span
              className="absolute top-1/2 -translate-y-1/2"
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
