/**
 * WelcomeScreen — The Lost Space Archive
 * Initial entry screen with Archive Keeper and Begin Exploring button
 */

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { useLanguage } from '../i18n';
import { ROUTES } from '../utils/constants';
import './WelcomeScreen.css';

export function WelcomeScreen() {
  const navigate = useNavigate();
  const overviewRef = useRef<HTMLElement>(null);
  const [overviewVisible, setOverviewVisible] = useState(false);
  useEffect(() => {
    const element = overviewRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setOverviewVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const location = useLocation();
  const { setCurrentLocation } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();
  const isNewAdventure = (location.state as { newAdventure?: boolean } | null)?.newAdventure === true;

  const handleBegin = () => {
    playSound('click');
    setCurrentLocation('station');
    navigate(ROUTES.STATION);
  };

  return (
    <div className="welcome-screen storybook-welcome">
      <div className="storybook-welcome__book">
        <div className="storybook-welcome__scene" role="group" aria-label={t('welcome.sceneAlt')}>
          <span className="storybook-welcome__orbit storybook-welcome__orbit--one" aria-hidden="true" />
          <span className="storybook-welcome__orbit storybook-welcome__orbit--two" aria-hidden="true" />
          <span className="storybook-welcome__planet" aria-hidden="true" />
          <div className="welcome-screen__character">
            <CharacterIllustration
              character="keeper"
              pose="welcoming"
              size="full"
              ariaLabel={t('welcome.sparkAlt')}
            />
          </div>
          <span className="storybook-welcome__scene-caption">{t('welcome.sceneCaption')}</span>
        </div>

        <section className="storybook-welcome__copy" aria-labelledby="welcome-title">
          <p className="storybook-welcome__eyebrow">{t('welcome.eyebrow')}</p>
          <h1 id="welcome-title" className="welcome-screen__title">{t('app.title')}</h1>
          <SparkDialogue className="welcome-screen__subtitle" message={t(isNewAdventure ? 'replay.newAdventure' : 'welcome.spark')} live={isNewAdventure} />
          <button
            className="btn btn--primary btn--xl btn--full welcome-screen__btn"
            onClick={handleBegin}
            type="button"
          >
            {t('welcome.begin')}
          </button>
        </section>
      </div>
      <section ref={overviewRef} className={`welcome-overview${overviewVisible ? ' welcome-overview--visible' : ''}`} aria-labelledby="overview-title">
        <h2 id="overview-title">{t('welcome.overviewTitle')}</h2>
        <p>{t('welcome.overviewIntro')}</p>
        <div className="welcome-overview__destinations">
          <article className="welcome-overview__world welcome-overview__world--mars">
            <div className="welcome-overview__crew" aria-hidden="true">
              {(['sojourner', 'spirit', 'opportunity', 'ingenuity'] as const).map(character => <CharacterIllustration key={character} character={character} size="small" ariaLabel="" />)}
            </div>
            <h3>{t('station.mars')}</h3>
            <p>{t('welcome.overviewMars')}</p>
          </article>
          <article className="welcome-overview__world welcome-overview__world--moon">
            <div className="welcome-overview__crew" aria-hidden="true">
              {(['surveyor3', 'apollo17'] as const).map(character => <CharacterIllustration key={character} character={character} size="small" ariaLabel="" />)}
            </div>
            <h3>{t('station.moon')}</h3>
            <p>{t('welcome.overviewMoon')}</p>
          </article>
        </div>
        <p className="welcome-overview__journey">{t('welcome.overviewJourney')}</p>
        <button className="btn btn--primary btn--lg" type="button" onClick={handleBegin}>{t('welcome.begin')}</button>
      </section>
    </div>
  );
}
