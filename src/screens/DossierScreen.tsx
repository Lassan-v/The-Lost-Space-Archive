/**
 * DossierScreen — The Lost Space Archive
 * Mission dossier with character art, fact cards, simulation banner, and Start Challenge
 */

import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { MissionCharacterPanel } from '../components/content/MissionCharacterPanel';
import { FactCard } from '../components/content/FactCard';
import { SimulationBanner } from '../components/content/SimulationBanner';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { BackButton } from '../components/navigation/BackButton';
import { getDossierObjects, getDossierSourceIds, getVerifiedFacts, getObjectName, type NasaObjectRecord } from '../data/nasa';
import { DOSSIER_IDS, ROUTES } from '../utils/constants';
import { DOSSIER_CHARACTERS, OBJECT_CANONICAL_NAME_KEYS, type MissionCharacterId } from '../data/missionCharacters';
import { useLanguage, type TranslationKey } from '../i18n';
import './DossierScreen.css';

// Presentation-only deduplication: NASA_Data.json stays intact. The retained
// Opportunity legacy fact includes its distance (SRC-003); Apollo 17's retained
// legacy and timeline facts cover the values and three traverses (SRC-010).
const FACTS_REPEATED_IN_CANONICAL_COPY: Record<string, Record<string, string>> = {
  mars_opportunity: { 'opportunity-distance': 'opportunity-legacy' },
  moon_apollo17_lrv: {
    'apollo17-longest-traverse': 'apollo17-legacy',
    'apollo17-traverses': 'apollo17-timeline',
  },
};

function getDossierDisplayFacts(objectId: string) {
  const facts = getVerifiedFacts(objectId);
  const repeatedFacts = FACTS_REPEATED_IN_CANONICAL_COPY[objectId] ?? {};
  return facts.filter((fact) => {
    const canonicalId = fact.factId ? repeatedFacts[fact.factId] : undefined;
    if (!canonicalId) return true;
    return !facts.some((candidate) => candidate.factId === canonicalId && candidate.sourceId === fact.sourceId);
  });
}

export function DossierScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCurrentLocation, markDossierVisited, collectedFragments } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();

  const queryObjectId = searchParams.get('object');
  const selectedObjectId = id === DOSSIER_IDS.MARS_MER_ROVERS ? queryObjectId ?? 'mars_spirit' : queryObjectId;
  const selectedMissionCharacter = selectedObjectId === 'mars_opportunity'
    ? 'opportunity'
    : selectedObjectId === 'mars_spirit'
      ? 'spirit'
      : undefined;
  const selectedObjectName = selectedObjectId ? getObjectName(selectedObjectId) : undefined;
  const isMoonDossier = id === DOSSIER_IDS.SURVEYOR3 || id === DOSSIER_IDS.APOLLO17;
  const returnRoute = isMoonDossier ? ROUTES.MOON_MAP : ROUTES.MARS_MAP;
  const objects = id ? getDossierObjects(id, selectedObjectId) : [];
  const sourceIds = id ? getDossierSourceIds(id, selectedObjectId) : [];
  const missionCharacters = id ? DOSSIER_CHARACTERS[id] ?? [] : [];
  useEffect(() => {
    if (id === DOSSIER_IDS.MARS_MER_ROVERS && !queryObjectId) {
      setSearchParams({ object: 'mars_spirit' }, { replace: true });
    }
  }, [id, queryObjectId, setSearchParams]);
  useEffect(() => {
    if (id && getDossierObjects(id).length) markDossierVisited(id);
  }, [id, markDossierVisited]);
  const introKeys: Record<string, TranslationKey> = {
    [DOSSIER_IDS.MARS_MER_ROVERS]: 'spark.spiritOpportunity',
    [DOSSIER_IDS.SOJOURNER]: 'spark.sojourner',
    [DOSSIER_IDS.INGENUITY]: 'spark.ingenuity',
    [DOSSIER_IDS.SURVEYOR3]: 'spark.surveyor',
    [DOSSIER_IDS.APOLLO17]: 'spark.apollo17',
  };
  const titleKeys: Record<string, TranslationKey> = {
    [DOSSIER_IDS.MARS_MER_ROVERS]: 'dossier.title.mer',
    [DOSSIER_IDS.SOJOURNER]: 'dossier.title.sojourner',
    [DOSSIER_IDS.INGENUITY]: 'dossier.title.ingenuity',
    [DOSSIER_IDS.SURVEYOR3]: 'dossier.title.surveyor',
    [DOSSIER_IDS.APOLLO17]: 'dossier.title.apollo17',
  };
  const getFactTranslationKey = (factId: string): TranslationKey => {
    const legacy: Record<string, TranslationKey> = {
      'sojourner-pathfinder-timeline': 'science.sojourner-pathfinder-timeline',
      'sojourner-control': 'science.sojourner-control',
      'sojourner-signal-delay': 'science.sojourner-signal-delay',
      'sojourner-planned-exploration': 'science.sojourner-planned-exploration',
    };
    return legacy[factId] ?? (`science.${factId}` as TranslationKey);
  };
  const categoryKeys: Record<string, TranslationKey> = {
    objective: 'dossier.section.objective',
    history: 'dossier.section.history',
    capabilities: 'dossier.section.capabilities',
    findings: 'dossier.section.findings',
    timeline: 'dossier.section.timeline',
    legacy: 'dossier.section.legacy',
  };

  const handleStartChallenge = () => {
    playSound('click');
    setCurrentLocation('challenge');
    navigate(`${ROUTES.CHALLENGE}/${id}${selectedObjectId ? `?object=${selectedObjectId}` : ''}`);
  };

  const handleBack = () => {
    playSound('click');
    navigate(`${returnRoute}${selectedObjectId ? `?object=${selectedObjectId}` : ''}`);
  };

  const handleCharacterChange = (character: MissionCharacterId) => {
    if (character !== 'spirit' && character !== 'opportunity') return;
    setSearchParams({ object: character === 'opportunity' ? 'mars_opportunity' : 'mars_spirit' }, { replace: true });
  };

  if (!objects.length) {
    return (
      <div className={`dossier-screen dossier-screen--${id ?? 'unknown'}`}>
        <header className="dossier-screen__header">
          <BackButton href={returnRoute} label={isMoonDossier ? t('map.moon.title') : t('map.mars.title')} onClick={handleBack} />
          <h1>{t('dossier.unavailableTitle')}</h1>
        </header>
        <div className="dossier-screen__layout">
          <div className="dossier-screen__character-column">
            <CharacterIllustration
              character="keeper"
              pose="thinking"
              size="large"
              ariaLabel={t('dossier.sparkAlt')}
            />
          </div>
          <div className="dossier-screen__facts-column">
            <div className="error-state">
              <p>{queryObjectId
                ? t('dossier.invalidObject')
                : selectedObjectName ? t('dossier.inProgress', { object: selectedObjectName }) : t('dossier.unavailableBody')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dossier-screen dossier-screen--${id ?? 'unknown'}`}>
      <header className="dossier-screen__header">
        <BackButton href={returnRoute} label={isMoonDossier ? t('map.moon.title') : t('map.mars.title')} onClick={handleBack} />
        <h1>{t(titleKeys[id ?? ''] ?? 'dossier.unavailableTitle')}</h1>
      </header>
      <div className="dossier-screen__layout">
        {/* Character Column */}
        <div className="dossier-screen__character-column">
          <div className="dossier-screen__character">
            <MissionCharacterPanel
              key={`${id}:${selectedObjectId ?? ''}`}
              characters={missionCharacters}
              collectedFragments={collectedFragments}
              initialCharacter={selectedMissionCharacter}
              onCharacterChange={id === DOSSIER_IDS.MARS_MER_ROVERS ? handleCharacterChange : undefined}
            />
          </div>
        </div>

        {/* Facts Column */}
        <div className="dossier-screen__facts-column">
          <SparkDialogue message={t(introKeys[id ?? ''] ?? 'dossier.unavailableTitle')} />
          {objects.map((object: NasaObjectRecord) => {
            const facts = getDossierDisplayFacts(object.object_id);
            const categories = [...new Set(facts.map((fact) => fact.category ?? 'history'))];
            return <section className="dossier-object" key={object.object_id} aria-labelledby={`object-${object.object_id}`}>
              <h2 id={`object-${object.object_id}`}>
                {t(OBJECT_CANONICAL_NAME_KEYS[object.object_id] ?? 'dossier.objectRecord')}
              </h2>
              <div className="dossier-object__sections">
                {categories.map((category) => {
                  const categoryFacts = facts.filter((fact) => (fact.category ?? 'history') === category);
                  return (
                    <section
                      className="dossier-object__category"
                      data-category={category}
                      key={`${object.object_id}-${category}`}
                      aria-labelledby={`section-${object.object_id}-${category}`}
                    >
                      <h3 id={`section-${object.object_id}-${category}`}>{t(categoryKeys[category] ?? 'dossier.section.history')}</h3>
                      <div className="dossier-screen__fact-cards">
                        {categoryFacts.map((fact) => (
                          <FactCard key={`${object.object_id}-${fact.factId}`} fact={{ ...fact, fact: t(getFactTranslationKey(fact.factId ?? '')) }} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </section>;
          })}
          <SimulationBanner sourceIds={sourceIds} variant="dossier" />

          <div className="dossier-screen__actions">
            <button
              className="btn btn--primary btn--xl dossier-screen__start-btn"
              onClick={handleStartChallenge}
              type="button"
            >
              {t('dossier.startChallenge')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
