import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuizAnswers } from '@/types/quiz'

const MAX_ENTRIES = 5

export interface RecentSearchEntry {
  id: string
  answers: QuizAnswers
  createdAt: number
}

interface RecentSearchesState {
  entries: RecentSearchEntry[]
  addSearch: (answers: QuizAnswers) => void
  clearSearches: () => void
}

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      entries: [],
      addSearch: (answers) =>
        set((state) => ({
          entries: [
            { id: crypto.randomUUID(), answers, createdAt: Date.now() },
            ...state.entries,
          ].slice(0, MAX_ENTRIES),
        })),
      clearSearches: () => set({ entries: [] }),
    }),
    { name: 'giftmatch-recent-searches' },
  ),
)
