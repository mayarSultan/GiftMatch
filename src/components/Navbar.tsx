import { Link } from 'react-router-dom'
import { Gift, Heart } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { routes } from '@/utils/routes'

export function Navbar() {
  return (
    <header className="border-b border-border/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link
          to={routes.home}
          className="flex items-center gap-2 font-display text-2xl transition-opacity hover:opacity-80"
        >
          <Gift className="size-5 text-primary" aria-hidden="true" />
          GiftMatch
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3" aria-label="Primary">
          <Link
            to={routes.favorites}
            aria-label="Favorites"
            className="flex items-center gap-1.5 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-3"
          >
            <Heart className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          <DarkModeToggle />
          <CTAButton label="Get started" size="sm" to={routes.quiz} />
        </nav>
      </div>
    </header>
  )
}
