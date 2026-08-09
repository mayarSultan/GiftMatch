import { quizQuestions } from '@/data/quizQuestions'
import type { QuestionId, QuizAnswers } from '@/types/quiz'

const QUESTION_IDS = quizQuestions.map((question) => question.id) as QuestionId[]
const TAGS_PARAM = 'tags'

export function encodeAnswersToSearchParams(
  answers: QuizAnswers,
  tags: string[] = [],
): URLSearchParams {
  const params = new URLSearchParams()

  for (const questionId of QUESTION_IDS) {
    const value = answers[questionId]
    if (value) params.set(questionId, value)
  }

  if (tags.length > 0) {
    params.set(TAGS_PARAM, tags.join(','))
  }

  return params
}

export function decodeAnswersFromSearchParams(params: URLSearchParams): QuizAnswers {
  const answers: QuizAnswers = {}

  for (const questionId of QUESTION_IDS) {
    const value = params.get(questionId)
    if (value) answers[questionId] = value
  }

  return answers
}

export function decodeTagsFromSearchParams(params: URLSearchParams): string[] {
  const raw = params.get(TAGS_PARAM)
  return raw ? raw.split(',').filter(Boolean) : []
}
