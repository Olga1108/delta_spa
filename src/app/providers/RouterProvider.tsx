import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/notFound/ui/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/ua',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
