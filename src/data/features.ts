import type { LucideIcon } from 'lucide-react'
import { Sparkles, Timer, ShieldCheck } from 'lucide-react'

export interface Feature {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    id: 'smart-matching',
    title: 'Smart matching',
    description:
      'GiftMatch weighs occasion, budget, and personality to surface ideas you would not have found on your own.',
    icon: Sparkles,
  },
  {
    id: 'fast',
    title: 'Under a minute',
    description:
      'Five short questions, no lengthy forms. Get a shortlist while the kettle is still boiling.',
    icon: Timer,
  },
  {
    id: 'no-spoilers',
    title: 'Stays private',
    description:
      'No account, no tracking pixels shared with the recipient. Your search stays between you and GiftMatch.',
    icon: ShieldCheck,
  },
]
