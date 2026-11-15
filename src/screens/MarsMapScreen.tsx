/**
 * MarsMapScreen — The Lost Space Archive
 * Responsive expedition maps with active playable mission pins
 */

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { BackButton } from '../components/navigation/BackButton';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { MARS_MAP_PINS, MOON_MAP_PINS, FRAGMENT_IDS, ROUTES } from '../utils/constants';
import { useLanguage } from '../i18n';
import { MISSION_CHARACTER_PROFILES } from '../data/missionCharacters';
import { getObjectSourceIds, getSourceUrl } from '../data/nasa';
import './MarsMapScreen.css';

export function MarsMapScreen() {
  return <ExpeditionMapScreen destination="Mars" />;
}

export function MoonMapScreen() {
  return <ExpeditionMapScreen destination="Moon" />;
}

function ExpeditionMapScreen({ destination }: { destination: 'Mars' | 'Moon' }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setCurrentLocation, visitedDossiers, collectedFragments } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();
  const pins = destination === 'Mars' ? MARS_MAP_PINS : MOON_MAP_PINS;
  const isMars = destination === 'Mars';
  const title = isMars ? t('map.mars.title') : t('map.moon.title');
  const pinsRef = useRef<HTMLButtonElement[]>([]);
  const openMissionButtonRef = useRef<HTMLButtonElement>(null);
  const selectedObjectQuery = searchParams.get('object');
  const initialPin = pins.find((pin) => pin.objectId === selectedObjectQuery);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(initialPin?.id ?? null);

  useEffect(() => {
    setCurrentLocation(isMars ? 'mars-map' : 'moon-map');
  }, [isMars, setCurrentLocation]);

  const handlePinClick = (pinId: string, focusDetails = false) => {
    playSound('click');
    setSelectedPinId(pinId);
    const pin = pins.find((candidate) => candidate.id === pinId);
    if (pin) setSearchParams({ object: pin.objectId }, { replace: true });
    if (focusDetails) window.requestAnimationFrame(() => openMissionButtonRef.current?.focus());
  };

  const handleOpenMission = () => {
    const pin = pins.find((candidate) => candidate.id === selectedPinId);
    if (!pin) return;
    playSound('click');
    setCurrentLocation('dossier');
    navigate(`${ROUTES.DOSSIER}/${pin.dossierId}?object=${pin.objectId}`);
  };

  const handlePinKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % pins.length;
      pinsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + pins.length) % pins.length;
      pinsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Escape') {
      setSelectedPinId(null);
    }
  };

  const fragmentByObject: Record<string, string> = {
    mars_sojourner: FRAGMENT_IDS.SOJOURNER,
    mars_spirit: FRAGMENT_IDS.SPIRIT,
    mars_opportunity: FRAGMENT_IDS.OPPORTUNITY,
    mars_ingenuity: FRAGMENT_IDS.INGENUITY,
    moon_surveyor3: FRAGMENT_IDS.SURVEYOR3,
    moon_apollo17_lrv: FRAGMENT_IDS.APOLLO17,
  };
  const pinStates = pins.map(pin => {
    const completed = collectedFragments.includes(fragmentByObject[pin.objectId]);
    const visited = visitedDossiers.includes(pin.dossierId);
    const state = completed ? 'completed' : visited ? 'visited' : 'available';
    return {
      pin,
      state,
      stateLabel: t(`map.state.${state}` as 'map.state.available' | 'map.state.visited' | 'map.state.completed'),
      name: t(pin.nameKey),
    };
  });
  const selectedPinState = pinStates.find(({ pin }) => pin.id === selectedPinId);
  const selectedPin = selectedPinState?.pin;
  const previewSources = selectedPin ? getObjectSourceIds(selectedPin.objectId) : [];
  const selectedCharacter = selectedPin ? MISSION_CHARACTER_PROFILES[selectedPin.characterId] : undefined;

  return (
    <div className={`map-screen ${isMars ? 'map-screen--mars' : 'map-screen--moon'}`}>
      <div className="map-screen__content">
        <div className="map-screen__header">
          <BackButton href={ROUTES.STATION} label={t('nav.memoryStation')} />
          <h1 className="map-screen__title">{title}</h1>
        </div>

        <div className="map-screen__exploration">
          <div className="map-screen__map-area" role="group" aria-label={t(isMars ? 'map.mars.label' : 'map.moon.label', { count: pins.length })}>
            <img
              className="map-screen__landscape"
              src={`${import.meta.env.BASE_URL}images/maps/${isMars ? 'mars' : 'moon'}-schematic.svg`}
              alt=""
              aria-hidden="true"
              draggable="false"
            />
            <div className="map-screen__pins">
              {pinStates.map(({ pin, state, stateLabel, name }, index) => (
                <button
                  ref={el => { pinsRef.current[index] = el!; }}
                  key={pin.id}
                  className={`map-pin map-pin--active map-pin--${state} ${selectedPinId === pin.id ? 'map-pin--selected' : ''}`}
                  style={{
                    left: `${pin.position.x}%`,
                    top: `${pin.position.y}%`,
                  }}
                  onClick={() => handlePinClick(pin.id)}
                  onKeyDown={e => handlePinKeyDown(e, index)}
                  aria-label={t('map.missionState', { name, subtitle: t(pin.missionKey), state: stateLabel })}
                  aria-pressed={selectedPinId === pin.id}
                  tabIndex={0}
                >
                  <span className="map-pin__icon" aria-hidden="true">
                    <CharacterIllustration
                      character={pin.characterId}
                      pose="idle"
                      size="small"
                      className="map-pin__character"
                      ariaLabel=""
                    />
                  </span>
                  <span className={`map-pin__status map-pin__status--${state}`} aria-hidden="true">{state === 'completed' ? '✓' : state === 'visited' ? '•' : '○'}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="map-screen__mission-rail" aria-label={t('map.selectionDetails')}>
            {selectedPin && selectedPinState ? (
              <>
                <section className="map-preview" aria-labelledby="map-preview-title">
                  <p className="sr-only" aria-live="polite">
                    {t('map.preview.announcement', {
                      name: t(selectedPin.nameKey),
                      location: t(selectedPin.locationKey),
                      state: selectedPinState.stateLabel,
                    })}
                  </p>
                  <CharacterIllustration
                    character={selectedPin.characterId}
                    pose="discovering"
                    size="medium"
                    className="map-preview__character"
                    ariaLabel={t('map.preview.characterAlt', { name: t(selectedPin.nameKey) })}
                  />
                  <div key={selectedPin.objectId} className="map-preview__details">
                    <p className="map-preview__location-label">{t('map.preview.siteLabel')}</p>
                    <p className="map-preview__location">{t(selectedPin.locationKey)}</p>
                    <h2 id="map-preview-title">{t(selectedPin.nameKey)}</h2>
                    <p className="map-preview__story">{t(selectedPin.previewKey)}</p>
                    {selectedCharacter && <p className="map-preview__personality">{t(selectedCharacter.personality)}</p>}
                    <p className="map-preview__objective"><strong>{t('map.preview.learningObjective')}</strong> {t(selectedPin.objectiveKey)}</p>
                    <p className={`map-preview__status map-preview__status--${selectedPinState.state}`}>
                      <span aria-hidden="true">{selectedPinState.state === 'completed' ? '✓' : selectedPinState.state === 'visited' ? '•' : '○'}</span>
                      {selectedPinState.stateLabel}
                    </p>
                    <details className="map-preview__sources">
                      <summary>{t('facts.viewSources')}</summary>
                      <ul>
                        {previewSources.map((sourceId) => (
                          <li key={sourceId}>
                            <a href={getSourceUrl(sourceId)} target="_blank" rel="noopener noreferrer">{sourceId}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                  <div className="map-preview__actions">
                    <button ref={openMissionButtonRef} className="btn btn--primary" type="button" onClick={handleOpenMission}>
                      {t('map.preview.open')}
                    </button>
                    <button className="btn btn--secondary" type="button" onClick={() => { setSelectedPinId(null); setSearchParams({}, { replace: true }); window.requestAnimationFrame(() => pinsRef.current[0]?.focus()); }}>
                      {t('map.preview.clear')}
                    </button>
                  </div>
                </section>
                <SparkDialogue
                  className="map-screen__spark"
                  message={t(selectedPin.objectId === 'mars_sojourner' ? 'spark.sojourner' : selectedPin.objectId === 'mars_spirit' || selectedPin.objectId === 'mars_opportunity' ? 'spark.spiritOpportunity' : selectedPin.objectId === 'mars_ingenuity' ? 'spark.ingenuity' : selectedPin.objectId === 'moon_surveyor3' ? 'spark.surveyor' : 'spark.apollo17')}
                  showCharacter
                  pose="discovering"
                />
              </>
            ) : (
              <section className="map-mission-list" aria-labelledby="map-mission-list-title">
                <h2 id="map-mission-list-title">{t('map.preview.emptyTitle')}</h2>
                <p>{t('map.preview.emptyBody')}</p>
                <ul>
                  {pinStates.map(({ pin, state, stateLabel, name }) => (
                    <li key={pin.id}>
                      <button className="map-mission-list__item" type="button" onClick={() => handlePinClick(pin.id, true)}>
                        <span className={`map-mission-list__status map-mission-list__status--${state}`} aria-hidden="true">
                          {state === 'completed' ? '✓' : state === 'visited' ? '•' : '○'}
                        </span>
                        <span className="map-mission-list__copy">
                          <strong>{name}</strong>
                          <span>{t(pin.missionKey)} · {stateLabel}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="map-screen__legend" role="group" aria-label={t('map.legend')}>
              {(['available', 'visited', 'completed'] as const).map(state => (
                <span className={`map-screen__legend-item map-screen__legend-item--${state}`} key={state}>
                  <span className="map-screen__legend-symbol" aria-hidden="true">{state === 'completed' ? '✓' : state === 'visited' ? '•' : '○'}</span>
                  {t(`map.state.${state}`)}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <p className="map-screen__instruction">{t('map.instruction')}</p>
        <p className="map-screen__schematic-note">{t('map.schematic')}</p>
      </div>
    </div>
  );
}
