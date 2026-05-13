import { useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

const THEME_KEY = 'chrome-explorer-theme'

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') {
    return saved
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme)
    document.documentElement.setAttribute('data-light-theme', 'light')
    document.documentElement.setAttribute('data-dark-theme', 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = useMemo(() => {
    return () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme }
}
