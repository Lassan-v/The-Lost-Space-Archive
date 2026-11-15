/**
 * ProgressProvider — The Lost Space Archive
 * Manages game progress with localStorage persistence
 */

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { ProgressContextValue, ProgressState, LocationState, ChallengeProgress } from '../../types';
import {
  loadProgress,
  saveProgress,
  updateChallengeProgress as updateChallengeProgressUtil,
  completeDossier as completeDossierUtil,
  markDossierVisited as markDossierVisitedUtil,
  setCurrentLocation as setCurrentLocationUtil,
  resetProgress as resetProgressUtil,
  onStorageChange,
} from '../../utils/storage';

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const cleanup = onStorageChange(externalProgress => {
      setProgress(externalProgress);
    });
    return cleanup;
  }, []);

  // Persist progress to localStorage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeDossier = useCallback((dossierId: string, fragmentId: string | string[]) => {
    setProgress(completeDossierUtil(dossierId, fragmentId));
  }, []);

  const updateChallengeProgress = useCallback((dossierId: string, challengeProgress: ChallengeProgress) => {
    setProgress(updateChallengeProgressUtil(dossierId, challengeProgress));
  }, []);

  const markDossierVisited = useCallback((dossierId: string) => {
    setProgress(markDossierVisitedUtil(dossierId));
  }, []);

  const setCurrentLocation = useCallback((location: LocationState) => {
    setProgress(setCurrentLocationUtil(location));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(resetProgressUtil());
  }, []);

  const value: ProgressContextValue = {
    completedDossiers: progress.completedDossiers,
    visitedDossiers: progress.visitedDossiers,
    collectedFragments: progress.collectedFragments,
    currentLocation: progress.currentLocation,
    challengeProgress: progress.challengeProgress,
    completeDossier,
    markDossierVisited,
    updateChallengeProgress,
    setCurrentLocation,
    resetProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
