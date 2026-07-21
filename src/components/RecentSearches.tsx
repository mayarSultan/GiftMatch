import { Link } from 'react-router-dom'
import { History, X } from 'lucide-react'
import { useRecentSearchesStore } from '@/store/useRecentSearchesStore'
import { encodeAnswersToSearchParams } from '@/utils/quizAnswersSerializer'
import { formatAnswersSummary } from '@/utils/formatAnswersSummary'
import { formatRelativeTime } from '@/utils/formatRelativeTime'
import { routes } from '@/utils/routes'

export function RecentSearches() {
  const entries = useRecentSearchesStore((state) => state.entries)
  const clearSearches = useRecentSearchesStore((state) => state.clearSearches)

  if (entries.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <History className="size-5 text-muted-foreground" aria-hidden="true" />
          Recent searches
        </h2>
        <button
          type="button"
          onClick={clearSearches}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden="true" />
          Clear
        </button>
      </div>

      <ul className="mt-4 flex flex-wrap gap-3">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link
              to={`${routes.results}?${encodeAnswersToSearchParams(entry.answers)}`}
              className="flex flex-col gap-0.5 rounded-2xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
            >
              <span className="text-sm font-medium">
                {formatAnswersSummary(entry.answers)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(entry.createdAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
