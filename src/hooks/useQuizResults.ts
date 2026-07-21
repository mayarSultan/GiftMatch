import { useMemo } from 'react'
import { useQuizStore } from '@/store/useQuizStore'
import { getRecommendations } from '@/utils/recommendationEngine'

export function useQuizResults(limit = 6) {
  const answers = useQuizStore((state) => state.answers)

  const recommendations = useMemo(
    () => getRecommendations(answers, { limit }),
    [answers, limit],
  )

  return {
    recommendations,
    hasAnswers: Object.keys(answers).length > 0,
    isEmpty: recommendations.length === 0,
  }
}
