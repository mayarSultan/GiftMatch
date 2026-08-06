import { motion, useReducedMotion } from 'framer-motion'
import { CTAButton } from '@/components/CTAButton'
import { GiftTagStack } from '@/components/GiftTagStack'
import { routes } from '@/utils/routes'
import { Link } from 'react-router-dom'

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-balance font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
          Find the <span className="italic text-primary">perfect gift</span> in under a
          minute.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          Answer five quick questions about who you're shopping for. GiftMatch narrows
          thousands of ideas down to the ones worth giving.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <CTAButton label="Start matching" size="lg" to={routes.quiz} />
          <p className="text-sm text-muted-foreground">No account needed. Free to use.</p>
          <Link
            to={routes.describe}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Or describe them in a sentence instead
          </Link>
        </div>
      </motion.div>

      <GiftTagStack />
    </section>
  )
}
