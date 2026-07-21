import { quizQuestions } from '@/data/quizQuestions'
import type { QuestionId, QuizAnswers } from '@/types/quiz'

const QUESTION_IDS = quizQuestions.map((question) => question.id) as QuestionId[]

export function encodeAnswersToSearchParams(answers: QuizAnswers): URLSearchParams {
  const params = new URLSearchParams()

  for (const questionId of QUESTION_IDS) {
    const value = answers[questionId]
    if (value) params.set(questionId, value)
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
