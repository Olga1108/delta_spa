import { API_BASE_URL, API_KEY, API_KEY_HEADER } from '@shared/config/api'
import { createApiClient } from './core/createApiClient'
import { withApiKey } from './interceptors/withApiKey'

export const apiClient = createApiClient({
  baseUrl: API_BASE_URL,
  requestInterceptors: [
    withApiKey({
      headerName: API_KEY_HEADER,
      apiKey: API_KEY,
    }),
  ],
})
