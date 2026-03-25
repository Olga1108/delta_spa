import { useSyncExternalStore } from 'react'

export type ViewportSnapshot = {
  width: number
  height: number
}

const DEFAULT_VIEWPORT: ViewportSnapshot = {
  width: 1280,
  height: 720,
}

const getWindowViewport = (): ViewportSnapshot => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

let currentViewport: ViewportSnapshot =
  typeof window === 'undefined' ? DEFAULT_VIEWPORT : getWindowViewport()
const listeners = new Set<() => void>()
let isListening = false

const emit = () => {
  listeners.forEach((listener) => listener())
}

const updateViewport = () => {
  const nextViewport = getWindowViewport()
  if (nextViewport.width === currentViewport.width && nextViewport.height === currentViewport.height) {
    return
  }

  currentViewport = nextViewport
  emit()
}

const startListening = () => {
  if (isListening || typeof window === 'undefined') {
    return
  }

  isListening = true
  currentViewport = getWindowViewport()
  window.addEventListener('resize', updateViewport)
}

const stopListening = () => {
  if (!isListening || typeof window === 'undefined') {
    return
  }

  isListening = false
  window.removeEventListener('resize', updateViewport)
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  startListening()

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      stopListening()
    }
  }
}

const getSnapshot = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_VIEWPORT
  }

  const windowViewport = getWindowViewport()
  if (
    windowViewport.width !== currentViewport.width ||
    windowViewport.height !== currentViewport.height
  ) {
    currentViewport = windowViewport
  }

  return currentViewport
}

export const useViewport = () => useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_VIEWPORT)
