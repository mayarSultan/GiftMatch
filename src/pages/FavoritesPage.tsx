import { useNavigate } from 'react-router-dom'
import { giftCatalog } from '@/data/gifts'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { SavedGiftCard } from '@/components/results/SavedGiftCard'
import { EmptyResultsState } from '@/components/results/EmptyResultsState'
import { routes } from '@/utils/routes'

export function FavoritesPage() {
  const navigate = useNavigate()
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds)
  const favoriteGifts = giftCatalog.filter((gift) => favoriteIds.includes(gift.id))

  useDocumentMeta('Favorites', 'Gift ideas you have saved on GiftMatch.')

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl">Your favorites</h1>
      <p className="mt-2 text-muted-foreground">
        Gifts you've saved while browsing your matches.
      </p>

      {favoriteGifts.length === 0 ? (
        <div className="mt-10">
          <EmptyResultsState
            title="No favorites yet"
            message="Tap the heart on any gift in your results to save it here."
            actionLabel="Take the quiz"
            onAction={() => navigate(routes.quiz)}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteGifts.map((gift) => (
            <SavedGiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      )}
    </div>
  )
}
