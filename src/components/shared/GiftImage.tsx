import { useState } from 'react'
import { Gift } from 'lucide-react'
import { cn } from '@/utils/cn'

interface GiftImageProps {
  src: string
  alt: string
  className?: string
}

export function GiftImage({ src, alt, className }: GiftImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex items-center justify-center bg-secondary', className)}
      >
        <Gift className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  )
}
