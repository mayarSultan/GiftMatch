import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { useReducedMotion } from 'framer-motion'

export function useCelebrationConfetti(shouldCelebrate: boolean) {
  const hasFired = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!shouldCelebrate || hasFired.current || shouldReduceMotion) return
    hasFired.current = true

    confetti({
      particleCount: 120,
      spread: 70,
      startVelocity: 45,
      origin: { y: 0.3 },
      colors: ['#A23A5C', '#C99A3E', '#EFEAE0'],
    })
  }, [shouldCelebrate, shouldReduceMotion])
}
