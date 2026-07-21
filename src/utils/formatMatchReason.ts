import type { QuestionId } from '@/types/quiz'

const CATEGORY_LABELS: Record<QuestionId, string> = {
  occasion: 'occasion',
  recipient: "who it's for",
  age: 'age group',
  budget: 'budget',
  style: 'style',
}

export function formatMatchReason(matchedCategories: QuestionId[]): string {
  if (matchedCategories.length === 0) {
    return 'A popular pick worth considering.'
  }

  const labels = matchedCategories.map((id) => CATEGORY_LABELS[id])

  if (labels.length === 1) {
    return `Matches your ${labels[0]}.`
  }

  const last = labels[labels.length - 1]
  const rest = labels.slice(0, -1).join(', ')
  return `Matches your ${rest} and ${last}.`
}
