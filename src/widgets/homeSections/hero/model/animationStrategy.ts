import type { FullPageSectionAnimationStrategy } from '@features/animations'
import { compact, getNamedTargets } from '../../lib/getNamedTargets'

export const heroSectionAnimationStrategy: FullPageSectionAnimationStrategy = {
  leave: ({ direction, timeline, at, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1
    const secondary = compact([meta, text])

    if (title) {
      timeline.to(
        title,
        {
          autoAlpha: 0,
          y: -26 * sign,
          scale: 0.98,
          duration: 0.28,
          ease: 'power2.inOut',
        },
        at,
      )
    }

    if (secondary.length > 0) {
      timeline.to(
        secondary,
        {
          autoAlpha: 0,
          y: -14 * sign,
          duration: 0.2,
          ease: 'power2.out',
          stagger: 0.03,
        },
        at,
      )
    }
  },
  enter: ({ direction, timeline, at, targets, section }) => {
    const { meta, title, text } = getNamedTargets(section)
    const sign = direction === 'down' ? 1 : -1
    const secondary = compact([meta, text])

    if (title) {
      timeline.fromTo(
        title,
        {
          autoAlpha: 0,
          y: 62 * sign,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          ease: 'power4.out',
        },
        at,
      )
    }

    if (secondary.length > 0) {
      timeline.fromTo(
        secondary,
        {
          autoAlpha: 0,
          y: 30 * sign,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
          stagger: 0.06,
        },
        at + 0.08,
      )
    }

    if (!title && secondary.length === 0 && targets.length > 0) {
      timeline.fromTo(
        targets,
        { autoAlpha: 0, y: 36 * sign },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.04 },
        at,
      )
    }
  },
}
