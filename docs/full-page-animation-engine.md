# Full-Page Animation Engine (Home)

## Purpose

Document how desktop full-page transitions are implemented with GSAP, how section-specific animation strategies are organized in FSD, and how desktop/mobile home layouts are split.

## Scope

- **In scope:** `useFullPageEngine`, section transition strategies, desktop vs mobile home composition, hash navigation behavior.
- **Out of scope:** Final production section content and visual polish from Figma animation page.

## Architecture

- `src/features/animations/model/useFullPageEngine.ts`
  - Generic full-page transition engine (wheel/touch observer, transition timeline, URL hash sync, reduced-motion fallback).
  - Does not contain section-specific business UI.
- `src/pages/home/ui/DesktopHome.tsx`
  - Uses `useFullPageEngine`.
  - Renders sections as full-height screens.
  - Applies section strategy registry from page config.
- `src/pages/home/ui/MobileHome.tsx`
  - No full-page engine.
  - Renders the same section widgets in normal vertical flow.
- `src/pages/home/config/fullPageMock.ts`
  - Page-level registry: section order, colors, component mapping, strategy mapping.
- `src/widgets/homeSections/*`
  - One widget per section (`hero`, `benefits`, `multiply`, `join`).
  - Section UI and section animation strategy are colocated.

## Usage

1. Desktop path:
   - `HomePage` selects `DesktopHome` for widths above mobile breakpoint.
   - `DesktopHome` passes `sectionIds` + `sectionAnimationStrategies` to `useFullPageEngine`.
2. Mobile path:
   - `HomePage` selects `MobileHome` on mobile breakpoint.
   - `MobileHome` renders same section widgets without full-page transitions.
3. Add a new section:
   - Create widget in `src/widgets/homeSections/<section>/ui`.
   - Create its strategy in `src/widgets/homeSections/<section>/model/animationStrategy.ts`.
   - Register component/id/strategy in `src/pages/home/config/fullPageMock.ts`.

## Examples

```ts
const { activeIndex } = useFullPageEngine({
  viewportRef,
  trackRef,
  sectionIds: homeSectionIds,
  sectionAnimationStrategies: homeSectionAnimationStrategies,
})
```

```ts
export const homeSectionAnimationStrategies = {
  hero: heroSectionAnimationStrategy,
  benefits: benefitsSectionAnimationStrategy,
  multiply: multiplySectionAnimationStrategy,
  join: joinSectionAnimationStrategy,
}
```

## Decisions and Tradeoffs

- Engine is generic, strategies are section-specific:
  - Keeps transition mechanics reusable.
  - Keeps section animation logic close to section UI in FSD.
- Desktop/mobile split at page level:
  - Avoids mixing full-page desktop behavior into mobile flow.
  - Prevents code duplication by reusing the same section widgets.
- Current home sections are **mock sections**:
  - Structure is final-oriented.
  - Content/animation details still need replacement with real design/API data.

## Related Files

- `src/features/animations/model/useFullPageEngine.ts`
- `src/pages/home/ui/HomePage.tsx`
- `src/pages/home/ui/DesktopHome.tsx`
- `src/pages/home/ui/MobileHome.tsx`
- `src/pages/home/config/fullPageMock.ts`
- `src/widgets/homeSections/index.ts`
