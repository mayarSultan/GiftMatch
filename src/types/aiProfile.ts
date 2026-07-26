/**
 * What a free-text description gets turned into before it reaches the
 * existing recommendationEngine. Deliberately looser than QuizAnswers:
 * free text won't always map cleanly onto a fixed enum, so `recipient`
 * and `style` are best-effort normalized guesses (undefined if no
 * confident match), and `tags` carries whatever the extractor recognized
 * for direct matching against Gift.tags.
 */
export interface AiExtractedProfile {
  recipient?: string
  style?: string
  tags: string[]
  /** The original input, kept for debugging and for showing the person what was understood. */
  rawDescription: string
}

export interface ParseDescriptionRequest {
  description: string
}

export type ParseDescriptionResponse =
  { ok: true; profile: AiExtractedProfile } | { ok: false; error: string }
