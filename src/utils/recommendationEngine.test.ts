import { describe, it, expect } from 'vitest'
import { getRecommendations } from './recommendationEngine'
import type { Gift } from '@/types/gift'

const mockCatalog: Gift[] = [
  {
    id: 'mug',
    name: 'Coffee Mug',
    description: 'A mug for coffee lovers.',
    category: 'Kitchen',
    price: 15,
    budgetRange: 'under-25',
    recipient: ['friend', 'sibling'],
    occasion: ['birthday'],
    styles: ['practical'],
    ageGroups: ['adult'],
    image: 'mug.jpg',
    futureProductUrl: '/products/mug',
    tags: ['coffee', 'kitchen'],
  },
  {
    id: 'watch',
    name: 'Luxury Watch',
    description: 'A fine watch.',
    category: 'Accessories',
    price: 300,
    budgetRange: '100-plus',
    recipient: ['partner'],
    occasion: ['anniversary'],
    styles: ['luxury'],
    ageGroups: ['adult', 'senior'],
    image: 'watch.jpg',
    futureProductUrl: '/products/watch',
    tags: ['jewelry', 'accessories'],
  },
  {
    id: 'plant',
    name: 'Succulent',
    description: 'A low-maintenance plant.',
    category: 'Home',
    price: 20,
    budgetRange: 'under-25',
    recipient: ['friend', 'coworker'],
    occasion: ['just-because'],
    styles: ['sentimental'],
    ageGroups: ['young-adult', 'adult'],
    image: 'plant.jpg',
    futureProductUrl: '/products/plant',
    tags: ['plants', 'low-maintenance'],
  },
]

describe('getRecommendations', () => {
  it('returns nothing when there are no answers and no tags', () => {
    expect(getRecommendations({}, { catalog: mockCatalog })).toEqual([])
  })

  it('scores a single matching category correctly', () => {
    const result = getRecommendations({ occasion: 'birthday' }, { catalog: mockCatalog })
    expect(result).toHaveLength(1)
    expect(result[0].gift.id).toBe('mug')
    expect(result[0].score).toBe(20)
    expect(result[0].maxScore).toBe(20)
    expect(result[0].matchedCategories).toEqual(['occasion'])
  })

  it('sums points across multiple matching categories', () => {
    const result = getRecommendations(
      { recipient: 'friend', occasion: 'birthday' },
      { catalog: mockCatalog },
    )
    const mug = result.find((r) => r.gift.id === 'mug')
    expect(mug?.score).toBe(40)
  })

  it('sorts results by score, highest first', () => {
    const result = getRecommendations(
      { recipient: 'friend', occasion: 'birthday', budget: 'under-25' },
      { catalog: mockCatalog },
    )
    expect(result.map((r) => r.gift.id)).toEqual(['mug', 'plant'])
  })

  it('excludes gifts that score zero', () => {
    const result = getRecommendations({ recipient: 'partner' }, { catalog: mockCatalog })
    expect(result.map((r) => r.gift.id)).toEqual(['watch'])
  })

  it('awards points per matching tag', () => {
    const result = getRecommendations(
      {},
      { catalog: mockCatalog, tags: ['coffee', 'plants'] },
    )
    expect(result.find((r) => r.gift.id === 'mug')?.score).toBe(6)
    expect(result.find((r) => r.gift.id === 'plant')?.score).toBe(6)
    expect(result.find((r) => r.gift.id === 'mug')?.matchedTags).toEqual(['coffee'])
  })

  it('combines answer score and tag score for the same gift', () => {
    const result = getRecommendations(
      { recipient: 'friend' },
      { catalog: mockCatalog, tags: ['coffee'] },
    )
    expect(result.find((r) => r.gift.id === 'mug')?.score).toBe(26)
  })

  it('reflects a genuine "no tag overlap" case honestly (score from answers only)', () => {
    // Mirrors the sibling/coffee/plants gap found during manual testing:
    // a category can match while zero tags overlap for that same gift.
    const result = getRecommendations(
      { recipient: 'partner' },
      { catalog: mockCatalog, tags: ['coffee'] },
    )
    const watch = result.find((r) => r.gift.id === 'watch')
    expect(watch?.score).toBe(20)
    expect(watch?.matchedTags).toEqual([])
  })

  it('respects the limit option', () => {
    const result = getRecommendations(
      { recipient: 'friend' },
      { catalog: mockCatalog, limit: 1 },
    )
    expect(result).toHaveLength(1)
  })

  it('is deterministic — same input produces the same output', () => {
    const answers = { recipient: 'friend', occasion: 'birthday' }
    expect(getRecommendations(answers, { catalog: mockCatalog })).toEqual(
      getRecommendations(answers, { catalog: mockCatalog }),
    )
  })
})
