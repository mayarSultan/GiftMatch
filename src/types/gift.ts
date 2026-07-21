export type BudgetRange = 'under-25' | '25-50' | '50-100' | '100-plus'

export interface Gift {
  id: string
  name: string
  description: string
  category: string
  price: number
  budgetRange: BudgetRange
  recipient: string[]
  occasion: string[]
  styles: string[]
  ageGroups: string[]
  image: string
  futureProductUrl: string
  tags: string[]
}
