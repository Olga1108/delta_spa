export const getAnimPart = (section: HTMLElement, key: 'meta' | 'title' | 'text') =>
  section.querySelector<HTMLElement>(`[data-anim="${key}"]`)

export const compact = <T>(items: Array<T | null | undefined>): T[] =>
  items.filter((item): item is T => Boolean(item))

export const getNamedTargets = (section: HTMLElement) => {
  const meta = getAnimPart(section, 'meta')
  const title = getAnimPart(section, 'title')
  const text = getAnimPart(section, 'text')

  return { meta, title, text }
}
