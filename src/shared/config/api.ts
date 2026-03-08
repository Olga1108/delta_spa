const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL =
  rawApiBaseUrl && rawApiBaseUrl !== '/'
    ? rawApiBaseUrl.replace(/\/+$/, '')
    : '/api'

export const API_KEY_HEADER = 'x-api-key'
export const API_KEY = import.meta.env.VITE_API_KEY ?? 'prodcpakey333'
