import { giftCatalog } from '@/data/gifts'
import type { Gift } from '@/types/gift'
import type { QuestionId, QuizAnswers } from '@/types/quiz'

/** Points awarded when a gift matches the answer for that question. */
const CATEGORY_WEIGHTS: Record<QuestionId, number> = {
  occasion: 20,
  recipient: 20,
  style: 20,
  budget: 15,
  age: 15,
}

/** How to check a match differs by field shape: array-of-tags vs. a single value. */
const CATEGORY_MATCHERS: Record<QuestionId, (gift: Gift, answer: string) => boolean> = {
  occasion: (gift, answer) => gift.occasion.includes(answer),
  recipient: (gift, answer) => gift.recipient.includes(answer),
  style: (gift, answer) => gift.styles.includes(answer),
  age: (gift, answer) => gift.ageGroups.includes(answer),
  budget: (gift, answer) => gift.budgetRange === answer,
}

export interface ScoredGift {
  gift: Gift
  score: number
  maxScore: number
  matchedCategories: QuestionId[]
}

interface ScoreResult {
  score: number
  matchedCategories: QuestionId[]
}

/**
 * Awards points for each answered question the gift matches, and
 * records which questions it matched on. Unanswered questions and
 * non-matches contribute nothing.
 */
function evaluateGift(gift: Gift, answers: QuizAnswers): ScoreResult {
  return (Object.keys(CATEGORY_WEIGHTS) as QuestionId[]).reduce<ScoreResult>(
    (result, questionId) => {
      const answer = answers[questionId]
      if (!answer || !CATEGORY_MATCHERS[questionId](gift, answer)) return result

      return {
        score: result.score + CATEGORY_WEIGHTS[questionId],
        matchedCategories: [...result.matchedCategories, questionId],
      }
    },
    { score: 0, matchedCategories: [] },
  )
}

function totalPossibleScore(answers: QuizAnswers): number {
  return (Object.keys(CATEGORY_WEIGHTS) as QuestionId[]).reduce(
    (total, questionId) =>
      answers[questionId] ? total + CATEGORY_WEIGHTS[questionId] : total,
    0,
  )
}

/**
 * Ranks the gift catalog against a set of quiz answers and returns the
 * top matches, highest score first. Pure function: same inputs always
 * produce the same output, no side effects, no framework dependencies.
 */
export function getRecommendations(
  answers: QuizAnswers,
  options: { catalog?: Gift[]; limit?: number } = {},
): ScoredGift[] {
  const { catalog = giftCatalog, limit = 5 } = options
  const maxScore = totalPossibleScore(answers)

  return catalog
    .map((gift) => ({ gift, maxScore, ...evaluateGift(gift, answers) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
