import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { decodeAnswersFromSearchParams } from '@/utils/quizAnswersSerializer'
import { getRecommendations } from '@/utils/recommendationEngine'

export function useQuizResults(limit = 6) {
  const [searchParams] = useSearchParams()

  const answers = useMemo(
    () => decodeAnswersFromSearchParams(searchParams),
    [searchParams],
  )

  const recommendations = useMemo(
    () => getRecommendations(answers, { limit }),
    [answers, limit],
  )

  return {
    answers,
    recommendations,
    hasAnswers: Object.keys(answers).length > 0,
    isEmpty: recommendations.length === 0,
  }
}
