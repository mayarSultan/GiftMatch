import { motion, useReducedMotion } from 'framer-motion'
import { heroTags } from '@/data/heroTags'

export function GiftTagStack() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative mx-auto h-72 w-full max-w-sm sm:h-80" aria-hidden="true">
      {heroTags.map((tag, index) => {
        const Icon = tag.icon
        return (
          <motion.div
            key={tag.id}
            className="absolute left-1/2 top-0 w-56 -translate-x-1/2 rounded-2xl border-2 border-dashed border-border bg-card p-5 shadow-sm"
            style={{ marginTop: tag.offset }}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, rotate: tag.rotation }
                : {
                    opacity: 1,
                    rotate: tag.rotation,
                    y: [0, -8, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.5, delay: index * 0.12 }
                : {
                    opacity: { duration: 0.5, delay: index * 0.12 },
                    rotate: { duration: 0.5, delay: index * 0.12 },
                    y: {
                      duration: 3.5 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3,
                    },
                  }
            }
          >
            <span className="absolute -top-1.5 left-6 size-3 rounded-full border-2 border-border bg-background" />
            <Icon className="size-5 text-primary" />
            <p className="mt-3 font-display text-lg">{tag.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
