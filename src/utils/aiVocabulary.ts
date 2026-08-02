// Relative import — see the note in parseDescriptionMock.ts. This file is
// bundled by Vercel's function build too (via geminiExtractor.ts), so it
// can't rely on the @/ alias.
import { giftCatalog } from '../data/gifts'

/**
 * The only values recognized anywhere in the AI layer. Both the mock
 * extractor and the real Gemini extractor are constrained to these —
 * for Gemini, literally as a JSON Schema `enum`, so the model physically
 * cannot return a value the recommendation engine wouldn't understand.
 */
export const RECIPIENT_VALUES = [
  'partner',
  'friend',
  'parent',
  'sibling',
  'coworker',
  'kid',
] as const

export const STYLE_VALUES = ['practical', 'sentimental', 'quirky', 'luxury'] as const

// Derived from the live catalog rather than hardcoded, so recognized tags
// always stay valid against whatever gifts.json actually contains.
export const KNOWN_TAGS = Array.from(new Set(giftCatalog.flatMap((gift) => gift.tags)))
