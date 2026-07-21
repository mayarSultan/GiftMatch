import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuizNavigationProps {
  onPrev: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
  canGoNext: boolean
}

export function QuizNavigation({
  onPrev,
  onNext,
  isFirstStep,
  isLastStep,
  canGoNext,
}: QuizNavigationProps) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
      <Button variant="ghost" onClick={onPrev} disabled={isFirstStep}>
        <ArrowLeft aria-hidden="true" />
        Back
      </Button>
      <Button onClick={onNext} disabled={!canGoNext}>
        {isLastStep ? 'See my matches' : 'Next'}
        {isLastStep ? <Sparkles aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
      </Button>
    </div>
  )
}
