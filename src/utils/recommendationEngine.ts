import { giftCatalog } from '@/data/gifts'
import type { Gift } from '@/types/gift'
import type { QuestionId, QuizAnswers } from '@/types/quiz'

const CATEGORY_WEIGHTS: Record<QuestionId, number> = {
  occasion: 20,
  recipient: 20,
  style: 20,
  budget: 15,
  age: 15,
}

const CATEGORY_MATCHERS: Record<QuestionId, (gift: Gift, answer: string) => boolean> = {
  occasion: (gift, answer) => gift.occasion.includes(answer),
  recipient: (gift, answer) => gift.recipient.includes(answer),
  style: (gift, answer) => gift.styles.includes(answer),
  age: (gift, answer) => gift.ageGroups.includes(answer),
  budget: (gift, answer) => gift.budgetRange === answer,
}

// Points per matching interest tag (from a free-text description). Kept
// smaller than a full question category (15-20) since a single tag
// carries less signal than a direct quiz answer, but several matching
// tags together can meaningfully move a gift up the ranking.
const POINTS_PER_TAG = 6

export interface ScoredGift {
  gift: Gift
  score: number
  maxScore: number
  matchedCategories: QuestionId[]
  matchedTags: string[]
}

interface ScoreResult {
  score: number
  matchedCategories: QuestionId[]
}

function evaluateAnswers(gift: Gift, answers: QuizAnswers): ScoreResult {
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

function totalPossibleScore(answers: QuizAnswers, tags: string[]): number {
  const fromAnswers = (Object.keys(CATEGORY_WEIGHTS) as QuestionId[]).reduce(
    (total, questionId) =>
      answers[questionId] ? total + CATEGORY_WEIGHTS[questionId] : total,
    0,
  )
  return fromAnswers + tags.length * POINTS_PER_TAG
}

/**
 * Ranks the gift catalog against quiz answers and/or free-text-derived
 * tags, highest score first. Pure function: same inputs always produce
 * the same output. tags defaults to an empty array, so existing callers
 * (the quiz flow) are unaffected and score exactly as before.
 */
export function getRecommendations(
  answers: QuizAnswers,
  options: { catalog?: Gift[]; limit?: number; tags?: string[] } = {},
): ScoredGift[] {
  const { catalog = giftCatalog, limit = 5, tags = [] } = options
  const maxScore = totalPossibleScore(answers, tags)

  return catalog
    .map((gift) => {
      const fromAnswers = evaluateAnswers(gift, answers)
      const matchedTags = tags.filter((tag) => gift.tags.includes(tag))

      return {
        gift,
        maxScore,
        score: fromAnswers.score + matchedTags.length * POINTS_PER_TAG,
        matchedCategories: fromAnswers.matchedCategories,
        matchedTags,
      }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
