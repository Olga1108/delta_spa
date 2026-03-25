import gridLines from '@shared/assets/Images/bg/hero-bg-grid-purple.svg'
import './animatedBackground.css'

export type AnimatedBackgroundVariant = 'default' | 'mobile' | 'team'

type AnimatedBackgroundProps = {
  variant?: AnimatedBackgroundVariant
  className?: string
}

const animatedBackgroundVariantClass: Record<AnimatedBackgroundVariant, string> = {
  default: 'animated-bg--default',
  mobile: 'animated-bg--mobile',
  team: 'animated-bg--team',
}

export const AnimatedBackground = ({
  variant = 'default',
  className = '',
}: AnimatedBackgroundProps) => {
  const variantClass = animatedBackgroundVariantClass[variant]

  return (
    <div
      className={`animated-bg ${variantClass} pointer-events-none absolute inset-0 ${className}`.trim()}
      aria-hidden
    >
      <div className='animated-bg__layer animated-bg__base' />
      <div
        className='animated-bg__layer animated-bg__grid'
        style={{ backgroundImage: `url(${gridLines})` }}
      />
      <div className='animated-bg__layer animated-bg__overlay' />
    </div>
  )
}
