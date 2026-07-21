import { Link } from 'react-router-dom'
import { routes } from '@/utils/routes'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center sm:px-6">
      <h1 className="font-display text-3xl">Page not found</h1>
      <Link to={routes.home} className="text-primary underline underline-offset-4">
        Back to home
      </Link>
    </div>
  )
}
