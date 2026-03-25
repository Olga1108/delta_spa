import { createContext } from 'react'

export type MobileHomeMenuContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const MobileHomeMenuContext = createContext<MobileHomeMenuContextValue | null>(null)
