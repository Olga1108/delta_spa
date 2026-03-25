import type { UiLocale } from '@shared/config/locales'
import { HeroMobileMenuBar } from '@widgets/homeSections/hero'
import { SnakeIntroCard } from './components/SnakeIntroCard'
import type { TeamSectionTile } from '../lib/teamSectionTypes'
import { TeamTile } from './components/TeamTile'

type TeamSectionMobileProps = {
  isTeamHeaderSticky: boolean
  description: string
  locale: UiLocale
  tiles: TeamSectionTile[]
}

export const TeamSectionMobile = ({
  isTeamHeaderSticky,
  description,
  locale,
  tiles
}: TeamSectionMobileProps) => (
  <div className='flex flex-col md:hidden'>
    <div
      className={`z-30 -mx-[var(--container-padding-x)] px-[var(--container-padding-x)] py-3 bg-[var(--color-purple-dark)] ${
        isTeamHeaderSticky ? 'sticky top-0' : 'relative'
      }`}
    >
      <HeroMobileMenuBar barClassName='!pt-0 !pb-0' />
    </div>

    <SnakeIntroCard description={description} locale={locale} variant='mobile' />

    <div className='mt-4 space-y-4'>
      {tiles.map((item, index) => (
        <TeamTile key={`${item.title}-${index}`} title={item.title} text={item.text} variant='mobile' />
      ))}
    </div>

    <div className='mt-5 border-t border-white/25 pt-5'>
      <p className='text-center font-heading text-[36px] leading-none font-medium tracking-tight text-[var(--color-yellow)] uppercase'>
        MULTI-TASKS
      </p>
    </div>
  </div>
)
