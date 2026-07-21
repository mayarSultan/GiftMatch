import { Link } from 'react-router-dom'
import { Gift } from 'lucide-react'
import { CTAButton } from '@/components/CTAButton'
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
        <CTAButton label="Get started" size="sm" to={routes.quiz} />
      </div>
    </header>
  )
}
