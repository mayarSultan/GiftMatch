import { motion, useReducedMotion } from 'framer-motion'
import { features } from '@/data/features'

export function Features() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-md text-3xl leading-tight sm:text-4xl">
          Gift-giving, without the guesswork.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow duration-200 hover:shadow-md"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
