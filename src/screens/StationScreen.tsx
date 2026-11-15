/** Memory Station hub with Archive Keeper Spark and expedition portals. */

import { useNavigate } from 'react-router-dom';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { useAudio } from '../components/providers/AudioProvider';
import { useProgress } from '../components/providers/ProgressProvider';
import { useLanguage } from '../i18n';
import { FRAGMENT_IDS, ROUTES, countPlayableFragments } from '../utils/constants';
import './StationScreen.css';

const archiveNodes = [
  [FRAGMENT_IDS.SOJOURNER, 30, 118],
  [FRAGMENT_IDS.SPIRIT, 69, 74],
  [FRAGMENT_IDS.OPPORTUNITY, 112, 106],
  [FRAGMENT_IDS.INGENUITY, 155, 44],
  [FRAGMENT_IDS.SURVEYOR3, 205, 94],
  [FRAGMENT_IDS.APOLLO17, 123, 152],
] as const;

export function StationScreen() {
  const navigate = useNavigate();
  const { completedDossiers, collectedFragments } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();
  const fragmentCount = countPlayableFragments(collectedFragments);

  const handleMarsClick = () => {
    playSound('click');
    navigate(ROUTES.MARS_MAP);
  };

  const handleMoonClick = () => {
    playSound('click');
    navigate(ROUTES.MOON_MAP);
  };

  const handleConstellationClick = () => {
    playSound('click');
    navigate(ROUTES.CONSTELLATION);
  };

  const isReturning = completedDossiers.length > 0;

  return (
    <div className="station-screen storybook-station">
      <div className="storybook-station__environment" aria-hidden="true">
        <span className="storybook-station__comet" />
      </div>

      <section className="storybook-station__observatory" aria-labelledby="station-title">
        <div className="storybook-station__hero">
          <div className="storybook-station__spark-stage">
            <span className="storybook-station__projector-beam" />
            <CharacterIllustration
              character="keeper"
              pose="projecting"
              size="large"
              ariaLabel={t('station.sparkAlt')}
            />
          </div>

          <div className="station-screen__welcome">
            <h1 id="station-title" className="station-screen__title">
              {isReturning ? t('station.welcomeBack') : t('station.welcome')}
            </h1>
            <p className="station-screen__welcome-text">{t('station.prompt')}</p>
            <SparkDialogue className="station-screen__welcome-text" message={t('station.spark')} />
          </div>

          <div className="storybook-station__archive" aria-hidden="true">
            <span className="storybook-station__archive-ring" />
            <span className="storybook-station__archive-core" />
            <svg className="storybook-station__archive-map" viewBox="0 0 240 180" focusable="false">
              <path className="storybook-station__archive-route" d="M30 118 69 74l43 32 43-62 50 50" />
              {archiveNodes.map(([fragmentId, cx, cy]) => {
                const isCollected = collectedFragments.includes(fragmentId);
                return (
                  <circle
                    key={fragmentId}
                    className={`storybook-station__archive-node${isCollected ? ' storybook-station__archive-node--collected' : ''}`}
                    cx={cx}
                    cy={cy}
                    r={isCollected ? 5 : 4}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      <section className="station-screen__destinations storybook-station__destinations" aria-label={t('station.prompt')}>
        <button
          className="destination-btn destination-btn--primary storybook-station__destination storybook-station__destination--mars"
          onClick={handleMarsClick}
          type="button"
        >
          <svg className="storybook-station__portal-art" viewBox="0 0 220 150" role="presentation" focusable="false">
            <circle cx="170" cy="35" r="16" fill="#F7D779" />
            <path d="M4 104 34 80l23 13 26-37 29 31 25-21 25 18 24-21 27 26v36H4Z" fill="#C45D66" />
            <path d="M4 112c46-13 76-2 111-8s67-21 101-9v37H4Z" fill="#E87958" />
            <path d="M4 132c56-10 91-4 128 0s56-9 84-11v17H4Z" fill="#9A465C" />
            <g fill="#773E59" opacity=".68"><ellipse cx="42" cy="125" rx="9" ry="3" /><ellipse cx="184" cy="123" rx="12" ry="4" /></g>
            <g transform="translate(106 106)" fill="#FFF0C7" stroke="#26365F" strokeWidth="3" strokeLinejoin="round">
              <rect x="-13" y="-10" width="26" height="16" rx="4" />
              <path d="m-16-7-14-8v21h14m32-13 14-8v21H16" />
              <circle cx="-11" cy="10" r="5" /><circle cx="11" cy="10" r="5" />
              <path d="M0-10v-12m-4 0h8" fill="none" strokeLinecap="round" />
            </g>
          </svg>
          <span className="destination-btn__label">{t('station.mars')}</span>
          <span className="destination-btn__detail">{t('station.marsDetail')}</span>
          <span className="storybook-station__portal-action" aria-hidden="true">↗</span>
        </button>

        <button
          className="destination-btn destination-btn--primary storybook-station__destination storybook-station__destination--moon"
          onClick={handleMoonClick}
          type="button"
        >
          <svg className="storybook-station__portal-art" viewBox="0 0 220 150" role="presentation" focusable="false">
            <path d="m156 28 3-4 3 4-3 4Zm-8 7 2-3 3 3-3 3Z" fill="#8E82B4" />
            <path d="m4 108 27-20 23 14 24-36 30 33 23-22 23 21 23-15 39 21v31H4Z" fill="#8E82B4" />
            <path d="M4 119c41-13 71-8 105-13 37-6 65-11 111-2v32H4Z" fill="#B9AFD7" />
            <path d="M4 136c53-8 89-7 127-2 27 3 58-8 89-8v10H4Z" fill="#77719E" />
            <g fill="#69668F" opacity=".78"><ellipse cx="38" cy="125" rx="11" ry="4" /><ellipse cx="169" cy="128" rx="14" ry="5" /><ellipse cx="195" cy="118" rx="8" ry="3" /></g>
            <g fill="#7A739C" opacity=".82">
              <ellipse cx="43" cy="112" rx="18" ry="7" />
              <ellipse cx="163" cy="118" rx="23" ry="8" />
              <ellipse cx="96" cy="127" rx="9" ry="4" />
            </g>
            <path d="M4 112c38-13 69-4 103-11 38-8 73-12 109-3v39H4Z" fill="#C5BED8" opacity=".78" />
          </svg>
          <span className="destination-btn__label">{t('station.moon')}</span>
          <span className="destination-btn__detail">{t('station.moonDetail')}</span>
          <span className="storybook-station__portal-action" aria-hidden="true">↗</span>
        </button>
      </section>

      <div className="storybook-station__memory-path">
        <span className="storybook-station__memory-path-line" aria-hidden="true" />
        <button
          className="btn btn--secondary btn--lg station-screen__constellation-link"
          onClick={handleConstellationClick}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {t('station.constellation', { count: fragmentCount, total: 6 })}
        </button>
      </div>
    </div>
  );
}
