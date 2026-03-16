import type { FullPageSectionAnimationStrategy } from '@features/animations'
import { getNamedTargets } from '../../lib/getNamedTargets'

export const benefitsSectionAnimationStrategy: FullPageSectionAnimationStrategy = {
  leave: ({ direction, timeline, at, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1

    if (meta) {
      timeline.to(meta, { autoAlpha: 0, x: -24 * sign, duration: 0.2, ease: 'power2.out' }, at)
    }

    if (title) {
      timeline.to(title, { autoAlpha: 0, y: -18 * sign, duration: 0.22, ease: 'power2.out' }, at + 0.02)
    }

    if (text) {
      timeline.to(text, { autoAlpha: 0, x: 28 * sign, duration: 0.2, ease: 'power2.out' }, at + 0.04)
    }
  },
  enter: ({ direction, timeline, at, targets, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1

    if (meta) {
      timeline.fromTo(
        meta,
        { autoAlpha: 0, x: -36 * sign },
        { autoAlpha: 1, x: 0, duration: 0.28, ease: 'power2.out' },
        at,
      )
    }

    if (title) {
      timeline.fromTo(
        title,
        { autoAlpha: 0, y: 34 * sign },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        at + 0.06,
      )
    }

    if (text) {
      timeline.fromTo(
        text,
        { autoAlpha: 0, x: 40 * sign },
        { autoAlpha: 1, x: 0, duration: 0.34, ease: 'power2.out' },
        at + 0.12,
      )
    }

    if (!meta && !title && !text && targets.length > 0) {
      timeline.fromTo(
        targets,
        { autoAlpha: 0, x: 32 * sign },
        { autoAlpha: 1, x: 0, duration: 0.36, ease: 'power2.out', stagger: 0.04 },
        at,
      )
    }
  },
}
