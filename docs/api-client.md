# API Client

This document explains how the API layer in `shared/api` is organized and how to use it in the FSD structure.

## What Is Included

- Request interceptor support
- Automatic `x-api-key` header injection
- Shared `baseUrl` from `VITE_API_BASE_URL`

## Structure

- `core/createApiClient.ts` - client factory
- `interceptors/withApiKey.ts` - API key interceptor
- `client.ts` - project-level `apiClient`
- `index.ts` - public exports

## Configuration

Source: `src/shared/config/api.ts`

- `API_BASE_URL` from `VITE_API_BASE_URL`
- `API_KEY_HEADER` (`x-api-key`)
- `API_KEY` from `VITE_API_KEY` (with fallback)

Example:

```env
VITE_API_BASE_URL=/api
VITE_API_KEY=prodcpakey333
```

## Interceptors

An interceptor receives a `RequestContext` and returns a modified context before `fetch` is executed.

```ts
type RequestContext = {
  url: string
  init: RequestInit
}

type RequestInterceptor = (
  context: RequestContext,
) => RequestContext | Promise<RequestContext>
```

The project uses `withApiKey`, which injects `x-api-key` into every request.

## Client API

`createApiClient` returns:

- `request<T>(path, init?)`
- `get<T>(path, init?)`
- `post<T>(path, init?)`
- `addRequestInterceptor(interceptor)`

`path` can be:

- relative (`/ua/benefits`) -> prefixed with `API_BASE_URL`
- absolute (`https://...`) -> used as-is

## Usage In Slices

Define requests in domain slices (`entities/*/api`, `features/*/api`), not in `shared/api`.

```ts
import { apiClient } from '@shared/api'

export const getBenefits = (locale: 'en' | 'ua') =>
  apiClient.get(`/${locale}/benefits`)
```

## Recommendations

- Avoid calling `fetch` directly in components
- Do not duplicate `x-api-key` in each request
- Keep endpoint constants next to domain request files
- Handle request errors at query/mutation level (React Query)
