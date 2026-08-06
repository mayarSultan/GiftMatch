export const MAX_DESCRIPTION_LENGTH = 500
export interface AiExtractedProfile {
  recipient?: string
  style?: string
  tags: string[]
  rawDescription: string
}

export interface ParseDescriptionRequest {
  description: string
}

export type ParseDescriptionResponse =
  { ok: true; profile: AiExtractedProfile } | { ok: false; error: string }
