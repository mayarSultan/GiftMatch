import { Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

export function ShareButton() {
  const { copy, isCopied } = useCopyToClipboard()

  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My GiftMatch results', url })
        return
      } catch {
        // User cancelled the native share sheet — fall through to copy.
      }
    }

    await copy(url)
  }

  return (
    <Button variant="outline" onClick={handleShare}>
      {isCopied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
      {isCopied ? 'Link copied' : 'Share'}
    </Button>
  )
}
