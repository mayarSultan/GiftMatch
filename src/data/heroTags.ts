import type { LucideIcon } from 'lucide-react'
import { Coffee, Headphones, BookOpen } from 'lucide-react'

export interface HeroTag {
  id: string
  label: string
  icon: LucideIcon
  rotation: number
  offset: string
}

export const heroTags: HeroTag[] = [
  { id: 'coffee', label: 'Coffee lover', icon: Coffee, rotation: -6, offset: '0rem' },
  {
    id: 'music',
    label: 'Vinyl collector',
    icon: Headphones,
    rotation: 4,
    offset: '2.5rem',
  },
  { id: 'reader', label: 'Always reading', icon: BookOpen, rotation: -3, offset: '5rem' },
]
