import type { ThemeMode } from '../hooks/useTheme'

interface ThemeToggleProps {
  theme: ThemeMode
  onToggle: () => void
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button type="button" className="btn" onClick={onToggle}>
      {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
    </button>
  )
}
