import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70dvh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="font-heading text-4xl">404</h1>
      <p className="text-black/70">Page not found</p>
      <Link className="rounded-xl bg-black px-4 py-2 text-sm text-white" to="/">
        Back to home
      </Link>
    </main>
  )
}
