import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAudio } from '../components/providers/AudioProvider';
import { useProgress } from '../components/providers/ProgressProvider';
import { BackButton } from '../components/navigation/BackButton';
import { SimulationBanner } from '../components/content/SimulationBanner';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { SurveyorSamplingScene } from '../components/challenge/SurveyorSamplingScene';
import { HematiteClueIcon, MiniHelicopter, SamplerActionIcon, SilicaClueIcon } from '../components/challenge/ActivityIcons';
import { MISSION_CHARACTER_PROFILES, type MissionCharacterId } from '../data/missionCharacters';
import { useLanguage, type TranslationKey } from '../i18n';
import { getDossierSourceIds } from '../data/nasa';
import { DOSSIER_IDS, FRAGMENT_IDS, ROUTES } from '../utils/constants';

type ActivityKind = 'twins' | 'flight' | 'sampling' | 'route';

const sparkKeys: Record<string, TranslationKey> = {
  [DOSSIER_IDS.MARS_MER_ROVERS]: 'spark.spiritOpportunity',
  [DOSSIER_IDS.INGENUITY]: 'spark.ingenuity',
  [DOSSIER_IDS.SURVEYOR3]: 'spark.surveyor',
  [DOSSIER_IDS.APOLLO17]: 'spark.apollo17',
};

const configs: Record<string, { kind: ActivityKind; dossier: string; title: TranslationKey; intro: TranslationKey; fragments: string[] }> = {
  [DOSSIER_IDS.MARS_MER_ROVERS]: { kind: 'twins', dossier: DOSSIER_IDS.MARS_MER_ROVERS, title: 'challenge.twinTitle', intro: 'challenge.spirit.instruction', fragments: [FRAGMENT_IDS.SPIRIT, FRAGMENT_IDS.OPPORTUNITY] },
  [DOSSIER_IDS.INGENUITY]: { kind: 'flight', dossier: DOSSIER_IDS.INGENUITY, title: 'challenge.flightTitle', intro: 'challenge.ingenuity.instruction', fragments: [FRAGMENT_IDS.INGENUITY] },
  [DOSSIER_IDS.SURVEYOR3]: { kind: 'sampling', dossier: DOSSIER_IDS.SURVEYOR3, title: 'challenge.samplingTitle', intro: 'challenge.surveyor.instruction', fragments: [FRAGMENT_IDS.SURVEYOR3] },
  [DOSSIER_IDS.APOLLO17]: { kind: 'route', dossier: DOSSIER_IDS.APOLLO17, title: 'challenge.routeTitle', intro: 'challenge.apollo17.instruction', fragments: [FRAGMENT_IDS.APOLLO17] },
};

const routeToDossier: Record<string, string> = {
  [DOSSIER_IDS.INGENUITY]: 'mars_ingenuity',
  [DOSSIER_IDS.SURVEYOR3]: 'moon_surveyor3',
  [DOSSIER_IDS.APOLLO17]: 'moon_apollo17_lrv',
};

const APOLLO17_RECORDED_MAX_RANGE_KM = 7.6;
const APOLLO17_ROUTE_OPTIONS = [
  {
    id: '12-7.2', total: 12, farthest: 7.2, titleKey: 'challenge.routePlanA' as const,
    path: 'M105 276 C150 218 186 220 238 164 S334 126 380 174 S474 150 540 97',
    stops: [{ x: 205, y: 200 }, { x: 360, y: 153 }, { x: 474, y: 150 }],
    farthestPoint: { x: 570, y: 86 }, vehicle: { x: 540, y: 97 },
    labels: { vehicle: { x: 500, y: 145 }, farthest: { x: 742, y: 43 } },
  },
  {
    id: '8-8.1', total: 8, farthest: 8.1, titleKey: 'challenge.routePlanB' as const,
    path: 'M105 276 C177 250 192 188 288 160 S450 130 622 79',
    stops: [{ x: 206, y: 198 }, { x: 385, y: 143 }, { x: 530, y: 105 }],
    farthestPoint: { x: 638, y: 74 }, vehicle: { x: 622, y: 79 },
    labels: { vehicle: { x: 545, y: 145 }, farthest: { x: 742, y: 42 } },
  },
  {
    id: '7.5-4', total: 7.5, farthest: 4, titleKey: 'challenge.routePlanC' as const,
    path: 'M105 276 C165 260 224 238 284 245 S394 224 470 192',
    stops: [{ x: 208, y: 239 }, { x: 340, y: 238 }, { x: 415, y: 212 }],
    farthestPoint: { x: 465, y: 191 }, vehicle: { x: 470, y: 192 },
    labels: { vehicle: { x: 405, y: 246 }, farthest: { x: 735, y: 153 } },
  },
] as const;

export function MissionActivityScreen() {
  const { id = '' } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const selectedObjectId = search.get('object');
  const navigate = useNavigate();
  const { challengeProgress, updateChallengeProgress, completeDossier } = useProgress();
  const { playSound } = useAudio();
  const { t, formatNumber } = useLanguage();
  const config = configs[id];
  const saved = challengeProgress[id]?.placedParts ?? [];
  const [done, setDone] = useState<string[]>(saved);
  const [feedback, setFeedback] = useState<TranslationKey | ''>('');
  const savedRoute = saved.find((key) => key.startsWith('route-'))?.slice('route-'.length) ?? '';
  const [routeChoice, setRouteChoice] = useState(savedRoute);
  const [activeSamplingAction, setActiveSamplingAction] = useState(() =>
    [...saved].reverse().find((key) => ['dig', 'bearing', 'impact'].includes(key)) ?? '',
  );
  const flightCount = Math.max(0, ...done.filter((key) => key.startsWith('flight-')).map((key) => Number(key.slice('flight-'.length)) || 0));
  const selectedRoute = APOLLO17_ROUTE_OPTIONS.find((option) => option.id === routeChoice);
  const [finished, setFinished] = useState(false);
  const [wrongPick, setWrongPick] = useState<{ clue: string; answer: string; attempt: number } | null>(null);
  const twinContextKey = `${id}:${selectedObjectId ?? ''}`;
  const [twinSelection, setTwinSelection] = useState<{ contextKey: string; character: MissionCharacterId } | null>(null);
  const defaultTwin: MissionCharacterId = selectedObjectId === 'mars_opportunity' ? 'opportunity' : 'spirit';
  const activeTwin = twinSelection?.contextKey === twinContextKey ? twinSelection.character : defaultTwin;
  const sourceIds = useMemo(() => config ? getDossierSourceIds(routeToDossier[id] ?? id) : [], [config, id]);
  if (!config) return <section className="challenge-screen"><div className="challenge-screen__content error-state"><h1>{t('challenge.notAvailableTitle')}</h1><p>{t('challenge.notAvailableBody')}</p><BackButton href={ROUTES.STATION} label={t('nav.memoryStation')} /></div></section>;

  const persist = (next: string[]) => {
    setDone(next);
    updateChallengeProgress(id, { placedParts: next });
  };
  const mark = (key: string) => persist([...new Set([...done, key])]);
  const finish = () => {
    if (config.kind === 'twins' && (!done.includes('spirit-correct') || !done.includes('opportunity-correct'))) { setFeedback('challenge.twinIncomplete'); return; }
    if (config.kind === 'flight' && flightCount < 3) { setFeedback('challenge.flightIncomplete'); return; }
    if (config.kind === 'sampling' && !['dig', 'bearing', 'impact'].every((key) => done.includes(key))) { setFeedback('challenge.samplingIncomplete'); return; }
    if (config.kind === 'route' && (!selectedRoute || selectedRoute.farthest > APOLLO17_RECORDED_MAX_RANGE_KM)) { setFeedback('challenge.routeIncomplete'); return; }
    playSound('success');
    setFinished(true);
    setFeedback('challenge.activityComplete');
    completeDossier(id, config.fragments);
    const object = search.get('object') ? `?object=${search.get('object')}` : '';
    window.setTimeout(() => navigate(`${ROUTES.FRAGMENT}/${id}${object}`), 700);
  };

  const answerEvidence = (evidence: 'silica' | 'hematite', answer: 'spirit' | 'opportunity') => {
    setTwinSelection({ contextKey: twinContextKey, character: answer });
    const correct = (evidence === 'silica' && answer === 'spirit') || (evidence === 'hematite' && answer === 'opportunity');
    if (correct) {
      mark(`${answer}-correct`);
      setFeedback('challenge.correct');
      setWrongPick(null);
      playSound('success');
    } else {
      setWrongPick((current) => ({ clue: evidence, answer, attempt: (current?.attempt ?? 0) + 1 }));
      setFeedback('challenge.wrongAnswer');
      playSound('error');
    }
  };

  const responseCharacter: MissionCharacterId = config.kind === 'twins'
    ? activeTwin
    : config.kind === 'flight'
      ? 'ingenuity'
      : config.kind === 'sampling'
        ? 'surveyor3'
        : 'apollo17';
  const profile = MISSION_CHARACTER_PROFILES[responseCharacter];
  const surpriseFeedback = feedback === 'challenge.wrongAnswer' || feedback === 'challenge.routeExceeded';
  const incompleteFeedback = feedback === 'challenge.twinIncomplete' || feedback === 'challenge.flightIncomplete' || feedback === 'challenge.samplingIncomplete' || feedback === 'challenge.routeIncomplete';
  const responseLine = profile.lines[finished ? profile.lines.length - 1 : surpriseFeedback ? 2 : incompleteFeedback ? 3 : feedback ? 1 : 0];
  const backTo = id === DOSSIER_IDS.SURVEYOR3 || id === DOSSIER_IDS.APOLLO17 ? ROUTES.MOON_MAP : ROUTES.MARS_MAP;
  return <section className={`challenge-screen challenge-screen--${config.kind}`}><div className="challenge-screen__content">
    <header className="challenge-screen__header"><BackButton href={`${ROUTES.DOSSIER}/${id}${search.get('object') ? `?object=${search.get('object')}` : ''}`} label={t('nav.dossier')} />
      <div><h1 className="challenge-screen__title">{t(config.title)}</h1><p>{t(config.intro)}</p><SimulationBanner sourceIds={sourceIds} variant="challenge" /></div></header>
    <SparkDialogue className="mission-activity__guide" message={t(feedback || sparkKeys[id] || 'spark.station')} showCharacter pose={finished ? 'celebration' : feedback ? 'discovering' : 'speaking'} live />
    <section className="challenge-screen__panel mission-activity" aria-label={t('challenge.playTitle')}>
      <div className="mission-activity__mission-character">
        <CharacterIllustration
          key={`${responseCharacter}:${feedback || 'introduction'}`}
          character={responseCharacter}
          pose={responseLine.pose}
          size="medium"
          className="mission-activity__mission-illustration"
          ariaLabel={t(profile.alt)}
        />
        <div className="mission-activity__mission-copy">
          <h2>{t(profile.name)}</h2>
          <p>{t(responseLine.message)}</p>
        </div>
      </div>
      {config.kind === 'twins' && <>
        <p>{t('challenge.chooseEvidence')}</p>
        {(['silica', 'hematite'] as const).map((clue) => {
          const correctKey = clue === 'silica' ? 'spirit-correct' : 'opportunity-correct';
          const clueDone = done.includes(correctKey);
          const correctAnswer = clue === 'silica' ? 'spirit' : 'opportunity';
          return <div key={clue} className={`mission-activity__item clue-card${clueDone ? ' clue-card--solved' : ''}`}>
            <div className="clue-card__header">
              <span className="clue-card__art">{clue === 'silica' ? <SilicaClueIcon /> : <HematiteClueIcon />}</span>
              <p>{t(clue === 'silica' ? 'challenge.evidenceSilica' : 'challenge.evidenceHematite')}</p>
              {clueDone && <span className="clue-card__badge"><span aria-hidden="true">✓</span> {t('challenge.clueSolved')}</span>}
            </div>
            <div className="clue-card__answers">
              {(['spirit', 'opportunity'] as const).map((answer) => {
                const isRight = clueDone && answer === correctAnswer;
                const isWrong = !clueDone && wrongPick?.clue === clue && wrongPick.answer === answer;
                return <button
                  className={`twin-answer${isRight ? ' is-correct' : ''}${isWrong ? ' is-wrong' : ''}`}
                  type="button"
                  key={isWrong ? `${answer}-${wrongPick?.attempt}` : answer}
                  disabled={clueDone}
                  aria-pressed={isRight}
                  onClick={() => answerEvidence(clue, answer)}
                >
                  <span className="twin-answer__art" aria-hidden="true">
                    <CharacterIllustration character={answer} pose={isRight ? 'celebration' : isWrong ? 'discovering' : 'idle'} size="small" ariaLabel="" />
                  </span>
                  <span className="twin-answer__name">{t(answer === 'spirit' ? 'challenge.spirit' : 'challenge.opportunity')}</span>
                  {isRight && <span className="twin-answer__state"><span aria-hidden="true">✓</span> {t('challenge.clueSolved')}</span>}
                  {isWrong && <span className="twin-answer__state"><span aria-hidden="true">↺</span> {t('challenge.tryAgainShort')}</span>}
                </button>;
              })}
            </div>
          </div>;
        })}
      </>}
      {config.kind === 'flight' && <><p>{t('challenge.flightStep')}</p>
        <svg className="mission-activity__flight-path" viewBox="0 -8 360 104" aria-hidden="true" focusable="false">
          <path className="mission-activity__flight-track" d="M34 48 C70 8 108 8 144 48 S218 88 252 48 S302 8 326 48" />
          {[1, 2, 3].map((point) => <g key={point} className={point <= flightCount ? 'is-complete' : point === flightCount + 1 ? 'is-current' : ''}>
            <circle className="mission-activity__flight-node" cx={point === 1 ? 54 : point === 2 ? 180 : 306} cy="48" r="16" />
            <circle className="mission-activity__flight-node-core" cx={point === 1 ? 54 : point === 2 ? 180 : 306} cy="48" r="5" />
          </g>)}
          <g className="mission-activity__flight-craft" style={{ transform: `translate(${flightCount === 0 ? 18 : flightCount === 1 ? 54 : flightCount === 2 ? 180 : 306}px, ${flightCount === 0 ? 60 : 30}px)` }}>
            <MiniHelicopter />
          </g>
        </svg>
        <ol className="mission-activity__checkpoints" aria-label={t('challenge.flightStep')}>
        {[1, 2, 3].map((point) => <li key={point} aria-current={point === flightCount + 1 && flightCount < 3 ? 'step' : undefined} className={`${point <= flightCount ? 'is-complete' : ''} ${point === flightCount + 1 && flightCount < 3 ? 'is-current' : ''}`}>{t('challenge.flightPoint', { count: point })}</li>)}
      </ol><p>{t('challenge.checkpointsDone', { count: flightCount })}</p>
        <button className="btn btn--primary" type="button" disabled={flightCount >= 3} onClick={() => { const next = Math.min(3, flightCount + 1); persist(Array.from({ length: next }, (_, index) => `flight-${index + 1}`)); setFeedback('challenge.flightProgress'); playSound('success'); }}>{t('challenge.nextCheckpoint')}</button></>}
      {config.kind === 'sampling' && <>
        <p>{t('challenge.sampleStep')}</p>
        <SurveyorSamplingScene completedActions={done} activeAction={activeSamplingAction} />
        <div className="mission-activity__samples" role="group" aria-label={t('challenge.samplesDone', { count: ['dig', 'bearing', 'impact'].filter((key) => done.includes(key)).length })}>
          {(['dig', 'bearing', 'impact'] as const).map((key, index) => <button className={`sampler-tool${done.includes(key) ? ' is-done' : ''}`} type="button" key={key} disabled={done.includes(key)} aria-pressed={done.includes(key)} onClick={() => { setActiveSamplingAction(key); mark(key); setFeedback(key === 'dig' ? 'challenge.digResult' : key === 'bearing' ? 'challenge.bearingResult' : 'challenge.impactResult'); playSound('success'); }}>
            <span className="sampler-tool__step" aria-hidden="true">{done.includes(key) ? '✓' : index + 1}</span>
            <span className="sampler-tool__art" aria-hidden="true"><SamplerActionIcon action={key} /></span>
            <span className="sampler-tool__label">{t(key === 'dig' ? 'challenge.dig' : key === 'bearing' ? 'challenge.bearing' : 'challenge.impact')}</span>
          </button>)}
        </div>
        <p>{t('challenge.samplesDone', { count: ['dig', 'bearing', 'impact'].filter((key) => done.includes(key)).length })}</p>
      </>}
      {config.kind === 'route' && <>
        <p>{t('challenge.routeStep')}</p>
        <dl className="mission-activity__route-record">
          <div><dt>{t('challenge.routeRecordTotal')}</dt><dd>{formatNumber(35.9)} km</dd></div>
          <div><dt>{t('challenge.routeLongestTraverse')}</dt><dd>{formatNumber(20.1)} km</dd></div>
          <div><dt>{t('challenge.routeMaxRange')}</dt><dd>{formatNumber(APOLLO17_RECORDED_MAX_RANGE_KM)} km</dd></div>
        </dl>
        <div className="mission-activity__route-options" role="group" aria-label={t('challenge.routeOptions')}>
          {APOLLO17_ROUTE_OPTIONS.map((option) => {
            const matchesRecord = option.farthest <= APOLLO17_RECORDED_MAX_RANGE_KM;
            return <button className={`mission-route-card${routeChoice === option.id ? ' is-selected' : ''}`} key={option.id} type="button" aria-pressed={routeChoice === option.id} onClick={() => { setRouteChoice(option.id); if (matchesRecord) { persist([`route-${option.id}`]); setFeedback('challenge.routeFits'); playSound('success'); } else { persist([]); setFeedback('challenge.routeExceeded'); playSound('error'); } }}>
              <strong>{t(option.titleKey)}</strong>
              <span><b>{t('challenge.routeTotal')}</b> {formatNumber(option.total)} km</span>
              <span><b>{t('challenge.routeFarthest')}</b> {formatNumber(option.farthest)} km</span>
              <span className="mission-route-card__outcome">{t(matchesRecord ? 'challenge.routeWithinRecordedRange' : 'challenge.routeBeyondRecordedRange')}</span>
            </button>;
          })}
        </div>
        <p>{selectedRoute ? t('challenge.routeProgressSelected', { total: formatNumber(selectedRoute.total), farthest: formatNumber(selectedRoute.farthest) }) : t('challenge.routeNotSelected')}</p>
        {selectedRoute && <figure className="mission-route-figure">
          <svg className="mission-route-figure__map" viewBox="0 0 760 360" role="img" aria-label={t('challenge.routeDiagramAlt', { total: formatNumber(selectedRoute.total), farthest: formatNumber(selectedRoute.farthest) })}>
            <rect width="760" height="360" rx="16" fill="var(--color-bg-secondary)" />
            <path d="M0 250Q104 220 212 244T412 237T614 243T760 226V360H0Z" fill="var(--storybook-lavender, #C7A8EE)" opacity=".38" />
            <path d="M0 270Q115 245 236 267T475 260T760 252" fill="none" stroke="var(--storybook-purple, #9270D9)" strokeWidth="3" opacity=".55" />
            <path d={selectedRoute.path} fill="none" stroke="var(--storybook-purple, #9270D9)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="mission-route-figure__route-shadow" />
            <path d={selectedRoute.path} fill="none" stroke="var(--storybook-gold, #F7AE32)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="mission-route-figure__route" />
            {selectedRoute.stops.map((point, index) => <g key={`${point.x}-${point.y}`}>
              <circle cx={point.x} cy={point.y} r="12" fill="var(--color-bg-primary)" stroke="var(--storybook-purple, #9270D9)" strokeWidth="4" />
              <text x={point.x} y={point.y + 5} textAnchor="middle" fill="var(--color-text-primary)" fontSize="14" fontWeight="800">{index + 1}</text>
            </g>)}
            <path d={`M105 276L${selectedRoute.farthestPoint.x} ${selectedRoute.farthestPoint.y}`} fill="none" stroke="var(--storybook-blue, #397CA9)" strokeWidth="3" strokeDasharray="9 8" />
            <circle cx={selectedRoute.farthestPoint.x} cy={selectedRoute.farthestPoint.y} r="13" fill="var(--color-success)" stroke="var(--color-text-primary)" strokeWidth="3" />
            <g className="mission-route-figure__module" transform="translate(105 276)">
              <circle r="26" fill="var(--color-bg-primary)" stroke="var(--color-border-strong)" strokeWidth="3" />
              <path d="M-12 3L0-12L12 3V12H-12Z" fill="var(--storybook-paper, #FFF4D9)" stroke="var(--storybook-navy, #111D38)" strokeWidth="2" />
            </g>
            <text x="105" y="323" textAnchor="middle" fill="var(--color-text-primary)" fontSize="18" fontWeight="800">{t('challenge.routeMapModule')}</text>
            <g className="mission-route-figure__rover" transform={`translate(${selectedRoute.vehicle.x} ${selectedRoute.vehicle.y})`}>
              <path d="M-25 0H25L17-17H-13Z" fill="var(--storybook-gold, #F7AE32)" stroke="var(--storybook-navy, #111D38)" strokeWidth="3" />
              <circle cx="-15" cy="5" r="7" fill="var(--storybook-navy, #111D38)" />
              <circle cx="15" cy="5" r="7" fill="var(--storybook-navy, #111D38)" />
              <circle cx="-15" cy="5" r="2" fill="var(--storybook-paper, #FFF4D9)" />
              <circle cx="15" cy="5" r="2" fill="var(--storybook-paper, #FFF4D9)" />
            </g>
            <text x={selectedRoute.labels.vehicle.x} y={selectedRoute.labels.vehicle.y} textAnchor="middle" fill="var(--color-text-primary)" fontSize="18" fontWeight="800">{t('challenge.routeMapVehicle')}</text>
            <text x={selectedRoute.labels.farthest.x} y={selectedRoute.labels.farthest.y} textAnchor="end" fill="var(--color-text-primary)" fontSize="17" fontWeight="800">{t('challenge.routeMapFarthest')}</text>
          </svg>
          <figcaption>{t('challenge.routeDiagramCaption', { total: formatNumber(selectedRoute.total), farthest: formatNumber(selectedRoute.farthest) })}</figcaption>
        </figure>}
        <p className="mission-activity__schematic-note">{t('challenge.routeSchematicNote')}</p>
      </>}
      <p>{t('challenge.activitySourceNote')}</p>
      <button className="btn btn--primary" type="button" onClick={finish} disabled={finished}>{t('challenge.finishActivity')}</button>
      <BackButton href={backTo} label={t(backTo === ROUTES.MOON_MAP ? 'map.moon.title' : 'map.mars.title')} />
    </section>
  </div></section>;
}
