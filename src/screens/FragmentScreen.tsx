/**
 * FragmentScreen — The Lost Space Archive
 * Memory fragment reward display with caption and constellation preview
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { SOJOURNER_FRAGMENT, DOSSIER_IDS, FRAGMENT_IDS, ROUTES, countPlayableFragments } from '../utils/constants';
import { announce } from '../utils/accessibility';
import { useEffect, useMemo, useRef } from 'react';
import { useLanguage, type TranslationKey } from '../i18n';
import { StorySparkle } from '../components/content/StorySparkle';
import { FragmentArt } from '../components/content/FragmentArt';
import { Confetti } from '../components/content/Confetti';
import { SparkDialogue } from '../components/content/SparkDialogue';
import './FragmentScreen.css';

export function FragmentScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { collectedFragments } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();

  const fragments = useMemo(() => {
    const fragmentInfo: Record<string, { id: string; title: TranslationKey; caption: TranslationKey; illustration: string }> = {
      [DOSSIER_IDS.SOJOURNER]: { id: FRAGMENT_IDS.SOJOURNER, title: 'fragment.sojournerTitle', caption: 'fragment.sojournerCaption', illustration: SOJOURNER_FRAGMENT.illustration },
      [DOSSIER_IDS.INGENUITY]: { id: FRAGMENT_IDS.INGENUITY, title: 'fragment.ingenuityTitle', caption: 'fragment.ingenuityCaption', illustration: 'rotor' },
      [DOSSIER_IDS.SURVEYOR3]: { id: FRAGMENT_IDS.SURVEYOR3, title: 'fragment.surveyorTitle', caption: 'fragment.surveyorCaption', illustration: 'scoop' },
      [DOSSIER_IDS.APOLLO17]: { id: FRAGMENT_IDS.APOLLO17, title: 'fragment.apollo17Title', caption: 'fragment.apollo17Caption', illustration: 'route' },
    };
    const info = id === DOSSIER_IDS.MARS_MER_ROVERS
      ? [
          { id: FRAGMENT_IDS.SPIRIT, title: 'fragment.spiritTitle' as TranslationKey, caption: 'fragment.spiritCaption' as TranslationKey, illustration: 'silica' },
          { id: FRAGMENT_IDS.OPPORTUNITY, title: 'fragment.opportunityTitle' as TranslationKey, caption: 'fragment.opportunityCaption' as TranslationKey, illustration: 'hematite' },
        ]
      : id && fragmentInfo[id] ? [fragmentInfo[id]] : [];
    return info.map((fragment) => ({ id: fragment.id, title: t(fragment.title), caption: t(fragment.caption), illustration: fragment.illustration }));
  }, [id, t]);
  const fragmentKey = fragments.map((fragment) => fragment.id).join('+');
  const announcement = fragments.length > 1
    ? t('fragment.multipleAnnouncement')
    : fragments.length === 1
      ? t('fragment.announcement', { title: fragments[0].title, caption: fragments[0].caption })
      : '';
  const constellationProgress = { collected: countPlayableFragments(collectedFragments), total: 6 };
  const lastPlayedFragmentId = useRef<string | null>(null);
  const sparkKeyByDossier: Record<string, TranslationKey> = {
    [DOSSIER_IDS.SOJOURNER]: 'spark.sojourner',
    [DOSSIER_IDS.MARS_MER_ROVERS]: 'spark.spiritOpportunity',
    [DOSSIER_IDS.INGENUITY]: 'spark.ingenuity',
    [DOSSIER_IDS.SURVEYOR3]: 'spark.surveyor',
    [DOSSIER_IDS.APOLLO17]: 'spark.apollo17',
  };

  useEffect(() => {
    if (fragments.length > 0) {
      announce(announcement, 'polite');
      if (lastPlayedFragmentId.current !== fragmentKey) playSound('success');
      lastPlayedFragmentId.current = fragmentKey;
    }
  }, [announcement, fragmentKey, fragments.length, playSound]);

  const handleViewConstellation = () => {
    playSound('click');
    navigate(ROUTES.CONSTELLATION);
  };

  const handleBackToStation = () => {
    playSound('click');
    navigate(ROUTES.STATION);
  };

  if (fragments.length === 0) {
    return (
      <div className="fragment-screen">
        <div className="error-state">
          <h2>{t('fragment.notFoundTitle')}</h2>
          <p>{t('fragment.notFoundBody')}</p>
          <button className="btn btn--primary btn--lg" onClick={handleBackToStation} type="button">
            {t('fragment.backStation')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fragment-screen">
      <div className="fragment-reward" role="dialog" aria-modal="true" aria-labelledby="fragment-title">
        <Confetti pieces={16} className="fragment-reward__confetti" />
        <div className="fragment-reward__content">
          <h2 id="fragment-title" className="fragment-reward__heading">
            <StorySparkle size={40} />
            <span>{t(fragments.length > 1 ? 'fragment.foundMultiple' : 'fragment.found')}</span>
            <StorySparkle size={40} delay={1.4} />
          </h2>

          <div className="fragment-reward__fragments">
            {fragments.map((fragment) => (
              <article className="fragment-reward__fragment" key={fragment.id}>
                <div className="fragment-reward__illustration" aria-hidden="true">
                  <FragmentArt name={fragment.illustration} size="large" />
                </div>
                <h3 className="fragment-reward__title">{fragment.title}</h3>
                <p className="fragment-reward__caption">{fragment.caption}</p>
              </article>
            ))}
          </div>
          <SparkDialogue
            className="fragment-reward__spark"
            message={t(sparkKeyByDossier[id ?? ''] ?? 'spark.welcome')}
            showCharacter
            pose="celebration"
          />

          <div className="fragment-reward__constellation-preview">
            <span className="fragment-reward__constellation-text">
              <StorySparkle variant="star" size={26} /> {t('fragment.added', { count: constellationProgress.collected, total: constellationProgress.total })}
            </span>
            <button className="btn btn--primary btn--lg" onClick={handleViewConstellation} type="button">
              {t('fragment.viewConstellation')}
            </button>
          </div>

          <button className="btn btn--secondary btn--lg fragment-reward__station-btn" onClick={handleBackToStation} type="button">
            {t('fragment.backStation')}
          </button>
        </div>
      </div>
    </div>
  );
}
