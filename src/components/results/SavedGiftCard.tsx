import { Tag } from 'lucide-react'
import type { Gift } from '@/types/gift'
import { GiftImage } from '@/components/shared/GiftImage'
import { FavoriteToggle } from '@/components/results/FavoriteToggle'

interface SavedGiftCardProps {
  gift: Gift
}

export function SavedGiftCard({ gift }: SavedGiftCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative">
        <GiftImage
          src={gift.image}
          alt={gift.name}
          className="h-44 w-full object-cover"
        />
        <FavoriteToggle
          giftId={gift.id}
          giftName={gift.name}
          className="absolute right-3 top-3"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-tight">{gift.name}</h3>
        <p className="text-sm text-muted-foreground">{gift.description}</p>
        <p className="font-semibold">${gift.price}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Tags">
          {gift.tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              <Tag className="size-3" aria-hidden="true" />
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
