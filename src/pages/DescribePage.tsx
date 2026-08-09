import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { DescribeForm } from '@/components/describe/DescribeForm'
import { ExtractedProfileSummary } from '@/components/describe/ExtractedProfileSummary'
import { Button } from '@/components/ui/button'
import { useDescribeGift } from '@/hooks/useDescribeGift'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { useRecentSearchesStore } from '@/store/useRecentSearchesStore'
import { encodeAnswersToSearchParams } from '@/utils/quizAnswersSerializer'
import { routes } from '@/utils/routes'
import type { QuizAnswers } from '@/types/quiz'

export function DescribePage() {
  const navigate = useNavigate()
  const addSearch = useRecentSearchesStore((state) => state.addSearch)
  const { status, profile, error, submitDescription, reset } = useDescribeGift()

  useDocumentMeta(
    'Describe your gift',
    'Tell us about them in your own words and we will find gift ideas.',
  )

  function handleFindGifts() {
    if (!profile) return

    const answers: QuizAnswers = {
      recipient: profile.recipient,
      style: profile.style,
    }

    addSearch(answers, profile.tags)
    navigate(`${routes.results}?${encodeAnswersToSearchParams(answers, profile.tags)}`)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl">Describe your gift</h1>
      <p className="mt-2 text-muted-foreground">
        Not in the mood for five questions? Tell us in a sentence instead.
      </p>

      <div className="mt-8">
        <DescribeForm onSubmit={submitDescription} isLoading={status === 'loading'} />
      </div>

      <AnimatePresence mode="wait">
        {status === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-2 text-muted-foreground"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Reading your description…
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            role="alert"
          >
            {error}
          </motion.div>
        )}

        {status === 'success' && profile && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col gap-4"
          >
            <ExtractedProfileSummary profile={profile} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFindGifts}>See matching gifts</Button>
              <Button variant="ghost" onClick={reset}>
                Try a different description
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
