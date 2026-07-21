import { quizQuestions } from '@/data/quizQuestions'
import { useQuizStore } from '@/store/useQuizStore'

export function useQuizNavigation() {
  const stepIndex = useQuizStore((state) => state.stepIndex)
  const answers = useQuizStore((state) => state.answers)
  const selectAnswer = useQuizStore((state) => state.selectAnswer)
  const goNext = useQuizStore((state) => state.goNext)
  const goPrev = useQuizStore((state) => state.goPrev)

  const totalSteps = quizQuestions.length
  const currentQuestion = quizQuestions[stepIndex]
  const selectedValue = answers[currentQuestion.id]

  return {
    currentQuestion,
    stepIndex,
    totalSteps,
    selectedValue,
    canGoNext: Boolean(selectedValue),
    isFirstStep: stepIndex === 0,
    isLastStep: stepIndex === totalSteps - 1,
    progress: ((stepIndex + 1) / totalSteps) * 100,
    selectAnswer,
    goNext,
    goPrev,
  }
}
