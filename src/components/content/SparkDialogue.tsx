import { useAudio } from '../providers/AudioProvider';
import { useLanguage } from '../../i18n';
import { CharacterIllustration, type CharacterPose } from './CharacterIllustration';
import './SparkDialogue.css';

interface SparkDialogueProps {
  message: string;
  className?: string;
  showCharacter?: boolean;
  pose?: CharacterPose;
  live?: boolean;
}

export function SparkDialogue({ message, className = '', showCharacter = false, pose = 'speaking', live = false }: SparkDialogueProps) {
  const { speak } = useAudio();
  const { t } = useLanguage();

  return (
    <div className={`spark-dialogue${showCharacter ? ' spark-dialogue--guided' : ''} ${className}`.trim()}>
      {showCharacter && (
        <CharacterIllustration
          character="keeper"
          pose={pose}
          size="small"
          className="spark-dialogue__character"
          ariaLabel={t('spark.alt')}
        />
      )}
      <div className="spark-dialogue__content">
        <p className="spark-dialogue__message" aria-live={live ? 'polite' : undefined} aria-atomic={live ? 'true' : undefined}>{message}</p>
        <button
          className="spark-dialogue__speak"
          type="button"
          onClick={() => speak(message)}
          aria-label={t('spark.hear')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          {t('spark.hear')}
        </button>
      </div>
    </div>
  );
}
