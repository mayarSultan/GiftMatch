import type { VercelRequest, VercelResponse } from '@vercel/node'
import { parseDescriptionMock } from '../src/utils/parseDescriptionMock'
import type {
  ParseDescriptionRequest,
  ParseDescriptionResponse,
} from '../src/types/aiProfile'

const MAX_DESCRIPTION_LENGTH = 500

export default function handler(req: VercelRequest, res: VercelResponse) {
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

  // TODO(Version 2, Phase 2): replace parseDescriptionMock with a real LLM
  // call. The response contract below is designed to stay the same either way.
  const profile = parseDescriptionMock(description)

  return res.status(200).json({ ok: true, profile } satisfies ParseDescriptionResponse)
}
