import { quizQuestions } from '@/data/quizQuestions'
import type { QuizAnswers } from '@/types/quiz'

function labelFor(
  questionId: (typeof quizQuestions)[number]['id'],
  value: string,
): string {
  const question = quizQuestions.find((q) => q.id === questionId)
  const option = question?.options.find((o) => o.value === value)
  return option?.label ?? value
}

export function formatAnswersSummary(answers: QuizAnswers): string {
  const parts = [
    answers.occasion && labelFor('occasion', answers.occasion),
    answers.recipient &&
      `for a ${labelFor('recipient', answers.recipient).toLowerCase()}`,
    answers.budget && labelFor('budget', answers.budget),
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(' · ') : 'Gift search'
}
