import type { ComponentType } from 'react'
import type { FullPageSectionAnimationStrategy } from '@features/animations'
import {
  TeamSection,
  HeroSection,
  JoinSection,
  MultiplySection,
  teamSectionAnimationStrategy,
  heroSectionAnimationStrategy,
  joinSectionAnimationStrategy,
  multiplySectionAnimationStrategy,
} from '@widgets/homeSections'

export type HomeSectionConfig = {
  id: 'hero' | 'team' | 'multiply' | 'join'
  color: string
  Component: ComponentType
}

export const homeSections: HomeSectionConfig[] = [
  {
    id: 'hero',
    color: 'from-fuchsia-700 via-purple-700 to-purple-900',
    Component: HeroSection,
  },
  {
    id: 'team',
    color: 'from-indigo-700 via-indigo-800 to-slate-900',
    Component: TeamSection,
  },
  {
    id: 'multiply',
    color: 'from-[#dc8400] via-[#560080] to-[#220032]',
    Component: MultiplySection,
  },
  {
    id: 'join',
    color: 'from-[#dc8400] via-[#560080] to-[#220032]',
    Component: JoinSection,
  },
]

export const homeSectionIds = homeSections.map((section) => section.id)

export const homeSectionAnimationStrategies: Partial<
  Record<HomeSectionConfig['id'], FullPageSectionAnimationStrategy>
> = {
  hero: heroSectionAnimationStrategy,
  team: teamSectionAnimationStrategy,
  multiply: multiplySectionAnimationStrategy,
  join: joinSectionAnimationStrategy,
}
