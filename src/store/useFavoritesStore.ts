import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteIds: string[]
  toggleFavorite: (giftId: string) => void
}

// Persisted to localStorage — no account, no sync across devices.
// Consumers check membership directly via a selector
// (e.g. `state.favoriteIds.includes(id)`) rather than a getter,
// so only components watching that specific id re-render on toggle.
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      toggleFavorite: (giftId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(giftId)
            ? state.favoriteIds.filter((id) => id !== giftId)
            : [...state.favoriteIds, giftId],
        })),
    }),
    { name: 'giftmatch-favorites' },
  ),
)
