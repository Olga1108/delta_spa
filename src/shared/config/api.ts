const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL =
  rawApiBaseUrl && rawApiBaseUrl !== '/' ? rawApiBaseUrl.replace(/\/+$/, '') : '/api'

export const API_KEY_HEADER = 'x-api-key'

const envKey = import.meta.env.VITE_API_KEY?.trim()
if (!envKey) {
  throw new Error('VITE_API_KEY is not set. Add your key to .env.local.')
}

export const API_KEY = envKey
