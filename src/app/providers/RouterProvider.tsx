import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([])

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}