// Relative imports — this file is bundled by Vercel's function build, not
// Vite, so it can't rely on the @/ alias (see parseDescriptionMock.ts).
import { GoogleGenAI } from '@google/genai'
import { RECIPIENT_VALUES, STYLE_VALUES, KNOWN_TAGS } from '../../src/utils/aiVocabulary'
import type { AiExtractedProfile } from '../../src/types/aiProfile'

// Using the "-latest" alias rather than a dated snapshot (e.g.
// "gemini-2.5-flash") on purpose: Google periodically retires older
// snapshots for new API keys — that's exactly what broke this the first
// time. The alias always resolves to whatever the current stable Flash
// model is, so this doesn't need to be manually updated when that happens.
const MODEL = 'gemini-flash-latest'

// The tag vocabulary lives in the prompt text, not the schema's `enum` —
// a schema enum with this many options (77+) triggers a generic
// INVALID_ARGUMENT from Gemini (a known practical limit on enum size in
// structured output). recipient/style stay as schema enums since those
// lists are small (4-6 options) and well under whatever that limit is.
// Tags are validated by filtering the response afterward instead.
const SYSTEM_INSTRUCTION = `You turn a short, casual description of a gift recipient into
structured data for a gift-matching app.

Extract:
- recipient: the closest match from the allowed list, only if reasonably
  clear from the text. Omit the field entirely if not mentioned or unclear.
- style: the closest match from the allowed list, only if the tone or
  wording suggests it. Omit the field entirely if not mentioned or unclear.
- tags: any of these tags that describe the recipient's interests or
  hobbies — ${KNOWN_TAGS.join(', ')}. Only include a tag if it's clearly
  supported by the text and appears in that list. Return an empty array
  if none apply.

Never invent a value outside the allowed lists. It's better to omit a
field than to force a weak match.`

interface GeminiExtractionResult {
  recipient?: string
  style?: string
  tags?: string[]
}

/**
 * Calls Gemini's free tier to extract a structured profile. recipient/style
 * are schema-enforced (schema enum); tags are prompt-guided and then
 * filtered server-side against KNOWN_TAGS, so nothing invalid reaches
 * recommendationEngine.ts either way. Throws on any failure — the caller
 * (api/parse-description.ts) is responsible for falling back to the mock.
 */
export async function extractProfileWithGemini(
  description: string,
): Promise<AiExtractedProfile> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set')
  }

  const ai = new GoogleGenAI({ apiKey })

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: description,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          recipient: { type: 'string', enum: [...RECIPIENT_VALUES] },
          style: { type: 'string', enum: [...STYLE_VALUES] },
          tags: { type: 'array', items: { type: 'string' } },
        },
        required: ['tags'],
      },
    },
  })

  if (!response.text) {
    throw new Error('Gemini returned an empty response')
  }

  const parsed = JSON.parse(response.text) as GeminiExtractionResult

  return {
    recipient: parsed.recipient,
    style: parsed.style,
    tags: (parsed.tags ?? []).filter((tag) => KNOWN_TAGS.includes(tag)),
    rawDescription: description,
  }
}