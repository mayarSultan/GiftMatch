import { describe, it, expect } from 'vitest'
import {
  encodeAnswersToSearchParams,
  decodeAnswersFromSearchParams,
  decodeTagsFromSearchParams,
} from './quizAnswersSerializer'

describe('quizAnswersSerializer', () => {
  it('round-trips a full set of answers', () => {
    const answers = {
      occasion: 'birthday',
      recipient: 'friend',
      age: 'young-adult',
      budget: '25-50',
      style: 'quirky',
    }
    const encoded = encodeAnswersToSearchParams(answers)
    expect(
      decodeAnswersFromSearchParams(new URLSearchParams(encoded.toString())),
    ).toEqual(answers)
  })

  it('round-trips partial answers, omitting unset keys', () => {
    const answers = { recipient: 'partner' }
    const encoded = encodeAnswersToSearchParams(answers)
    expect(encoded.toString()).toBe('recipient=partner')
  })

  it('round-trips tags alongside answers', () => {
    const answers = { recipient: 'sibling' }
    const tags = ['coffee', 'plants']
    const params = new URLSearchParams(
      encodeAnswersToSearchParams(answers, tags).toString(),
    )
    expect(decodeAnswersFromSearchParams(params)).toEqual(answers)
    expect(decodeTagsFromSearchParams(params)).toEqual(tags)
  })

  it('omits the tags param entirely when there are no tags', () => {
    expect(
      encodeAnswersToSearchParams({ recipient: 'friend' }, []).toString(),
    ).not.toContain('tags')
  })

  it('returns an empty array when decoding a URL with no tags param', () => {
    expect(decodeTagsFromSearchParams(new URLSearchParams('recipient=friend'))).toEqual(
      [],
    )
  })

  it('returns an empty object when decoding an empty URL', () => {
    expect(decodeAnswersFromSearchParams(new URLSearchParams())).toEqual({})
  })
})
