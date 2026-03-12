# Container (Fixed Width Constraint)

## Purpose

Provide a fixed-width, centered content area for the CPA app so layout matches the Figma design and works consistently on different screen sizes (including 13" devices). Backgrounds and full-bleed sections can extend to the viewport; only content that should be constrained uses the container.

## Scope

- **In scope:** Max-width constraint (80rem / 1280px), horizontal padding, centering; React `Container` component and CSS variables; **mobile-first** responsive padding.
- **Out of scope:** Page-level layout; breakpoints for page-specific layout (handled in pages/widgets).

## Architecture

- `src/index.css` – Global only: `@theme` defines `--container-max-width` (80rem) and `--container-padding-x` (1rem base); mobile-first overrides for `--container-padding-x` at 768px and 1280px. No component-specific classes (those live in CSS modules).
- `src/shared/ui/Container/Container.module.css` – Scoped container styles (`.root`, `.fullWidth`); uses theme variables for max-width and padding.
- `src/shared/ui/Container/Container.tsx` – `Container` component; optional `fullWidth` for padding-only, no max-width.

## Usage

1. Wrap page content that should respect the fixed width:

```tsx
import { Container } from '@shared/ui/Container'

function SomePage() {
  return (
    <section>
      <Container>
        <h1>Title</h1>
        <p>Content constrained to container width.</p>
      </Container>
    </section>
  )
}
```

2. For a section that needs horizontal padding but no max-width (e.g. full-bleed background with inner content):

```tsx
<Container fullWidth>
  <div>Full width row with same horizontal padding</div>
</Container>
```

3. Override padding or add classes via `className`:

```tsx
<Container className="py-8">...</Container>
```

## Examples

- Default: max-width 80rem, centered; horizontal padding **mobile-first**: 1rem (base) → 1.5rem (≥768px) → 2rem (≥1280px).
- `fullWidth`: same padding scale, no max-width (content can use full viewport width).

## Decisions and Tradeoffs

- **80rem (1280px):** Matches common desktop frame width and existing `--spacing-container`; works well for 13" screens per task.
- **Mobile-first padding:** Base 1rem gives more content space on small screens; 1.5rem at 768px and 2rem at 1280px keep proportions on larger viewports. All via `--container-padding-x` in `index.css`; the CSS module references it so one variable drives the component.
- **CSS modules:** Container styles live in `Container.module.css` so they are scoped and don’t pollute the global namespace; `index.css` stays for design tokens, reset, and body only.
- **#root no longer constrained:** Container was moved off `#root` so full-height pages and background animations can be full viewport; each page/section opts in via `<Container>`.

## Related Files

- `src/index.css`
- `src/shared/ui/Container/Container.tsx`
- `src/shared/ui/Container/Container.module.css`
- `src/shared/ui/Container/index.ts`
