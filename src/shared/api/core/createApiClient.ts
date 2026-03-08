export type RequestContext = {
  url: string
  init: RequestInit
}

export type RequestInterceptor = (
  context: RequestContext,
) => RequestContext | Promise<RequestContext>

type CreateApiClientOptions = {
  baseUrl: string
  requestInterceptors?: RequestInterceptor[]
}

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value)
const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`)
const normalizeBaseUrl = (baseUrl: string) => {
  if (baseUrl === '/') {
    return ''
  }

  return baseUrl.replace(/\/+$/, '')
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json() as Promise<T>
  }

  return response.text() as Promise<T>
}

export const createApiClient = ({
  baseUrl,
  requestInterceptors = [],
}: CreateApiClientOptions) => {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl)
  const interceptors = [...requestInterceptors]

  const addRequestInterceptor = (interceptor: RequestInterceptor) => {
    interceptors.push(interceptor)

    return () => {
      const index = interceptors.indexOf(interceptor)
      if (index >= 0) {
        interceptors.splice(index, 1)
      }
    }
  }

  const buildUrl = (path: string) =>
    isAbsoluteUrl(path) ? path : `${normalizedBaseUrl}${normalizePath(path)}`

  const runRequestInterceptors = async (context: RequestContext) => {
    let nextContext = context

    for (const interceptor of interceptors) {
      nextContext = await interceptor(nextContext)
    }

    return nextContext
  }

  const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const context = await runRequestInterceptors({
      url: buildUrl(path),
      init,
    })

    const response = await fetch(context.url, context.init)
    return parseResponse<T>(response)
  }

  const get = <T>(path: string, init: RequestInit = {}) =>
    request<T>(path, {
      ...init,
      method: 'GET',
    })

  const post = <T>(path: string, init: RequestInit = {}) =>
    request<T>(path, {
      ...init,
      method: 'POST',
    })

  return {
    request,
    get,
    post,
    addRequestInterceptor,
  }
}
