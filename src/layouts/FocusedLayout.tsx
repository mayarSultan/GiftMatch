import { Link, Outlet } from 'react-router-dom'
import { Gift, X } from 'lucide-react'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { SkipLink } from '@/components/shared/SkipLink'
import { PageTransition } from '@/components/shared/PageTransition'
import { routes } from '@/utils/routes'

export function FocusedLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link
            to={routes.home}
            className="flex items-center gap-2 font-display text-2xl transition-opacity hover:opacity-80"
          >
            <Gift className="size-5 text-primary" aria-hidden="true" />
            GiftMatch
          </Link>
          <div className="flex items-center gap-1">
            <DarkModeToggle />
            <Link
              to={routes.home}
              aria-label="Exit to home"
              className="flex items-center gap-1.5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  )
}
