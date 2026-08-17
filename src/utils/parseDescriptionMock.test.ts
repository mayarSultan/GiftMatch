import { describe, it, expect } from 'vitest'
import { parseDescriptionMock } from './parseDescriptionMock'

describe('parseDescriptionMock', () => {
  it('recognizes sibling from "sister"', () => {
    expect(parseDescriptionMock('My sister loves coffee and plants.').recipient).toBe(
      'sibling',
    )
  })

  it('recognizes parent from "mom" and "dad"', () => {
    expect(parseDescriptionMock('A gift for my mom').recipient).toBe('parent')
    expect(parseDescriptionMock('A gift for my dad').recipient).toBe('parent')
  })

  it('recognizes partner from relationship words', () => {
    expect(parseDescriptionMock('something for my husband').recipient).toBe('partner')
  })

  it('recognizes practical style from "simple" or "useful"', () => {
    expect(
      parseDescriptionMock('Need a simple, useful gift for my coworker.').style,
    ).toBe('practical')
  })

  it('recognizes luxury style from "fancy"', () => {
    expect(parseDescriptionMock('Looking for something fancy.').style).toBe('luxury')
  })

  it('extracts known catalog tags and only known catalog tags', () => {
    const result = parseDescriptionMock('My sister loves books, coffee and plants.')
    expect(result.tags).toContain('coffee')
    expect(result.tags).toContain('plants')
    // "books" is not (yet) a tag anywhere in the catalog — a real,
    // documented gap, not a bug. See docs/ARCHITECTURE.md.
    expect(result.tags).not.toContain('books')
  })

  it('returns undefined recipient and style when nothing recognizable is present', () => {
    const result = parseDescriptionMock('Something nice, nothing too flashy.')
    expect(result.recipient).toBeUndefined()
    expect(result.style).toBeUndefined()
  })

  it('preserves the original description verbatim', () => {
    const input = 'My sister loves coffee and plants.'
    expect(parseDescriptionMock(input).rawDescription).toBe(input)
  })

  it('returns an empty tags array, never undefined, when nothing matches', () => {
    expect(parseDescriptionMock('xyz nonsense qwerty').tags).toEqual([])
  })
})
