import { useState } from 'react'

export function useCopyToClipboard(resetAfterMs = 2000) {
  const [isCopied, setIsCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), resetAfterMs)
      return true
    } catch {
      return false
    }
  }

  return { copy, isCopied }
}
