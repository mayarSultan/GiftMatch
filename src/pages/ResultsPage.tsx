import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GiftCard } from '@/components/results/GiftCard'
import { EmptyResultsState } from '@/components/results/EmptyResultsState'
import { useQuizResults } from '@/hooks/useQuizResults'
import { useCelebrationConfetti } from '@/hooks/useCelebrationConfetti'
import { useQuizStore } from '@/store/useQuizStore'
import { routes } from '@/utils/routes'

export function ResultsPage() {
  const navigate = useNavigate()
  const resetQuiz = useQuizStore((state) => state.resetQuiz)
  const { recommendations, hasAnswers, isEmpty } = useQuizResults()

  useCelebrationConfetti(hasAnswers && !isEmpty)

  function handleRetake() {
    resetQuiz()
    navigate(routes.quiz)
  }

  if (!hasAnswers) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <EmptyResultsState
          title="No quiz answers yet"
          message="Take the quiz first and we'll match you with gift ideas in seconds."
          actionLabel="Start the quiz"
          onAction={() => navigate(routes.quiz)}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft aria-hidden="true" />
          Back
        </Button>
        <Button variant="outline" onClick={handleRetake}>
          Retake quiz
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <h1 className="font-display text-4xl">Your top matches</h1>
        <p className="mt-2 text-muted-foreground">
          Based on your answers, these are the gifts most worth giving.
        </p>
      </motion.div>

      <p className="sr-only" role="status" aria-live="polite">
        {isEmpty
          ? 'No strong matches found.'
          : `${recommendations.length} gift ${recommendations.length === 1 ? 'match' : 'matches'} found.`}
      </p>

      {isEmpty ? (
        <div className="mt-10">
          <EmptyResultsState
            title="No strong matches yet"
            message="That combination didn't match anything closely. Try adjusting a few answers."
            actionLabel="Retake quiz"
            onAction={handleRetake}
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((scoredGift, index) => (
            <GiftCard key={scoredGift.gift.id} scoredGift={scoredGift} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
