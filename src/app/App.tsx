import { Container } from '@shared/ui/Container'
import { AppRouterProvider } from './providers/RouterProvider'

function App() {
  return (
    <Container>
      <AppRouterProvider />
    </Container>
  )
}

export default App
