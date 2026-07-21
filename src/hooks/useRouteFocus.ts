import { useEffect, useRef } from 'react'

// Shared across every layout that uses this hook, so only the very first
// paint of the whole app is skipped — not the first mount of each layout.
let hasHandledInitialLoad = false

export function useRouteFocus(pathname: string) {
  const mainRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!hasHandledInitialLoad) {
      hasHandledInitialLoad = true
      return
    }
    mainRef.current?.focus()
  }, [pathname])

  return mainRef
}
