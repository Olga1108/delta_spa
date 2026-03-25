import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'

type ParallelogramButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode
  width?: number | string
  height?: number | string
  faceHeight?: number | string
  sideWidth?: number | string
}

const toCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value)

export const ParallelogramButton = ({
  children,
  width = 330,
  height = 82,
  faceHeight = 72,
  sideWidth = 10,
  className = '',
  style,
  ...rest
}: ParallelogramButtonProps) => {
  void faceHeight
  void sideWidth

  const rootStyle: CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(height),
    ...style,
  }

  return (
    <button
      type="button"
      className={`group relative inline-flex cursor-pointer items-center justify-center font-heading uppercase ${className}`.trim()}
      style={rootStyle}
      {...rest}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 280 82"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0 8.60855L20.0789 0H280L270.451 8.60855H0Z"
          className="fill-[#e6d66b] transition-colors duration-200 ease-out group-hover:fill-[#181419]"
        />
        <path
          d="M0 8.60855H270.451V82H0V8.60855Z"
          className="fill-[var(--color-yellow)] transition-colors duration-200 ease-out group-hover:fill-[var(--color-black)]"
        />
        <path
          d="M270.451 8.60855L280 0V76.3355L270.451 82V8.60855Z"
          className="fill-[#eadb76] transition-colors duration-200 ease-out group-hover:fill-[#1f1823]"
        />
        <path
          d="M0 8.60855V82H270.451M0 8.60855C0 8.60855 164.833 8.60855 270.451 8.60855M0 8.60855L20.0789 0H280M270.451 82C270.451 82 270.451 38.0507 270.451 8.60855M270.451 82L280 76.3355V0M270.451 8.60855C274.18 6.02775 280 0 280 0"
          className="stroke-[var(--color-black)] transition-colors duration-200 ease-out group-hover:stroke-[var(--color-yellow)]"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M0 8.60855V82M0 82H270.451M20.0789 0H280"
          className="stroke-[var(--color-black)] transition-colors duration-200 ease-out group-hover:stroke-[var(--color-yellow)]"
          strokeWidth="3.4"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="relative z-10 transition-colors font-[500] duration-200 ease-out group-hover:text-[var(--color-yellow)]">
        {children}
      </span>
    </button>
  )
}
