import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyResultsStateProps {
  title: string
  message: string
  actionLabel: string
  onAction: () => void
}

export function EmptyResultsState({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyResultsStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary">
        <Gift className="size-6 text-primary" aria-hidden="true" />
      </div>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="max-w-sm text-muted-foreground">{message}</p>
      <Button onClick={onAction}>{actionLabel}</Button>
    </motion.div>
  )
}
