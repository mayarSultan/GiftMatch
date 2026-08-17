import { describe, it, expect } from 'vitest'
import { formatAnswersSummary, labelFor } from './formatAnswersSummary'

describe('labelFor', () => {
  it('returns the human-readable label for a known value', () => {
    expect(labelFor('recipient', 'sibling')).toBe('Sibling')
  })

  it('falls back to the raw value when nothing matches', () => {
    expect(labelFor('recipient', 'not-a-real-value')).toBe('not-a-real-value')
  })
})

describe('formatAnswersSummary', () => {
  it('returns a fallback string when there are no relevant answers', () => {
    expect(formatAnswersSummary({})).toBe('Gift search')
  })

  it('summarizes occasion, recipient, and budget together', () => {
    expect(
      formatAnswersSummary({
        occasion: 'birthday',
        recipient: 'friend',
        budget: '25-50',
      }),
    ).toBe('Birthday · for a friend · $25–$50')
  })

  it('ignores fields not used in the summary, like style and age', () => {
    expect(formatAnswersSummary({ style: 'luxury', age: 'adult' })).toBe('Gift search')
  })
})
