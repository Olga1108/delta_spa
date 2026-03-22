import type { ReactNode } from 'react'
import {
  FullPageNavigationContext,
  type FullPageNavigationContextValue,
} from '../model/fullPageNavigationContext'

type FullPageNavigationProviderProps = {
  children: ReactNode
  value: FullPageNavigationContextValue
}

export const FullPageNavigationProvider = ({
  children,
  value,
}: FullPageNavigationProviderProps) => (
  <FullPageNavigationContext.Provider value={value}>{children}</FullPageNavigationContext.Provider>
)
