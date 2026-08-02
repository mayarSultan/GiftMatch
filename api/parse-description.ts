import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseDescriptionMock } from '../src/utils/parseDescriptionMock'
import { extractProfileWithGemini } from './_lib/geminiExtractor'
import type {
  AiExtractedProfile,
  ParseDescriptionRequest,
  ParseDescriptionResponse,
} from '../src/types/aiProfile'

const MAX_DESCRIPTION_LENGTH = 500

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res
      .status(405)
      .json({ ok: false, error: 'Method not allowed' } satisfies ParseDescriptionResponse)
  }

  const body = req.body as Partial<ParseDescriptionRequest> | undefined
  const description = body?.description?.trim()

  if (!description) {
    return res.status(400).json({
      ok: false,
      error: 'A description is required.',
    } satisfies ParseDescriptionResponse)
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return res.status(400).json({
      ok: false,
      error: `Description must be under ${MAX_DESCRIPTION_LENGTH} characters.`,
    } satisfies ParseDescriptionResponse)
  }

  const profile = await getProfile(description)

  return res.status(200).json({ ok: true, profile } satisfies ParseDescriptionResponse)
}

/**
 * Tries the real Gemini extraction first. Falls back to the deterministic
 * mock if GEMINI_API_KEY isn't configured or the call fails for any reason
 * (rate limit, network error, malformed response) — so the feature
 * degrades gracefully instead of breaking the whole request.
 */
async function getProfile(description: string): Promise<AiExtractedProfile> {
  try {
    return await extractProfileWithGemini(description)
  } catch (error) {
    console.error('Gemini extraction failed, falling back to mock:', error)
    return parseDescriptionMock(description)
  }
}
