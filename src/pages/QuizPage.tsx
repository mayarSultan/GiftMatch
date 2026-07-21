import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { OptionGroup } from '@/components/quiz/OptionGroup'
import { QuizNavigation } from '@/components/quiz/QuizNavigation'
import { useQuizNavigation } from '@/hooks/useQuizNavigation'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useQuizStore } from '@/store/useQuizStore'
import { useRecentSearchesStore } from '@/store/useRecentSearchesStore'
import { encodeAnswersToSearchParams } from '@/utils/quizAnswersSerializer'
import { routes } from '@/utils/routes'

export function QuizPage() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()
  const answers = useQuizStore((state) => state.answers)
  const addSearch = useRecentSearchesStore((state) => state.addSearch)
  const {
    currentQuestion,
    stepIndex,
    totalSteps,
    progress,
    selectedValue,
    canGoNext,
    isFirstStep,
    isLastStep,
    selectAnswer,
    goNext,
    goPrev,
  } = useQuizNavigation()

  useDocumentMeta(
    'Take the quiz',
    'Answer five quick questions to find the perfect gift.',
  )

  function handleNext() {
    if (isLastStep) {
      addSearch(answers)
      navigate(`${routes.results}?${encodeAnswersToSearchParams(answers)}`)
      return
    }
    goNext()
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Question {stepIndex + 1} of {totalSteps}
      </p>
      <div className="mt-3">
        <ProgressBar value={progress} label={`Step ${stepIndex + 1} of ${totalSteps}`} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="mt-10"
        >
          <h1 className="font-display text-3xl">{currentQuestion.title}</h1>
          {currentQuestion.subtitle && (
            <p className="mt-2 text-muted-foreground">{currentQuestion.subtitle}</p>
          )}

          <div className="mt-8">
            <OptionGroup
              legend={currentQuestion.title}
              options={currentQuestion.options}
              value={selectedValue}
              onChange={(value) => selectAnswer(currentQuestion.id, value)}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <QuizNavigation
        onPrev={goPrev}
        onNext={handleNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        canGoNext={canGoNext}
      />
    </div>
  )
}
