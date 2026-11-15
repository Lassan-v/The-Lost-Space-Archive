/**
 * useBreakpoint Hook — The Lost Space Archive
 * React hook for responsive breakpoints
 */

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

function getInitialBreakpoint(): Breakpoint {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    if (width <= 640) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }
  return 'mobile';
}

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getInitialBreakpoint);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width <= 640) setBreakpoint('mobile');
      else if (width <= 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return breakpoint;
}

function getInitialMediaQuery(query: string): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => getInitialMediaQuery(query));

  useEffect(() => {
    const mql = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}