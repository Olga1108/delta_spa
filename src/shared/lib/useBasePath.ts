import { useLocation } from 'react-router-dom'

/** Pathname without hash — use for same-page anchors and logo home links. */
export const useBasePath = () => {
  const { pathname } = useLocation()
  return pathname.replace(/#.*$/, '') || '/'
}
