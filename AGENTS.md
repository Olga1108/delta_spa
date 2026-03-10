# AGENTS.md

## Project Context
- Project: CPA SPA (learning project)
- Stack: React, TypeScript, Vite, Tailwind v4, React Query, GSAP, FSD
- Source task: `Task.md`

## Runtime
- Node: `20.20.1` (see `.nvmrc`)
- npm: `>=10`
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## Architecture (FSD)
- Layers: `app`, `pages`, `widgets`, `features`, `entities`, `shared`
- Keep business requests in slice APIs:
  - `entities/*/api`
  - `features/*/api`
- Keep transport/infrastructure in `shared/api`
- Follow configured aliases: `@`, `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`

## API Rules
- Use `apiClient` from `@shared/api` for all HTTP calls.
- Do not call `fetch` directly from components.
- API key must be injected by interceptor (`x-api-key`), not duplicated per request.
- Locale for UI/API: `en | ua`.
- API docs: `https://cpa-server-vtel.onrender.com/api-docs/`

## Environment Variables
- `VITE_API_BASE_URL`
- `VITE_API_KEY`
- Dev defaults are defined in `.env.development`
- Prod defaults are defined in `.env.production`

## Styling and Assets
- Tailwind v4 via `@import "tailwindcss"` in `src/index.css`
- Fonts configured in `src/shared/styles/fonts.css`
- Global assets: `src/shared/assets`
- Slice-specific assets: colocate in slice `assets/`

## Documentation
- Store project docs in `docs/`
- Use `kebab-case` file names (e.g. `api-client.md`)
- Use `docs/_template.md` for new docs

## Done Criteria
- Code follows FSD boundaries.
- Types are valid for changed files.
- Build passes (`npx vite build` at minimum).
- No hardcoded secrets outside env files.
- New behavior is documented when needed.
