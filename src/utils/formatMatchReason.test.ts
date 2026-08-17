import { describe, it, expect } from 'vitest'
import { formatMatchReason } from './formatMatchReason'

describe('formatMatchReason', () => {
  it('returns a generic fallback when nothing matched', () => {
    expect(formatMatchReason([])).toBe('A popular pick worth considering.')
  })

  it('formats a single matched category', () => {
    expect(formatMatchReason(['occasion'])).toBe('Matches your occasion.')
  })

  it('joins multiple categories with commas and "and"', () => {
    expect(formatMatchReason(['occasion', 'budget', 'style'])).toBe(
      'Matches your occasion, budget and style.',
    )
  })

  it('mentions matched tags when present', () => {
    expect(formatMatchReason([], ['coffee'])).toBe('fits their interest in coffee.')
  })

  it('combines categories and tags in one sentence', () => {
    expect(formatMatchReason(['recipient'], ['coffee', 'plants'])).toBe(
      "Matches your who it's for, and fits their interest in coffee and plants.",
    )
  })
})
