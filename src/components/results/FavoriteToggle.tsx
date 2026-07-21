import { Heart } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useFavoritesStore } from '@/store/useFavoritesStore'

interface FavoriteToggleProps {
  giftId: string
  giftName: string
  className?: string
}

export function FavoriteToggle({ giftId, giftName, className }: FavoriteToggleProps) {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(giftId))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(giftId)}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? `Remove ${giftName} from favorites` : `Save ${giftName} to favorites`
      }
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform active:scale-90',
        className,
      )}
    >
      <Heart
        className={cn('size-4', isFavorite && 'fill-primary text-primary')}
        aria-hidden="true"
      />
    </button>
  )
}
