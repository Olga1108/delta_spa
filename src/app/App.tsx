import { AppRouterProvider } from './providers/RouterProvider'
import { AppQueryProvider } from './providers/QueryProvider'

function App() {
  return (
    <AppQueryProvider>
      <AppRouterProvider />
    </AppQueryProvider>
  )
}

export default App
