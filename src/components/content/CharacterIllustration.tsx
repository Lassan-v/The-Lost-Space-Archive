/** Renders Spark or a reusable pose from the approved mission-character SVG sheet. */

import { SparkIllustration, type SparkPose } from './SparkIllustration';
import type { MissionCharacterId, MissionCharacterPose } from '../../data/missionCharacters';
import './CharacterIllustration.css';

export type CharacterPose =
  | 'idle'
  | 'happy'
  | 'thinking'
  | 'celebrate'
  | 'wave'
  | 'welcoming'
  | 'speaking'
  | 'projecting'
  | 'curious'
  | 'surprised'
  | 'explaining'
  | 'discovering'
  | 'surprise'
  | 'celebration';

interface CharacterIllustrationProps {
  character: 'keeper' | MissionCharacterId;
  pose?: CharacterPose;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
  ariaLabel: string;
}

const missionSpritePrefix: Record<MissionCharacterId, string> = {
  spirit: 'spirit',
  opportunity: 'opportunity',
  sojourner: 'sojourner',
  ingenuity: 'ingenuity',
  surveyor3: 'surveyor',
  apollo17: 'apollo17',
};

const missionPoseByPose: Record<CharacterPose, MissionCharacterPose> = {
  idle: 'idle',
  happy: 'speaking',
  thinking: 'discovering',
  celebrate: 'celebration',
  wave: 'speaking',
  welcoming: 'speaking',
  speaking: 'speaking',
  projecting: 'speaking',
  curious: 'discovering',
  surprised: 'discovering',
  explaining: 'speaking',
  discovering: 'discovering',
  surprise: 'discovering',
  celebration: 'celebration',
};

function getSparkPose(pose: CharacterPose): SparkPose {
  switch (pose) {
    case 'wave':
    case 'welcoming':
      return 'welcoming';
    case 'speaking':
      return 'speaking';
    case 'explaining':
      return 'explaining';
    case 'projecting':
      return 'projecting';
    case 'thinking':
    case 'curious':
    case 'discovering':
      return 'discovering';
    case 'surprised':
    case 'surprise':
      return 'surprise';
    case 'happy':
    case 'celebrate':
    case 'celebration':
      return 'celebration';
    case 'idle':
      return 'idle';
  }
}

export function CharacterIllustration({
  character,
  pose = 'idle',
  size = 'medium',
  className = '',
  ariaLabel,
}: CharacterIllustrationProps) {
  const sizeClass = `character-illustration--${size}`;

  return (
    <div
      className={`character-illustration ${sizeClass} ${className}`.trim()}
      role="img"
      aria-label={ariaLabel}
      data-character={character}
      data-pose={pose}
    >
      {character === 'keeper' ? (
        <SparkIllustration pose={getSparkPose(pose)} />
      ) : (
        <svg
          className="character-illustration__svg"
          viewBox="0 0 480 400"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`#${missionSpritePrefix[character]}-${missionPoseByPose[pose]}`} />
        </svg>
      )}
    </div>
  );
}
