import type { RequestInterceptor } from '../core/createApiClient'

type WithApiKeyOptions = {
  headerName: string
  apiKey: string
}

export const withApiKey = ({ headerName, apiKey }: WithApiKeyOptions): RequestInterceptor => {
  return ({ url, init }) => {
    const headers = new Headers(init.headers)
    headers.set(headerName, apiKey)

    return {
      url,
      init: {
        ...init,
        headers,
      },
    }
  }
}
