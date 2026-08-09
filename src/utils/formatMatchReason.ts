import type { QuestionId } from '@/types/quiz'

const CATEGORY_LABELS: Record<QuestionId, string> = {
  occasion: 'occasion',
  recipient: "who it's for",
  age: 'age group',
  budget: 'budget',
  style: 'style',
}

function joinWithAnd(items: string[]): string {
  if (items.length === 1) return items[0]
  const last = items[items.length - 1]
  const rest = items.slice(0, -1).join(', ')
  return `${rest} and ${last}`
}

export function formatMatchReason(
  matchedCategories: QuestionId[],
  matchedTags: string[] = [],
): string {
  const categoryLabels = matchedCategories.map((id) => CATEGORY_LABELS[id])

  if (categoryLabels.length === 0 && matchedTags.length === 0) {
    return 'A popular pick worth considering.'
  }

  const parts: string[] = []
  if (categoryLabels.length > 0) {
    parts.push(`Matches your ${joinWithAnd(categoryLabels)}`)
  }
  if (matchedTags.length > 0) {
    parts.push(`fits their interest in ${joinWithAnd(matchedTags)}`)
  }

  return `${parts.join(', and ')}.`
}
