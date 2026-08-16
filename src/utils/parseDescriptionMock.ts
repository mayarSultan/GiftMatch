// Relative imports (not the usual @/ alias) — this file is bundled by both
// Vite (frontend) and Vercel's separate function bundler (api/parse-description.ts
// imports it directly), and only Vite is guaranteed to resolve the alias.
import type { AiExtractedProfile } from '../types/aiProfile.js'
import { KNOWN_TAGS } from './aiVocabulary.js'

const RECIPIENT_KEYWORDS: Record<string, string> = {
  sister: 'sibling',
  brother: 'sibling',
  sibling: 'sibling',
  mom: 'parent',
  mother: 'parent',
  dad: 'parent',
  father: 'parent',
  parent: 'parent',
  wife: 'partner',
  husband: 'partner',
  boyfriend: 'partner',
  girlfriend: 'partner',
  spouse: 'partner',
  partner: 'partner',
  friend: 'friend',
  bestie: 'friend',
  coworker: 'coworker',
  colleague: 'coworker',
  boss: 'coworker',
  son: 'kid',
  daughter: 'kid',
  kid: 'kid',
  child: 'kid',
  niece: 'kid',
  nephew: 'kid',
}

const STYLE_KEYWORDS: Record<string, string> = {
  minimal: 'practical',
  simple: 'practical',
  practical: 'practical',
  useful: 'practical',
  sentimental: 'sentimental',
  emotional: 'sentimental',
  meaningful: 'sentimental',
  heartfelt: 'sentimental',
  quirky: 'quirky',
  fun: 'quirky',
  funny: 'quirky',
  unique: 'quirky',
  silly: 'quirky',
  luxury: 'luxury',
  fancy: 'luxury',
  expensive: 'luxury',
  premium: 'luxury',
}

function findFirstMatch(
  text: string,
  keywordMap: Record<string, string>,
): string | undefined {
  const keyword = Object.keys(keywordMap).find((word) => text.includes(word))
  return keyword ? keywordMap[keyword] : undefined
}

function findMatchingTags(text: string): string[] {
  return KNOWN_TAGS.filter((tag) => text.includes(tag.replace('-', ' ')))
}

/**
 * Deterministic, keyword-based stand-in for the real LLM extraction that
 * Version 2 Phase 2 will add. Exists so the request/response contract and
 * the frontend can be built and tested before an API key exists.
 *
 * This is NOT natural-language understanding — it only recognizes the
 * specific keywords above. "My sister loves books, coffee, and plants"
 * will find "sibling" and the "plants" tag; "coffee" and "books" only
 * match if those exact words exist in the gift catalog's tags (as of
 * writing, "coffee" does, "books" doesn't yet — a real LLM in Phase 2
 * won't have this limitation).
 */
export function parseDescriptionMock(description: string): AiExtractedProfile {
  const text = description.toLowerCase()

  return {
    recipient: findFirstMatch(text, RECIPIENT_KEYWORDS),
    style: findFirstMatch(text, STYLE_KEYWORDS),
    tags: findMatchingTags(text),
    rawDescription: description,
  }
}
