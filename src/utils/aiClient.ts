import type { ParseDescriptionRequest, ParseDescriptionResponse } from '@/types/aiProfile'

export async function parseGiftDescription(
  description: string,
): Promise<ParseDescriptionResponse> {
  try {
    const response = await fetch('/api/parse-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description } satisfies ParseDescriptionRequest),
    })

    return (await response.json()) as ParseDescriptionResponse
  } catch {
    return {
      ok: false,
      error: 'Could not reach the server. Check your connection and try again.',
    }
  }
}
