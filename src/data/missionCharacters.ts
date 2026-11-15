import type { TranslationKey } from '../i18n';
import { DOSSIER_IDS, FRAGMENT_IDS } from '../utils/constants';

export type MissionCharacterId = 'spirit' | 'opportunity' | 'sojourner' | 'ingenuity' | 'surveyor3' | 'apollo17';
export type MissionCharacterPose = 'idle' | 'speaking' | 'discovering' | 'celebration';

export interface CharacterDialogueLine {
  reaction: TranslationKey;
  message: TranslationKey;
  pose: MissionCharacterPose;
}

/** One chapter of a character's first-person story (dossier panel).
 *  Personality/voice are fictional; every fact mentioned comes from a
 *  sourced `science.*` card in NASA_Data.json. */
export interface CharacterStoryChapter {
  chapter: TranslationKey;
  message: TranslationKey;
  pose: MissionCharacterPose;
}

export interface MissionCharacterProfile {
  name: TranslationKey;
  personality: TranslationKey;
  voiceStyle: TranslationKey;
  alt: TranslationKey;
  fragmentId: string;
  /** Short reactions used as challenge feedback. */
  lines: CharacterDialogueLine[];
  /** Five-chapter story told in the dossier. */
  story: CharacterStoryChapter[];
}

const chapterKeys = [
  'character.chapter.who',
  'character.chapter.mission',
  'character.chapter.moment',
  'character.chapter.journey',
  'character.chapter.legacy',
] as const satisfies readonly TranslationKey[];

const chapterPoses: MissionCharacterPose[] = ['idle', 'speaking', 'discovering', 'speaking', 'celebration'];

function buildStory(id: MissionCharacterId): CharacterStoryChapter[] {
  return chapterKeys.map((chapter, index) => ({
    chapter,
    message: `character.${id}.story${index + 1}` as TranslationKey,
    pose: chapterPoses[index],
  }));
}

const reactionKeys = {
  introduction: 'character.reaction.introduction',
  discovery: 'character.reaction.discovery',
  surprise: 'character.reaction.surprise',
  encouragement: 'character.reaction.encouragement',
  celebration: 'character.reaction.celebration',
} as const satisfies Record<string, TranslationKey>;

export const MISSION_CHARACTER_PROFILES: Record<MissionCharacterId, MissionCharacterProfile> = {
  spirit: {
    name: 'character.spirit.name',
    personality: 'character.spirit.personality',
    voiceStyle: 'character.spirit.voice',
    alt: 'character.spirit.alt',
    fragmentId: FRAGMENT_IDS.SPIRIT,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.spirit.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.spirit.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.spirit.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.spirit.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.spirit.celebration', pose: 'celebration' },
    ],
    story: buildStory('spirit'),
  },
  opportunity: {
    name: 'character.opportunity.name',
    personality: 'character.opportunity.personality',
    voiceStyle: 'character.opportunity.voice',
    alt: 'character.opportunity.alt',
    fragmentId: FRAGMENT_IDS.OPPORTUNITY,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.opportunity.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.opportunity.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.opportunity.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.opportunity.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.opportunity.celebration', pose: 'celebration' },
    ],
    story: buildStory('opportunity'),
  },
  sojourner: {
    name: 'character.sojourner.name',
    personality: 'character.sojourner.personality',
    voiceStyle: 'character.sojourner.voice',
    alt: 'character.sojourner.alt',
    fragmentId: FRAGMENT_IDS.SOJOURNER,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.sojourner.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.sojourner.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.sojourner.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.sojourner.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.sojourner.celebration', pose: 'celebration' },
    ],
    story: buildStory('sojourner'),
  },
  ingenuity: {
    name: 'character.ingenuity.name',
    personality: 'character.ingenuity.personality',
    voiceStyle: 'character.ingenuity.voice',
    alt: 'character.ingenuity.alt',
    fragmentId: FRAGMENT_IDS.INGENUITY,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.ingenuity.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.ingenuity.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.ingenuity.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.ingenuity.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.ingenuity.celebration', pose: 'celebration' },
    ],
    story: buildStory('ingenuity'),
  },
  surveyor3: {
    name: 'character.surveyor3.name',
    personality: 'character.surveyor3.personality',
    voiceStyle: 'character.surveyor3.voice',
    alt: 'character.surveyor3.alt',
    fragmentId: FRAGMENT_IDS.SURVEYOR3,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.surveyor3.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.surveyor3.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.surveyor3.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.surveyor3.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.surveyor3.celebration', pose: 'celebration' },
    ],
    story: buildStory('surveyor3'),
  },
  apollo17: {
    name: 'character.apollo17.name',
    personality: 'character.apollo17.personality',
    voiceStyle: 'character.apollo17.voice',
    alt: 'character.apollo17.alt',
    fragmentId: FRAGMENT_IDS.APOLLO17,
    lines: [
      { reaction: reactionKeys.introduction, message: 'character.apollo17.intro', pose: 'idle' },
      { reaction: reactionKeys.discovery, message: 'character.apollo17.discovery', pose: 'discovering' },
      { reaction: reactionKeys.surprise, message: 'character.apollo17.surprise', pose: 'discovering' },
      { reaction: reactionKeys.encouragement, message: 'character.apollo17.encouragement', pose: 'speaking' },
      { reaction: reactionKeys.celebration, message: 'character.apollo17.celebration', pose: 'celebration' },
    ],
    story: buildStory('apollo17'),
  },
};

export const DOSSIER_CHARACTERS: Record<string, MissionCharacterId[]> = {
  [DOSSIER_IDS.MARS_MER_ROVERS]: ['spirit', 'opportunity'],
  [DOSSIER_IDS.SOJOURNER]: ['sojourner'],
  [DOSSIER_IDS.INGENUITY]: ['ingenuity'],
  [DOSSIER_IDS.SURVEYOR3]: ['surveyor3'],
  [DOSSIER_IDS.APOLLO17]: ['apollo17'],
};

export const OBJECT_CANONICAL_NAME_KEYS: Record<string, TranslationKey> = {
  mars_spirit: 'dossier.record.spirit',
  mars_opportunity: 'dossier.record.opportunity',
  mars_sojourner: 'dossier.record.sojourner',
  mars_ingenuity: 'dossier.record.ingenuity',
  moon_surveyor3: 'dossier.record.surveyor3',
  moon_apollo17_lrv: 'dossier.record.apollo17',
};
