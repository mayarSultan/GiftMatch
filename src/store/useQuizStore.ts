import { create } from 'zustand'
import { quizQuestions } from '@/data/quizQuestions'
import type { QuestionId, QuizAnswers } from '@/types/quiz'

const lastStepIndex = quizQuestions.length - 1

interface QuizState {
  stepIndex: number
  answers: QuizAnswers
  selectAnswer: (questionId: QuestionId, value: string) => void
  goNext: () => void
  goPrev: () => void
  resetQuiz: () => void
}

// Deliberately NOT persisted — this only tracks an in-progress quiz.
// Once finished, answers move into the results URL (shareable, bookmarkable)
// and, if the person wants them remembered, into useRecentSearchesStore.
export const useQuizStore = create<QuizState>((set) => ({
  stepIndex: 0,
  answers: {},
  selectAnswer: (questionId, value) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: value } })),
  goNext: () =>
    set((state) => ({ stepIndex: Math.min(state.stepIndex + 1, lastStepIndex) })),
  goPrev: () => set((state) => ({ stepIndex: Math.max(state.stepIndex - 1, 0) })),
  resetQuiz: () => set({ stepIndex: 0, answers: {} }),
}))
