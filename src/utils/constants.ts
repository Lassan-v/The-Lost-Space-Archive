/**
 * Constants — The Lost Space Archive
 * Sojourner MVP data, fragment data, constellation positions
 */

import type { SojournerPartDefinition, Fragment, ConstellationStar, ChassisSlot } from '../types';
import type { TranslationKey } from '../i18n';
import type { MissionCharacterId } from '../data/missionCharacters';

// ==========================================================================
// SOJOURNER PARTS DATA (P3 Challenge - Part Builder)
// Based on CHALLENGE_SPECS.md and DATA_CATALOG.md
// ==========================================================================

export const SOJOURNER_PARTS: SojournerPartDefinition[] = [
  {
    id: 'solar-panel',
    icon: 'solar-panel',
    targetSlot: 'solar',
  },
  {
    id: 'front-cameras',
    icon: 'camera',
    targetSlot: 'front-cam',
  },
  {
    id: 'rear-camera',
    icon: 'camera-rear',
    targetSlot: 'rear-cam',
  },
  {
    id: 'apxs-arm',
    icon: 'arm',
    targetSlot: 'apxs',
  },
  {
    id: 'wheels',
    icon: 'wheels',
    targetSlot: 'wheels',
  },
];

// Chassis slots for Sojourner
export const SOJOURNER_SLOTS: Omit<ChassisSlot, 'filled' | 'partId' | 'label'>[] = [
  {
    id: 'solar',
    position: { x: 200, y: 100 },
    size: { width: 140, height: 62 },
  },
  {
    id: 'front-cam',
    position: { x: 344, y: 112 },
    size: { width: 62, height: 62 },
  },
  {
    id: 'rear-cam',
    position: { x: 58, y: 132 },
    size: { width: 58, height: 58 },
  },
  {
    id: 'apxs',
    position: { x: 340, y: 207 },
    size: { width: 88, height: 54 },
  },
  {
    id: 'wheels',
    position: { x: 175, y: 214 },
    size: { width: 216, height: 58 },
  },
];

// ==========================================================================
// FACT CARDS FOR SOJOURNER DOSSIER
// Based on DATA_CATALOG.md and CHALLENGE_SPECS.md
// ==========================================================================

// ==========================================================================
// SOJOURNER FRAGMENT REWARD
// ==========================================================================

export const SOJOURNER_FRAGMENT: Fragment = {
  id: 'sojourner-wheel-track',
  title: "Sojourner's First Wheel Track",
  caption: 'First wheels on Mars. 83 sols. 16 rocks analyzed. Proved small rovers can explore big planets.',
  illustration: 'wheel-track',
};

// ==========================================================================
// CONSTELLATION STAR POSITIONS
// Based on SCENE_ART_DIRECTION.md
// ==========================================================================

export const CONSTELLATION_STARS: Omit<ConstellationStar, 'collected' | 'fragment'>[] = [
  {
    id: 'sojourner-mpf',
    position: { x: 15, y: 70 },
  },
  {
    id: 'spirit-mer-a',
    position: { x: 30, y: 40 },
  },
  {
    id: 'opportunity-mer-b',
    position: { x: 45, y: 25 },
  },
  {
    id: 'ingenuity-mh',
    position: { x: 60, y: 35 },
  },
  {
    id: 'surveyor-3',
    position: { x: 75, y: 60 },
  },
  {
    id: 'apollo17-lrv-3',
    position: { x: 80, y: 75 },
  },
];

// Constellation line connections (from SCENE_ART_DIRECTION.md)
export const CONSTELLATION_LINES = [
  { from: 'sojourner-mpf', to: 'spirit-mer-a' },
  { from: 'spirit-mer-a', to: 'opportunity-mer-b' },
  { from: 'opportunity-mer-b', to: 'ingenuity-mh' },
  { from: 'ingenuity-mh', to: 'surveyor-3' },
  { from: 'surveyor-3', to: 'apollo17-lrv-3' },
];

// ==========================================================================
// MARS MAP PIN POSITIONS (percentage-based for responsive scaling)
// ==========================================================================

export const MARS_MAP_PINS = [
  {
    id: 'sojourner-mpf',
    dossierId: 'sojourner-mpf',
    objectId: 'mars_sojourner',
    nameKey: 'dossier.record.sojourner',
    missionKey: 'map.sojourner',
    locationKey: 'map.site.aresVallis',
    previewKey: 'map.preview.sojourner',
    objectiveKey: 'map.objective.sojourner',
    characterId: 'sojourner',
    position: { x: 45, y: 55 }, // Ares Vallis
    active: true,
  },
  {
    id: 'spirit-mer-a',
    dossierId: 'mars_mer_rovers',
    objectId: 'mars_spirit',
    nameKey: 'dossier.record.spirit',
    missionKey: 'map.spirit',
    locationKey: 'map.site.gusevCrater',
    previewKey: 'map.preview.spirit',
    objectiveKey: 'map.objective.spirit',
    characterId: 'spirit',
    position: { x: 25, y: 35 }, // Gusev Crater
    active: true,
  },
  {
    id: 'opportunity-mer-b',
    dossierId: 'mars_mer_rovers',
    objectId: 'mars_opportunity',
    nameKey: 'dossier.record.opportunity',
    missionKey: 'map.opportunity',
    locationKey: 'map.site.meridianiPlanum',
    previewKey: 'map.preview.opportunity',
    objectiveKey: 'map.objective.opportunity',
    characterId: 'opportunity',
    position: { x: 65, y: 40 }, // Meridiani Planum
    active: true,
  },
  {
    id: 'ingenuity-mh',
    dossierId: 'ingenuity-mh',
    objectId: 'mars_ingenuity',
    nameKey: 'dossier.record.ingenuity',
    missionKey: 'map.ingenuity',
    locationKey: 'map.site.jezeroCrater',
    previewKey: 'map.preview.ingenuity',
    objectiveKey: 'map.objective.ingenuity',
    characterId: 'ingenuity',
    position: { x: 55, y: 65 }, // Jezero Crater
    active: true,
  },
] satisfies { id: string; dossierId: string; objectId: string; nameKey: TranslationKey; missionKey: TranslationKey; locationKey: TranslationKey; previewKey: TranslationKey; objectiveKey: TranslationKey; characterId: MissionCharacterId; position: { x: number; y: number }; active: boolean }[];

// ==========================================================================
// MOON MAP PIN POSITIONS (for future use)
// ==========================================================================

export const MOON_MAP_PINS = [
  {
    id: 'surveyor-3',
    dossierId: 'surveyor-3',
    objectId: 'moon_surveyor3',
    nameKey: 'dossier.record.surveyor3',
    missionKey: 'map.surveyor',
    locationKey: 'map.site.oceanusProcellarum',
    previewKey: 'map.preview.surveyor',
    objectiveKey: 'map.objective.surveyor',
    characterId: 'surveyor3',
    position: { x: 30, y: 45 },
    active: true,
  },
  {
    id: 'apollo17-lrv-3',
    dossierId: 'apollo17-lrv-3',
    objectId: 'moon_apollo17_lrv',
    nameKey: 'dossier.record.apollo17',
    missionKey: 'map.apollo17',
    locationKey: 'map.site.taurusLittrow',
    previewKey: 'map.preview.apollo17',
    objectiveKey: 'map.objective.apollo17',
    characterId: 'apollo17',
    position: { x: 70, y: 40 },
    active: true,
  },
] satisfies { id: string; dossierId: string; objectId: string; nameKey: TranslationKey; missionKey: TranslationKey; locationKey: TranslationKey; previewKey: TranslationKey; objectiveKey: TranslationKey; characterId: MissionCharacterId; position: { x: number; y: number }; active: boolean }[];

// ==========================================================================
// CHALLENGE FEEDBACK MESSAGES
// ==========================================================================

// ==========================================================================
// ROUTE NAMES
// ==========================================================================

export const ROUTES = {
  WELCOME: '/',
  STATION: '/station',
  MARS_MAP: '/mars',
  MOON_MAP: '/moon',
  DOSSIER: '/dossier',
  CHALLENGE: '/challenge',
  FRAGMENT: '/fragment',
  CONSTELLATION: '/constellation',
  SETTINGS: '/settings',
} as const;

// ==========================================================================
// DOSSIER IDs
// ==========================================================================

export const DOSSIER_IDS = {
  MARS_MER_ROVERS: 'mars_mer_rovers',
  SOJOURNER: 'sojourner-mpf',
  SPIRIT: 'spirit-mer-a',
  OPPORTUNITY: 'opportunity-mer-b',
  INGENUITY: 'ingenuity-mh',
  SURVEYOR3: 'surveyor-3',
  APOLLO15: 'apollo15-lrv-1',
  APOLLO16: 'apollo16-lrv-2',
  APOLLO17: 'apollo17-lrv-3',
} as const;

export const PLAYABLE_DOSSIER_IDS = [
  DOSSIER_IDS.MARS_MER_ROVERS,
  DOSSIER_IDS.SOJOURNER,
  DOSSIER_IDS.INGENUITY,
  DOSSIER_IDS.SURVEYOR3,
  DOSSIER_IDS.APOLLO17,
] as const;

// ==========================================================================
// FRAGMENT IDs
// ==========================================================================

export const FRAGMENT_IDS = {
  SOJOURNER: 'sojourner-wheel-track',
  SPIRIT: 'spirit-silica-shard',
  OPPORTUNITY: 'opportunity-hematite-blueberry',
  INGENUITY: 'ingenuity-rotor-blade',
  SURVEYOR3: 'surveyor3-scoop-tip',
  APOLLO15: 'genesis-rock-shard',
  APOLLO16: 'descartes-breccia-chip',
  APOLLO17: 'orange-soil-vial',
} as const;

export const PLAYABLE_FRAGMENT_IDS = [
  FRAGMENT_IDS.SOJOURNER,
  FRAGMENT_IDS.SPIRIT,
  FRAGMENT_IDS.OPPORTUNITY,
  FRAGMENT_IDS.INGENUITY,
  FRAGMENT_IDS.SURVEYOR3,
  FRAGMENT_IDS.APOLLO17,
] as const;

export function countPlayableFragments(collected: string[]): number {
  return collected.filter((id) => (PLAYABLE_FRAGMENT_IDS as readonly string[]).includes(id)).length;
}

// ==========================================================================
// SOURCE IDs FOR SIMULATION BANNER
// ==========================================================================
