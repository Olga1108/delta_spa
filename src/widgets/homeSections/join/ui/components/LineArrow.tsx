type LineArrowProps = {
  color: string
  width: number
  strokeWidth?: number
  className?: string
}

export const LineArrow = ({ color, width, strokeWidth = 2.8, className = '' }: LineArrowProps) => {
  const height = (width * 22) / 50

  return (
    <svg
      viewBox='0 0 50 22'
      width={width}
      height={height}
      fill='none'
      aria-hidden='true'
      className={`shrink-0 ${className}`.trim()}
    >
      <path d='M1 11H46' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' />
      <path
        d='M35 1L46 11L35 21'
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
