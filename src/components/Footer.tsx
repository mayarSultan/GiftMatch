import { Gift } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2 font-display text-lg">
          <Gift className="size-4 text-primary" aria-hidden="true" />
          GiftMatch
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {year} GiftMatch. Find the perfect gift in under a minute.
        </p>
      </div>
    </footer>
  )
}
