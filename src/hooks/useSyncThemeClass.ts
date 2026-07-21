import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

export function useSyncThemeClass() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
}
