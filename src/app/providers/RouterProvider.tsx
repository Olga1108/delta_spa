import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/notFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    loader: () => redirect('/404'),
  },
])

export function AppRouterProvider() {
  return <RouterProvider router={router} />
}
