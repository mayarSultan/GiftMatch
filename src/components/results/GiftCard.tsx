import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Tag } from 'lucide-react'
import type { ScoredGift } from '@/utils/recommendationEngine'
import { formatMatchReason } from '@/utils/formatMatchReason'
import { ScoreBadge } from '@/components/results/ScoreBadge'
import { GiftImage } from '@/components/shared/GiftImage'
import { FavoriteToggle } from '@/components/results/FavoriteToggle'

interface GiftCardProps {
  scoredGift: ScoredGift
  index: number
}

function GiftCardComponent({ scoredGift, index }: GiftCardProps) {
  const { gift, score, maxScore, matchedCategories } = scoredGift
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-200 hover:shadow-md"
    >
      <div className="relative overflow-hidden">
        <GiftImage
          src={gift.image}
          alt={gift.name}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <FavoriteToggle
          giftId={gift.id}
          giftName={gift.name}
          className="absolute right-3 top-3"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{gift.name}</h3>
          <ScoreBadge score={score} maxScore={maxScore} />
        </div>

        <p className="text-sm text-muted-foreground">{gift.description}</p>
        <p className="font-semibold">${gift.price}</p>
        <p className="text-sm text-primary">{formatMatchReason(matchedCategories)}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Tags">
          {gift.tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/70"
            >
              <Tag className="size-3" aria-hidden="true" />
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export const GiftCard = memo(GiftCardComponent)
