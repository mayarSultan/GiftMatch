import { Tag } from 'lucide-react'
import type { AiExtractedProfile } from '@/types/aiProfile'
import { labelFor } from '@/utils/formatAnswersSummary'

interface ExtractedProfileSummaryProps {
  profile: AiExtractedProfile
}

export function ExtractedProfileSummary({ profile }: ExtractedProfileSummaryProps) {
  const { recipient, style, tags } = profile

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">Here's what we understood:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {recipient && (
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            For a {labelFor('recipient', recipient).toLowerCase()}
          </span>
        )}
        {style && (
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
            {labelFor('style', style)} style
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2" aria-label="Recognized interests">
            {tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
              >
                <Tag className="size-3" aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Interests aren't factored into matching yet — support for this is coming soon.
          </p>
        </div>
      )}

      {!recipient && !style && tags.length === 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't confidently pick anything out of that — try adding a relationship
          (like "my sister") or an interest.
        </p>
      )}
    </div>
  )
}
