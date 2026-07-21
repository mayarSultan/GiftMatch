import { forwardRef } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { QuizOption } from '@/types/quiz'
import { cn } from '@/utils/cn'

interface QuizOptionCardProps {
  option: QuizOption
  selected: boolean
  tabIndex: number
  onSelect: () => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
}

export const QuizOptionCard = forwardRef<HTMLButtonElement, QuizOptionCardProps>(
  ({ option, selected, tabIndex, onSelect, onKeyDown }, ref) => {
    const Icon = option.icon
    const shouldReduceMotion = useReducedMotion()

    return (
      <motion.button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        tabIndex={tabIndex}
        onClick={onSelect}
        onKeyDown={onKeyDown}
        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.15 }}
        className={cn(
          'flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition-colors',
          selected
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card hover:border-primary/40',
        )}
      >
        <Icon
          className={cn(
            'size-5 shrink-0',
            selected ? 'text-primary' : 'text-muted-foreground',
          )}
          aria-hidden="true"
        />
        <span className="font-medium">{option.label}</span>
      </motion.button>
    )
  },
)
QuizOptionCard.displayName = 'QuizOptionCard'
