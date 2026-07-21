import { cn } from '@/utils/cn'

interface ScoreBadgeProps {
  score: number
  maxScore: number
}

export function ScoreBadge({ score, maxScore }: ScoreBadgeProps) {
  const percent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-3 py-1 text-xs font-semibold',
        percent >= 80
          ? 'bg-primary/10 text-primary'
          : 'bg-secondary text-secondary-foreground',
      )}
    >
      {percent}% match
    </span>
  )
}
