/** Theme compatibility facade: accessibility owns the persistent preference. */
import { createContext, useContext, type ReactNode } from 'react';
import type { ThemeContextValue } from '../../types';
import { useAccessibility } from './AccessibilityProvider';
const ThemeContext = createContext<ThemeContextValue | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { highContrast, toggleHighContrast } = useAccessibility();
  return <ThemeContext.Provider value={{ highContrast, toggleHighContrast }}>{children}</ThemeContext.Provider>;
}
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
