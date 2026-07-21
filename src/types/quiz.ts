import type { LucideIcon } from 'lucide-react'

export type QuestionId = 'occasion' | 'recipient' | 'age' | 'budget' | 'style'

export interface QuizOption {
  value: string
  label: string
  icon: LucideIcon
}

export interface QuizQuestion {
  id: QuestionId
  title: string
  subtitle?: string
  options: QuizOption[]
}

export type QuizAnswers = Partial<Record<QuestionId, string>>
