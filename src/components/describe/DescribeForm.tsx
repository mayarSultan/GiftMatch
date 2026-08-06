import { useState } from 'react'
import type { FormEvent } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MAX_DESCRIPTION_LENGTH } from '@/types/aiProfile'

interface DescribeFormProps {
  onSubmit: (description: string) => void
  isLoading: boolean
}

export function DescribeForm({ onSubmit, isLoading }: DescribeFormProps) {
  const [description, setDescription] = useState('')
  const remaining = MAX_DESCRIPTION_LENGTH - description.length
  const canSubmit = description.trim().length > 0 && remaining >= 0 && !isLoading

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (canSubmit) onSubmit(description.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="gift-description" className="text-sm font-medium">
        Describe who you're shopping for
      </label>
      <textarea
        id="gift-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="My sister loves books, coffee, and plants."
        rows={4}
        className="resize-none rounded-2xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-primary"
      />
      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}
        >
          {remaining} characters left
        </span>
        <Button type="submit" disabled={!canSubmit}>
          <Sparkles aria-hidden="true" />
          {isLoading ? 'Thinking…' : 'Find gifts'}
        </Button>
      </div>
    </form>
  )
}
