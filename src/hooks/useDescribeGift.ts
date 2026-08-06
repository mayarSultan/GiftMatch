import { useState } from 'react'
import { parseGiftDescription } from '@/utils/aiClient'
import type { AiExtractedProfile } from '@/types/aiProfile'

type DescribeStatus = 'idle' | 'loading' | 'success' | 'error'

export function useDescribeGift() {
  const [status, setStatus] = useState<DescribeStatus>('idle')
  const [profile, setProfile] = useState<AiExtractedProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submitDescription(description: string) {
    setStatus('loading')
    setError(null)

    const result = await parseGiftDescription(description)

    if (result.ok) {
      setProfile(result.profile)
      setStatus('success')
    } else {
      setError(result.error)
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setProfile(null)
    setError(null)
  }

  return { status, profile, error, submitDescription, reset }
}
