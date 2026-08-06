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
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            &copy; {year} GiftMatch. Find the perfect gift in under a minute.
          </p>
          <p className="text-xs text-muted-foreground">
            Product photos via{' '}
            <a
              href="https://unsplash.com"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
