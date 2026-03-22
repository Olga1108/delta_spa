import { heroSocialLinks } from '../../model/constants'

type HeroSocialLinksProps = {
  className?: string
}

export const HeroSocialLinks = ({ className }: HeroSocialLinksProps) => {
  return (
    <div className={className} aria-label="Social links">
      {heroSocialLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="focus-visible:outline focus-visible:ring-2 focus-visible:ring-white"
          aria-label={item.label}
          onClick={(event) => event.preventDefault()}
        >
          <img
            src={item.icon}
            alt=""
            className="h-6 w-6 opacity-90 transition-opacity hover:opacity-100"
          />
        </a>
      ))}
    </div>
  )
}
