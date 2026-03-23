import gridLines from '@shared/assets/Images/bg/hero-bg-grid-lines.svg'
import './animatedBackground.css'

export const AnimatedBackground = () => {
  return (
    <div className="animated-bg pointer-events-none absolute inset-0" aria-hidden>
      <div className="animated-bg__layer animated-bg__base" />
      <div
        className="animated-bg__layer animated-bg__grid"
        style={{ backgroundImage: `url(${gridLines})` }}
      />
      <div className="animated-bg__layer animated-bg__overlay" />
    </div>
  )
}
