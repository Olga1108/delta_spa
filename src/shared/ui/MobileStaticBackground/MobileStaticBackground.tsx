import gridLines from '@shared/assets/Images/bg/hero-bg-grid-purple.svg'
import './mobileStaticBackground.css'

type MobileStaticBackgroundProps = {
  className?: string
}

export const MobileStaticBackground = ({ className = '' }: MobileStaticBackgroundProps) => (
  <div
    className={`mobile-static-bg pointer-events-none absolute inset-0 ${className}`.trim()}
    aria-hidden
  >
    <div className='mobile-static-bg__layer mobile-static-bg__base' />
    <div
      className='mobile-static-bg__layer mobile-static-bg__grid'
      style={{ backgroundImage: `url(${gridLines}), url(${gridLines})` }}
    />
    <div className='mobile-static-bg__layer mobile-static-bg__overlay mobile-static-bg__overlay--top' />
    <div className='mobile-static-bg__layer mobile-static-bg__overlay mobile-static-bg__overlay--bottom' />
  </div>
)
