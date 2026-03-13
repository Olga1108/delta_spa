import type { FullPageSectionAnimationStrategy } from '@features/animations'
import { compact, getNamedTargets } from '../../lib/getNamedTargets'

export const multiplySectionAnimationStrategy: FullPageSectionAnimationStrategy = {
  leave: ({ direction, timeline, at, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1
    const content = compact([title, text])

    if (meta) {
      timeline.to(meta, { autoAlpha: 0, y: -10 * sign, duration: 0.16, ease: 'power2.out' }, at)
    }

    if (content.length > 0) {
      timeline.to(
        content,
        {
          autoAlpha: 0,
          y: -22 * sign,
          scale: 0.985,
          duration: 0.24,
          ease: 'power2.inOut',
          stagger: 0.04,
        },
        at + 0.03,
      )
    }
  },
  enter: ({ direction, timeline, at, targets, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1

    if (title) {
      timeline.fromTo(
        title,
        { autoAlpha: 0, y: 52 * sign, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.54, ease: 'power4.out' },
        at,
      )
    }

    if (text) {
      timeline.fromTo(
        text,
        { autoAlpha: 0, y: 34 * sign, skewY: 1.5 * sign },
        { autoAlpha: 1, y: 0, skewY: 0, duration: 0.42, ease: 'power3.out' },
        at + 0.1,
      )
    }

    if (meta) {
      timeline.fromTo(
        meta,
        { autoAlpha: 0, y: 18 * sign },
        { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' },
        at + 0.14,
      )
    }

    if (!meta && !title && !text && targets.length > 0) {
      timeline.fromTo(
        targets,
        { autoAlpha: 0, y: 42 * sign, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.44, ease: 'power3.out', stagger: 0.05 },
        at,
      )
    }
  },
}
