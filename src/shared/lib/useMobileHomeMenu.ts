import { useContext, useState } from 'react'
import { MobileHomeMenuContext } from './mobileHomeMenuContext'

/** `null` when used outside `MobileHomeMenuProvider` (e.g. desktop home page). */
export const useMobileHomeMenu = () => useContext(MobileHomeMenuContext)

/**
 * Shared open/close for mobile menu. Uses provider state on mobile home;
 */
export const useMobileMenuOpenState = () => {
  const ctx = useMobileHomeMenu()
  const [localOpen, setLocalOpen] = useState(false)
  return {
    isOpen: ctx?.isOpen ?? localOpen,
    onOpen: () => {
      if (ctx) {
        ctx.open()
      } else {
        setLocalOpen(true)
      }
    },
    onClose: () => {
      if (ctx) {
        ctx.close()
      } else {
        setLocalOpen(false)
      }
    },
  }
}
