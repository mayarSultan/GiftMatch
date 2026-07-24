import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRouteFocus } from '@/hooks/useRouteFocus'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Owns the app's single <main> landmark, focus-on-navigate behavior, and
 * the fade/slide transition between routes. Both MarketingLayout and
 * FocusedLayout render this once each — never nest two of these, since
 * a page can only have one <main> landmark at a time.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const mainRef = useRouteFocus(location.pathname)

  return (
    <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
