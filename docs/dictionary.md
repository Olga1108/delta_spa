# Dictionary (Static UI Text)

## Purpose

Provide localized static UI strings (en/ua) for the CPA app without a full i18n library. Content that comes from the API (benefits, multiply, tasks) is not stored here; only labels, buttons, nav, form placeholders, and similar copy from Figma.

## Scope

- **In scope:** Static UI text in English and Ukrainian; key structure by section; `useDictionary` hook and `getDictionary` for non-React usage.
- **Out of scope:** API content (use entities/API); pluralization, interpolation, or other i18n features.

## Architecture

- `shared/config/locales` – defines `UiLocale` (en | ua), `getLocaleFromPathname`, `normalizeUiLocale`.
- `shared/lib/dictionary/dictionaries.ts` – flat `Record<string, string>` per locale; `getDictionary(locale)`.
- `shared/lib/dictionary/useDictionary.ts` – hook that uses current route to get locale and returns `{ translate, locale }`.
- Consumers import from `@shared/lib/dictionary`.

## Usage

1. Use the hook inside a component under `RouterProvider`:

```ts
import { useDictionary } from '@shared/lib/dictionary'

function Header() {
  const { translate, locale } = useDictionary()
  return (
    <nav>
      <a href={`/${locale}#benefits`}>{translate('header.nav.benefits')}</a>
      <a href={`/${locale}#join`}>{translate('header.nav.join')}</a>
    </nav>
  )
}
```

2. Outside React (e.g. in API or config), use `getDictionary(locale)`:

```ts
import { getDictionary } from '@shared/lib/dictionary'

const dict = getDictionary('ua')
const label = dict['footer.scrollToTop']
```

## Examples

- `translate('header.nav.benefits')` → "Benefits" (en) / "Переваги" (ua)
- `translate('footer.scrollToTop')` → "Scroll to top" (en) / "Прокрутити вгору" (ua)
- Missing key returns the key: `translate('unknown.key')` → `"unknown.key"`

## Key Naming

Use flat keys with dot notation: `section.element` or `section.component.element`. Add keys as you implement screens from Figma. Do not add keys for content that comes from the API (benefits, multiply, tasks).

## Data Split

| Source     | Content                          |
| ---------- | -------------------------------- |
| Dictionary | Nav, footer, form labels, modals |
| API        | Benefits, multiply, tasks        |

## Related Files

- `src/shared/lib/dictionary/dictionaries.ts`
- `src/shared/lib/dictionary/useDictionary.ts`
- `src/shared/lib/dictionary/index.ts`
- `src/shared/config/locales.ts`
