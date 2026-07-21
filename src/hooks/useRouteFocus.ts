import { useEffect, useRef } from 'react'

export function useRouteFocus(pathname: string) {
  const mainRef = useRef<HTMLElement | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus()
  }, [pathname])

  return mainRef
}
