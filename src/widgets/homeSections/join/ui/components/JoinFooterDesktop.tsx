import type { CSSProperties } from 'react'
import { LineArrow } from './LineArrow'

type JoinFooterDesktopProps = {
  desktopScale: number
  scalePx: (value: number) => string
  className?: string
  style?: CSSProperties
}

export const JoinFooterDesktop = ({
  desktopScale,
  scalePx,
  className,
  style,
}: JoinFooterDesktopProps) => {
  return (
    <div
      className={`flex items-end justify-between text-[var(--color-yellow)] ${className ?? 'absolute right-[30px] bottom-[20px] left-[30px]'}`}
      style={{ fontSize: scalePx(20), ...style }}
    >
      <div className="flex items-center gap-[10px]">
        <a
          href="#"
          className="px-[10px] font-heading font-[500] leading-none uppercase underline underline-offset-4"
        >
          INSTAGRAM
        </a>
        <a
          href="#"
          className="px-[10px] font-heading font-[500] leading-none uppercase underline underline-offset-4"
        >
          TELEGRAM
        </a>
        <a
          href="#"
          className="px-[10px] font-heading font-[500] leading-none uppercase underline underline-offset-4"
        >
          LINKEDIN
        </a>
      </div>

      <a
        href="#hero"
        className="flex items-center gap-[15px] px-[10px] font-heading font-[500] leading-none uppercase underline underline-offset-4"
      >
        Scroll to Top
        <span className="flex items-center">
          <LineArrow
            width={30 * desktopScale}
            color="var(--color-yellow)"
            strokeWidth={2.6}
            className="-rotate-90"
          />
        </span>
      </a>
    </div>
  )
}
