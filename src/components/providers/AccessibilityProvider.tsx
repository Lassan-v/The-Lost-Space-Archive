/**
 * AccessibilityProvider — The Lost Space Archive
 * Manages reduced motion, high contrast, audio settings, and screen reader announcements
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import type { AccessibilityContextValue } from '../../types';
import { announce as announceUtil } from '../../utils/accessibility';
import { loadSettings, saveSettings } from '../../utils/storage';

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

// Initialize state from media queries to avoid setState in effect
function getInitialReducedMotion(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

function getInitialHighContrast(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-contrast: more)').matches;
  }
  return false;
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [initialSettings] = useState(loadSettings);
  const [reducedMotion, setReducedMotion] = useState(() => initialSettings.reducedMotion || getInitialReducedMotion());
  const [highContrast, setHighContrast] = useState(() => initialSettings.highContrast || getInitialHighContrast());
  const [audioEnabled, setAudioEnabled] = useState(initialSettings.audioEnabled);
  const [narrationEnabled, setNarrationEnabled] = useState(initialSettings.narrationEnabled);

  const reducedMotionRef = useRef(reducedMotion);
  const highContrastRef = useRef(highContrast);

  // Sync refs with state
  useEffect(() => { reducedMotionRef.current = reducedMotion; }, [reducedMotion]);
  useEffect(() => { highContrastRef.current = highContrast; }, [highContrast]);

  useEffect(() => {
    saveSettings({ reducedMotion, highContrast, audioEnabled, narrationEnabled });
  }, [reducedMotion, highContrast, audioEnabled, narrationEnabled]);

  // Reduced motion from OS preference - listen for changes only
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // High contrast from OS preference - listen for changes only
  useEffect(() => {
    const mql = window.matchMedia('(prefers-contrast: more)');

    const handler = (e: MediaQueryListEvent) => setHighContrast(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Apply reduced motion class to document
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [reducedMotion]);

  // Apply high contrast class to document
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(prev => !prev);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => !prev);
  }, []);

  const toggleNarration = useCallback(() => {
    setNarrationEnabled(prev => !prev);
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceUtil(message, priority);
  }, []);

  const value: AccessibilityContextValue = {
    reducedMotion,
    toggleReducedMotion,
    highContrast,
    toggleHighContrast,
    audioEnabled,
    narrationEnabled,
    toggleAudio,
    toggleNarration,
    announce,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
