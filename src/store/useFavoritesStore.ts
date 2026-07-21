import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteIds: string[]
  toggleFavorite: (giftId: string) => void
  isFavorite: (giftId: string) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (giftId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(giftId)
            ? state.favoriteIds.filter((id) => id !== giftId)
            : [...state.favoriteIds, giftId],
        })),
      isFavorite: (giftId) => get().favoriteIds.includes(giftId),
    }),
    { name: 'giftmatch-favorites' },
  ),
)
