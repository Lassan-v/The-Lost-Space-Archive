/**
 * useHighContrast Hook — The Lost Space Archive
 * React hook for prefers-contrast media query
 */

import { useState, useEffect } from 'react';

function getInitialHighContrast(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-contrast: more)').matches;
  }
  return false;
}

export function useHighContrast(): boolean {
  const [highContrast, setHighContrast] = useState(getInitialHighContrast);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-contrast: more)');

    const handler = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return highContrast;
}