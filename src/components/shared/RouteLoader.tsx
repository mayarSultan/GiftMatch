import { Loader2 } from 'lucide-react'

export function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  )
}
