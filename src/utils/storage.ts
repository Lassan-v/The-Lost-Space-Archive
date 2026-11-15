/**
 * LocalStorage Utility — The Lost Space Archive
 * Handles progress persistence with fallback for private browsing
 */

import type { ProgressState, LocationState, ChallengeProgress } from '../types';

// Storage keys
const STORAGE_KEYS = {
  PROGRESS: 'lost-space-archive-progress',
  SETTINGS: 'lost-space-archive-settings',
} as const;

// Default progress state
const DEFAULT_PROGRESS: ProgressState = {
  completedDossiers: [],
  visitedDossiers: [],
  collectedFragments: [],
  currentLocation: 'welcome',
  challengeProgress: {},
};

function createDefaultProgress(): ProgressState {
  return {
    ...DEFAULT_PROGRESS,
    completedDossiers: [],
    visitedDossiers: [],
    collectedFragments: [],
    challengeProgress: {},
  };
}

// Check if localStorage is available
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Load progress from localStorage
export function loadProgress(): ProgressState {
  if (!isStorageAvailable()) {
    console.warn('localStorage unavailable, using in-memory fallback');
    return { ...DEFAULT_PROGRESS };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!stored) return { ...DEFAULT_PROGRESS };

    const parsed = JSON.parse(stored) as ProgressState;

    // Validate and merge with defaults
    return {
      completedDossiers: Array.isArray(parsed.completedDossiers) ? parsed.completedDossiers : [],
      visitedDossiers: Array.isArray(parsed.visitedDossiers) ? parsed.visitedDossiers : [],
      collectedFragments: Array.isArray(parsed.collectedFragments) ? parsed.collectedFragments : [],
      currentLocation: isValidLocation(parsed.currentLocation) ? parsed.currentLocation : 'welcome',
      challengeProgress: parsed.challengeProgress && typeof parsed.challengeProgress === 'object'
        ? parsed.challengeProgress
        : {},
    };
  } catch (error) {
    console.error('Failed to load progress:', error);
    return { ...DEFAULT_PROGRESS };
  }
}

export function markDossierVisited(dossierId: string): ProgressState {
  const current = loadProgress();
  const updated = { ...current, visitedDossiers: [...new Set([...current.visitedDossiers, dossierId])] };
  saveProgress(updated);
  return updated;
}

// Save progress to localStorage
export function saveProgress(progress: ProgressState): boolean {
  if (!isStorageAvailable()) {
    console.warn('localStorage unavailable, progress not persisted');
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Failed to save progress:', error);
    return false;
  }
}

// Update specific progress fields
export function updateProgress(updates: Partial<ProgressState>): ProgressState {
  const current = loadProgress();
  const updated = { ...current, ...updates };
  saveProgress(updated);
  return updated;
}

// Update challenge progress for a specific dossier
export function updateChallengeProgress(
  dossierId: string,
  progress: ChallengeProgress
): ProgressState {
  const current = loadProgress();
  const updated = {
    ...current,
    challengeProgress: {
      ...current.challengeProgress,
      [dossierId]: progress,
    },
  };
  saveProgress(updated);
  return updated;
}

// Complete a dossier and collect fragment
export function completeDossier(dossierId: string, fragmentIds: string | string[]): ProgressState {
  const current = loadProgress();
  const additions = Array.isArray(fragmentIds) ? fragmentIds : [fragmentIds];
  const updated = {
    ...current,
    completedDossiers: [...new Set([...current.completedDossiers, dossierId])],
    collectedFragments: [...new Set([...current.collectedFragments, ...additions])],
    currentLocation: 'fragment' as LocationState,
    challengeProgress: {
      ...current.challengeProgress,
      [dossierId]: { placedParts: [] }, // Reset challenge progress
    },
  };
  saveProgress(updated);
  return updated;
}

// Set current location
export function setCurrentLocation(location: LocationState): ProgressState {
  const current = loadProgress();
  const updated = { ...current, currentLocation: location };
  saveProgress(updated);
  return updated;
}

// Reset all progress (dev only)
export function resetProgress(): ProgressState {
  const freshProgress = createDefaultProgress();
  saveProgress(freshProgress);
  return freshProgress;
}

// Load settings
export interface SettingsState {
  reducedMotion: boolean;
  highContrast: boolean;
  audioEnabled: boolean;
  narrationEnabled: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  reducedMotion: false,
  highContrast: false,
  audioEnabled: true,
  narrationEnabled: true,
};

export function loadSettings(): SettingsState {
  if (!isStorageAvailable()) return { ...DEFAULT_SETTINGS };

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) return { ...DEFAULT_SETTINGS };

    const parsed = JSON.parse(stored) as Partial<SettingsState>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings: SettingsState): boolean {
  if (!isStorageAvailable()) return false;

  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

// Validation helpers
function isValidLocation(location: unknown): location is LocationState {
  const validLocations = [
    'welcome',
    'station',
    'mars-map',
    'moon-map',
    'dossier',
    'challenge',
    'fragment',
    'constellation',
  ] as const;
  return typeof location === 'string' && (validLocations as readonly string[]).includes(location);
}

// Storage event listener for cross-tab sync
export function onStorageChange(
  callback: (progress: ProgressState) => void
): () => void {
  if (!isStorageAvailable()) return () => {};

  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEYS.PROGRESS && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue) as Partial<ProgressState>;
        callback({
          ...DEFAULT_PROGRESS,
          ...parsed,
          completedDossiers: Array.isArray(parsed.completedDossiers) ? parsed.completedDossiers : [],
          visitedDossiers: Array.isArray(parsed.visitedDossiers) ? parsed.visitedDossiers : [],
          collectedFragments: Array.isArray(parsed.collectedFragments) ? parsed.collectedFragments : [],
          challengeProgress: parsed.challengeProgress && typeof parsed.challengeProgress === 'object' ? parsed.challengeProgress : {},
        });
      } catch {
        // Ignore parse errors
      }
    }
  };

  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}
