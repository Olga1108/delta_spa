import { createContext, useContext } from 'react'

export type FullPageNavigationContextValue = {
  /** Navigate by section id (must match `homeSectionIds`). Updates URL hash via the full-page engine after animation. */
  goToSectionId: (id: string) => void
}

export const FullPageNavigationContext = createContext<FullPageNavigationContextValue | null>(null)

export const useFullPageNavigation = () => useContext(FullPageNavigationContext)
