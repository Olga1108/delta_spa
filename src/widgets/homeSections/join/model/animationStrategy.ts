import type { FullPageSectionAnimationStrategy } from '@features/animations'

export const joinSectionAnimationStrategy: FullPageSectionAnimationStrategy = {
  leave: ({ direction, timeline, at, targets }) => {
    if (targets.length === 0) {
      return
    }

    const sign = direction === 'down' ? 1 : -1
    timeline.to(
      targets,
      {
        autoAlpha: 0,
        y: -16 * sign,
        duration: 0.2,
        ease: 'power2.out',
        stagger: {
          each: 0.025,
          from: direction === 'down' ? 'start' : 'end',
        },
      },
      at,
    )
  },
  enter: ({ direction, timeline, at, targets }) => {
    if (targets.length === 0) {
      return
    }

    const sign = direction === 'down' ? 1 : -1
    timeline.fromTo(
      targets,
      {
        autoAlpha: 0,
        y: 24 * sign,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        ease: 'power2.out',
        stagger: {
          each: 0.04,
          from: direction === 'down' ? 'start' : 'end',
        },
      },
      at,
    )
  },
}
