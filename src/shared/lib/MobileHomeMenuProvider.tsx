import { useMemo, useState, type ReactNode } from 'react'
import { MobileHomeMenuContext } from './mobileHomeMenuContext'

export const MobileHomeMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  )
  return <MobileHomeMenuContext.Provider value={value}>{children}</MobileHomeMenuContext.Provider>
}
