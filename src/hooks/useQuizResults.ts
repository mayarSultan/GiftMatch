import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  decodeAnswersFromSearchParams,
  decodeTagsFromSearchParams,
} from '@/utils/quizAnswersSerializer'
import { getRecommendations } from '@/utils/recommendationEngine'

export function useQuizResults(limit = 6) {
  const [searchParams] = useSearchParams()

  const answers = useMemo(
    () => decodeAnswersFromSearchParams(searchParams),
    [searchParams],
  )
  const tags = useMemo(() => decodeTagsFromSearchParams(searchParams), [searchParams])

  const recommendations = useMemo(
    () => getRecommendations(answers, { limit, tags }),
    [answers, tags, limit],
  )

  return {
    answers,
    tags,
    recommendations,
    hasAnswers: Object.keys(answers).length > 0 || tags.length > 0,
    isEmpty: recommendations.length === 0,
  }
}
