/**
 * Type definitions for The Lost Space Archive
 * Based on DATA_CATALOG.md schema and component inventory
 */

// Hardware record from DATA_CATALOG.md
export interface HardwareRecord {
  id: string;
  canonicalName: string;
  destination: 'Mars' | 'Moon';
  objectType: string;
  mission: string;
  launchDate: string;
  landingDate: string;
  deploymentDate: string | null;
  objective: string;
  instruments: string[];
  scientificResults: string[];
  operationalTimeline: TimelineEvent[];
  missionEnd: string;
  lastContact: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
    frame: string;
    note: string;
  };
  uncertainties: string[];
  sources: string[];
  imageCredits: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  label: 'VERIFIED' | 'CORROBORATED' | 'UNCERTAIN';
  source: string;
}

// Sojourner-specific data for the MVP
export interface SojournerPartDefinition {
  id: string;
  icon: string;
  targetSlot: string;
}

export interface SojournerParts extends SojournerPartDefinition {
  label: string;
  job: string;
}

// Challenge progress
export interface ChallengeProgress {
  placedParts: string[]; // part IDs that have been placed
  currentPart?: string; // part currently being dragged/selected
}

// Progress state for localStorage
export interface ProgressState {
  completedDossiers: string[];
  visitedDossiers: string[];
  collectedFragments: string[];
  currentLocation: LocationState;
  challengeProgress: Record<string, ChallengeProgress>;
}

export type LocationState =
  | 'welcome'
  | 'station'
  | 'mars-map'
  | 'moon-map'
  | 'dossier'
  | 'challenge'
  | 'fragment'
  | 'constellation';

export type RouteName =
  | 'welcome'
  | 'station'
  | 'mars-map'
  | 'moon-map'
  | 'dossier'
  | 'challenge'
  | 'fragment'
  | 'constellation'
  | 'settings';

// Fragment reward data
export interface Fragment {
  id: string;
  title: string;
  caption: string;
  illustration: string;
}

// Constellation star
export interface ConstellationStar {
  id: string;
  position: { x: number; y: number };
  collected: boolean;
  fragment?: Fragment;
}

// Settings state
export interface SettingsState {
  reducedMotion: boolean;
  highContrast: boolean;
  audioEnabled: boolean;
  narrationEnabled: boolean;
}

// Screen reader announcement
export interface Announcement {
  message: string;
  priority: 'polite' | 'assertive';
}

// Simplified fact for dossier
export interface FactCardData {
  factId?: string;
  category?: string;
  fact: string;
  sourceId: string;
  sourceUrl?: string;
  termDefinitions?: Record<string, string>;
}

// Chassis slot for P3 challenge
export interface ChassisSlot {
  id: string;
  label: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  filled: boolean;
  partId?: string;
}

// Accessibility context
export interface AccessibilityContextValue {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  audioEnabled: boolean;
  narrationEnabled: boolean;
  toggleAudio: () => void;
  toggleNarration: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

// Theme context
export interface ThemeContextValue {
  highContrast: boolean;
  toggleHighContrast: () => void;
}

// Progress context
export interface ProgressContextValue {
  completedDossiers: string[];
  visitedDossiers: string[];
  collectedFragments: string[];
  currentLocation: LocationState;
  challengeProgress: Record<string, ChallengeProgress>;
  completeDossier: (dossierId: string, fragmentId: string | string[]) => void;
  markDossierVisited: (dossierId: string) => void;
  updateChallengeProgress: (dossierId: string, progress: ChallengeProgress) => void;
  setCurrentLocation: (location: LocationState) => void;
  resetProgress: () => void;
}

// Audio context
export interface AudioContextValue {
  playSound: (sound: 'success' | 'error' | 'place' | 'hint' | 'click') => void;
  speak: (text: string, priority?: 'polite' | 'assertive') => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
}
