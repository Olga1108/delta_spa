import type { ComponentType } from 'react'
import type { FullPageSectionAnimationStrategy } from '@features/animations'
import {
  BenefitsSectionMock,
  HeroSectionMock,
  JoinSection,
  MultiplySection,
  benefitsSectionAnimationStrategy,
  heroSectionAnimationStrategy,
  joinSectionAnimationStrategy,
  multiplySectionAnimationStrategy,
} from '@widgets/homeSections'

export type HomeSectionConfig = {
  id: 'hero' | 'benefits' | 'multiply' | 'join'
  color: string
  Component: ComponentType
}

export const homeSections: HomeSectionConfig[] = [
  {
    id: 'hero',
    color: 'from-fuchsia-700 via-purple-700 to-purple-900',
    Component: HeroSectionMock,
  },
  {
    id: 'benefits',
    color: 'from-indigo-700 via-indigo-800 to-slate-900',
    Component: BenefitsSectionMock,
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
  benefits: benefitsSectionAnimationStrategy,
  multiply: multiplySectionAnimationStrategy,
  join: joinSectionAnimationStrategy,
}
