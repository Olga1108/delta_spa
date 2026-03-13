import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

/** Mobile-first: base padding for small screens, scales up at 768px and 1280px. */
type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  /** Use full viewport width (no max-width); only horizontal padding applied */
  fullWidth?: boolean
}

const baseClasses =
  'w-full mx-auto px-[var(--container-padding-x)] max-w-[var(--container-max-width)]'
const fullWidthClasses = 'max-w-none'

export function Container({
  children,
  fullWidth = false,
  className = '',
  ...rest
}: ContainerProps) {
  const containerClass = fullWidth ? `${baseClasses} ${fullWidthClasses}` : baseClasses
  return (
    <div className={`${containerClass} ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
