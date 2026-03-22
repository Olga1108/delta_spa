import gridLines from '@shared/assets/Images/bg/hero-bg-grid-lines.svg'
import '../heroBackground.css'

export const HeroAnimatedBackground = () => {
  return (
    <div className="hero-bg pointer-events-none absolute inset-0" aria-hidden>
      <div className="hero-bg__layer hero-bg__base" />
      <div
        className="hero-bg__layer hero-bg__grid"
        style={{ backgroundImage: `url(${gridLines})` }}
      />
      <div className="hero-bg__layer hero-bg__overlay" />
    </div>
  )
}
