import { useState } from 'react';
import { MISSION_CHARACTER_PROFILES, type MissionCharacterId } from '../../data/missionCharacters';
import { useAudio } from '../providers/AudioProvider';
import { useLanguage } from '../../i18n';
import { CharacterIllustration } from './CharacterIllustration';
import './MissionCharacterPanel.css';

interface MissionCharacterPanelProps {
  characters: MissionCharacterId[];
  collectedFragments: string[];
  initialCharacter?: MissionCharacterId;
  onCharacterChange?: (character: MissionCharacterId) => void;
}

export function MissionCharacterPanel({ characters, collectedFragments, initialCharacter, onCharacterChange }: MissionCharacterPanelProps) {
  const { t } = useLanguage();
  const { speak } = useAudio();
  const firstCharacter = characters[0] ?? 'sojourner';
  const startingCharacter = initialCharacter && characters.includes(initialCharacter) ? initialCharacter : firstCharacter;
  const [activeCharacter, setActiveCharacter] = useState<MissionCharacterId>(startingCharacter);
  const [lineIndices, setLineIndices] = useState<Partial<Record<MissionCharacterId, number>>>(() => {
    return characters.reduce<Partial<Record<MissionCharacterId, number>>>((indices, character) => {
      const profile = MISSION_CHARACTER_PROFILES[character];
      indices[character] = collectedFragments.includes(profile.fragmentId) ? profile.story.length - 1 : 0;
      return indices;
    }, {});
  });

  if (characters.length === 0) return null;

  const profile = MISSION_CHARACTER_PROFILES[activeCharacter];
  const lineIndex = lineIndices[activeCharacter] ?? 0;
  const totalChapters = profile.story.length;
  const currentLine = profile.story[lineIndex] ?? profile.story[0];
  const isLastChapter = lineIndex >= totalChapters - 1;
  const isTwinDossier = characters.length > 1;

  const goToChapter = (index: number) => {
    setLineIndices((current) => ({
      ...current,
      [activeCharacter]: (index + totalChapters) % totalChapters,
    }));
  };

  return (
    <section className="mission-character-panel" aria-labelledby="mission-character-heading">
      <h2 className="mission-character-panel__heading" id="mission-character-heading">{t('character.meetTitle')}</h2>
      <div className="mission-character-panel__portraits">
        <figure className="mission-character-panel__portrait" key={activeCharacter}>
          <CharacterIllustration
            key={`${activeCharacter}:${currentLine.pose}`}
            character={activeCharacter}
            pose={currentLine.pose}
            size="large"
            ariaLabel={t(profile.alt)}
          />
          <figcaption>{t(profile.name)}</figcaption>
        </figure>
      </div>

      {isTwinDossier && (
        <div className="mission-character-panel__speaker-picker" role="group" aria-label={t('character.chooseSpeaker')}>
          {characters.map((character) => (
            <button
              className="btn btn--secondary btn--sm"
              type="button"
              key={character}
              aria-pressed={activeCharacter === character}
              onClick={() => { setActiveCharacter(character); onCharacterChange?.(character); }}
            >
              <span className="mission-character-panel__speaker-art" aria-hidden="true">
                <CharacterIllustration character={character} pose={character === activeCharacter ? currentLine.pose : 'idle'} size="small" ariaLabel="" />
              </span>
              <span className="mission-character-panel__speaker-name">
                {activeCharacter === character && <span aria-hidden="true">✓ </span>}
                {t(MISSION_CHARACTER_PROFILES[character].name)}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="mission-character-panel__story">
        <p className="mission-character-panel__personality">{t(profile.personality)}</p>
        <p className="mission-character-panel__voice">{t(profile.voiceStyle)}</p>
        <p className="mission-character-panel__fiction-note">{t('character.fictionNote')}</p>
        <div className="mission-character-panel__dialogue" aria-live="polite" aria-atomic="true">
          <span className="mission-character-panel__chapter-progress">
            {t('character.chapterProgress', { current: lineIndex + 1, total: totalChapters })}
          </span>
          <span key={`${activeCharacter}:chapter:${lineIndex}`} className="mission-character-panel__reaction">{t(currentLine.chapter)}</span>
          <p key={`${activeCharacter}:${lineIndex}`} className="mission-character-panel__dialogue-copy">{t(currentLine.message)}</p>
          <ol className="mission-character-panel__chapter-dots" aria-hidden="true">
            {profile.story.map((chapter, index) => (
              <li
                key={chapter.chapter}
                className={`mission-character-panel__chapter-dot${index === lineIndex ? ' mission-character-panel__chapter-dot--current' : ''}${index < lineIndex ? ' mission-character-panel__chapter-dot--read' : ''}`}
              />
            ))}
          </ol>
        </div>
      </div>

      <div className="mission-character-panel__actions">
        {lineIndex > 0 && (
          <button className="btn btn--ghost btn--md" type="button" onClick={() => goToChapter(lineIndex - 1)}>
            ← {t('character.previousChapter')}
          </button>
        )}
        <button className="btn btn--secondary btn--md" type="button" onClick={() => goToChapter(isLastChapter ? 0 : lineIndex + 1)}>
          {isLastChapter ? `↺ ${t('character.restartStory')}` : `${t('character.nextChapter')} →`}
        </button>
        <button
          className="btn btn--ghost btn--md mission-character-panel__speak"
          type="button"
          aria-label={t('character.hearLine', { name: t(profile.name) })}
          onClick={() => speak(t(currentLine.message))}
        >
          {t('character.hearLine', { name: t(profile.name) })}
        </button>
      </div>
    </section>
  );
}
