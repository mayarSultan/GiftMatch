import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Fires a one-time confetti burst on genuine quiz completion.
 * Skipped for reduced-motion users. The confetti library itself is
 * dynamically imported so it never ships in the initial bundle —
 * only fetched if a celebration is actually going to happen.
 */
export function useCelebrationConfetti(shouldCelebrate: boolean) {
  const hasFired = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!shouldCelebrate || hasFired.current || shouldReduceMotion) return
    hasFired.current = true

    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({
        particleCount: 120,
        spread: 70,
        startVelocity: 45,
        origin: { y: 0.3 },
        colors: ['#A23A5C', '#C99A3E', '#EFEAE0'],
      })
    })
  }, [shouldCelebrate, shouldReduceMotion])
}
