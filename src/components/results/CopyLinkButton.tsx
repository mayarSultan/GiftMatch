import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

export function CopyLinkButton() {
  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Button variant="ghost" size="sm" onClick={() => copy(window.location.href)}>
      {isCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {isCopied ? 'Copied' : 'Copy link'}
    </Button>
  )
}
