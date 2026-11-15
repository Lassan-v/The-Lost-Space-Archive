import { useLanguage } from '../../i18n';
import './SurveyorSamplingScene.css';

interface SurveyorSamplingSceneProps {
  completedActions: string[];
  activeAction: string;
}

const actions = ['dig', 'bearing', 'impact'] as const;

export function SurveyorSamplingScene({ completedActions, activeAction }: SurveyorSamplingSceneProps) {
  const { t } = useLanguage();
  const completedCount = actions.filter((action) => completedActions.includes(action)).length;

  return (
    <figure className={`surveyor-scene surveyor-scene--${activeAction || 'ready'}`}>
      <svg
        className="surveyor-scene__svg"
        viewBox="0 0 760 330"
        role="img"
        aria-label={t('challenge.surveyorSceneAlt', { count: completedCount })}
      >
        <defs>
          <linearGradient id="surveyor-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0E1230" />
            <stop offset=".7" stopColor="#1B1D48" />
            <stop offset="1" stopColor="#2A2860" />
          </linearGradient>
          <linearGradient id="surveyor-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B9B3D6" />
            <stop offset=".55" stopColor="#8F88B5" />
            <stop offset="1" stopColor="#625C8E" />
          </linearGradient>
          <linearGradient id="surveyor-ridge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6D6799" />
            <stop offset="1" stopColor="#4A4577" />
          </linearGradient>
          <radialGradient id="surveyor-crater" cx="50%" cy="35%" r="70%">
            <stop offset="0" stopColor="#5A5487" />
            <stop offset=".75" stopColor="#7C75A8" />
            <stop offset="1" stopColor="#CFC9E8" />
          </radialGradient>
        </defs>
        {/* Black lunar sky: no Moon disc here — we are standing on the Moon. */}
        <rect width="760" height="330" rx="18" fill="url(#surveyor-sky)" />
        <g className="surveyor-scene__stars" fill="#FFF4D9" aria-hidden="true">
          <circle cx="58" cy="40" r="1.6" /><circle cx="132" cy="92" r="1.1" /><circle cx="300" cy="34" r="1.4" />
          <circle cx="362" cy="96" r="1" /><circle cx="470" cy="52" r="1.7" /><circle cx="548" cy="118" r="1.1" />
          <circle cx="612" cy="30" r="1.3" /><circle cx="690" cy="84" r="1.6" /><circle cx="726" cy="140" r="1" />
          <circle cx="408" cy="150" r="1.1" /><circle cx="250" cy="130" r="1" />
          <path className="surveyor-scene__twinkle" d="M560 60c.7 3.6 2.1 5 5.7 5.7-3.6.7-5 2.1-5.7 5.7-.7-3.6-2.1-5-5.7-5.7 3.6-.7 5-2.1 5.7-5.7Z" fill="#FFE39A" />
          <path className="surveyor-scene__twinkle surveyor-scene__twinkle--late" d="M96 120c.6 3 1.8 4.2 4.8 4.8-3 .6-4.2 1.8-4.8 4.8-.6-3-1.8-4.2-4.8-4.8 3-.6 4.2-1.8 4.8-4.8Z" fill="#E0D2FF" />
        </g>
        {/* Distant crater rim and ridges, full width */}
        <path d="M0 200 70 176l60 14 70-30 64 26 80-22 70 20 76-34 70 28 90-20 110 26v42H0Z" fill="url(#surveyor-ridge)" />
        <path d="M0 214q120-18 240-4t250-6 270 8v120H0Z" fill="#7A73A6" />
        <path d="M0 232Q110 218 216 232T425 228T760 232V330H0Z" fill="url(#surveyor-ground)" />
        <ellipse cx="96" cy="292" rx="70" ry="16" fill="url(#surveyor-crater)" opacity=".9" />
        <ellipse cx="96" cy="288" rx="46" ry="8" fill="#575083" opacity=".55" />
        <ellipse cx="640" cy="304" rx="96" ry="18" fill="url(#surveyor-crater)" opacity=".85" />
        <ellipse cx="640" cy="300" rx="62" ry="9" fill="#575083" opacity=".5" />
        <ellipse cx="300" cy="300" rx="28" ry="6" fill="#6A6497" />
        <g fill="#5E5890" stroke="#2A2552" strokeWidth="2" strokeLinejoin="round">
          <path d="M520 246l10-8 14 3 4 9H518Z" />
          <path d="M40 252l8-7 12 2 3 7H38Z" />
          <path d="M700 258l6-5 9 2 2 5h-18Z" />
        </g>
        <path d="M0 252Q145 236 272 252T518 248T760 254" fill="none" stroke="#CFC9E8" strokeWidth="2" opacity=".35" />

        <g className="surveyor-scene__lander" aria-hidden="true" stroke="var(--storybook-navy, #111D38)" strokeLinejoin="round" strokeLinecap="round">
          {/* Landing legs with round footpads */}
          <path d="M176 150L144 218M246 150L280 218M206 154L206 222" fill="none" strokeWidth="6" />
          <ellipse cx="142" cy="222" rx="15" ry="5" fill="#D9D3EE" strokeWidth="3" />
          <ellipse cx="282" cy="222" rx="15" ry="5" fill="#D9D3EE" strokeWidth="3" />
          <ellipse cx="206" cy="226" rx="13" ry="4.5" fill="#D9D3EE" strokeWidth="3" />
          <ellipse cx="212" cy="232" rx="96" ry="7" fill="#2A2552" opacity=".22" stroke="none" />
          {/* Body */}
          <path d="M168 104L211 82L254 104V150H168Z" fill="var(--storybook-gold, #F7AE32)" strokeWidth="4" />
          <path d="M168 104L211 82L254 104" fill="none" stroke="#FFE39A" strokeWidth="3" />
          <path d="M178 112H244V142H178Z" fill="var(--storybook-paper, #FFF4D9)" strokeWidth="3" />
          {/* TV camera */}
          <rect x="192" y="116" width="26" height="20" rx="5" fill="#C7A8EE" strokeWidth="3" />
          <circle cx="205" cy="126" r="6.5" fill="var(--storybook-blue, #74B8E7)" strokeWidth="2.5" />
          <circle className="surveyor-scene__lens-glint" cx="203" cy="124" r="2" fill="#FFF" stroke="none" />
          <rect x="226" y="120" width="12" height="16" rx="3" fill="#E6E0F5" strokeWidth="2.5" />
          {/* Mast with solar panel and flat antenna */}
          <path d="M211 82V40" fill="none" strokeWidth="4" />
          <g className="surveyor-scene__panel">
            <path d="M176 30L211 40L246 30L211 20Z" fill="#74B8E7" strokeWidth="3" />
            <path d="M193 25L229 35M193 35L229 25" fill="none" stroke="#2A2552" strokeWidth="1.5" opacity=".6" />
          </g>
          <path d="M211 58L168 72" fill="none" strokeWidth="3" />
          <rect className="surveyor-scene__antenna" x="146" y="64" width="26" height="16" rx="3" fill="#E6E0F5" strokeWidth="3" transform="rotate(-18 159 72)" />
          <circle className="surveyor-scene__beacon" cx="211" cy="40" r="4" fill="#FF9D8A" strokeWidth="2" />
        </g>

        <g
          className={`surveyor-scene__arm surveyor-scene__arm--${activeAction || 'ready'}`}
          transform={activeAction ? `rotate(${activeAction === 'dig' ? 17 : activeAction === 'bearing' ? 6 : activeAction === 'impact' ? 22 : 0} 255 150)` : undefined}
          aria-hidden="true"
        >
          <path d="M245 150L291 164L340 192L398 206" fill="none" stroke="var(--storybook-navy, #111D38)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="291" cy="164" r="9" fill="var(--storybook-gold, #F7AE32)" stroke="var(--storybook-navy, #111D38)" strokeWidth="3" />
          <circle cx="340" cy="192" r="8" fill="var(--storybook-gold, #F7AE32)" stroke="var(--storybook-navy, #111D38)" strokeWidth="3" />
          <path d="M397 204L412 207L405 224Q395 221 397 204Z" fill="var(--storybook-blue, #74B8E7)" stroke="var(--storybook-navy, #111D38)" strokeWidth="3" />
        </g>

        <g className="surveyor-scene__sample-field" aria-hidden="true">
          <path d="M376 235Q418 225 464 236" fill="none" stroke="var(--storybook-rust, #A95542)" strokeWidth="4" strokeLinecap="round" />
          <text className="surveyor-scene__label" x="420" y="276" textAnchor="middle" fill="#2A2552" fontSize="15" fontWeight="800">{t('challenge.surveyorSampleField')}</text>
          {completedActions.includes('dig') && <g className="surveyor-scene__trench">
            <path d="M383 236Q410 259 448 236" fill="none" stroke="var(--storybook-navy, #111D38)" strokeWidth="7" strokeLinecap="round" />
            <path d="M382 232Q406 244 432 231" fill="none" stroke="var(--storybook-gold, #F7AE32)" strokeWidth="6" strokeLinecap="round" />
          </g>}
          {completedActions.includes('bearing') && <g className="surveyor-scene__bearing-mark">
            <ellipse cx="458" cy="232" rx="18" ry="6" fill="none" stroke="var(--color-success)" strokeWidth="4" />
            <path d="M458 218V231M450 224L458 218L466 224" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>}
          {completedActions.includes('impact') && <g className="surveyor-scene__impact-mark" stroke="var(--storybook-gold, #F7AE32)" strokeWidth="4" strokeLinecap="round">
            <path d="M488 210V198M500 215L509 207M476 215L467 207" />
            <circle cx="488" cy="225" r="5" fill="var(--storybook-gold, #F7AE32)" stroke="none" />
          </g>}
        </g>

        {activeAction && <g key={`dust-${activeAction}-${completedCount}`} className="surveyor-scene__dust" aria-hidden="true" fill="#E6E0F5">
          <circle cx="404" cy="230" r="4" /><circle cx="418" cy="226" r="3" /><circle cx="392" cy="226" r="3.5" />
          <circle cx="430" cy="232" r="2.5" /><circle cx="380" cy="232" r="2.5" />
        </g>}

        <g className="surveyor-scene__indicators" aria-hidden="true">
          {actions.map((action, index) => {
            const x = 568 + index * 58;
            const complete = completedActions.includes(action);
            return <g key={action} transform={`translate(${x} 245)`} className={complete ? 'is-complete' : ''}>
              <circle className="surveyor-scene__indicator" r="17" />
              <text className="surveyor-scene__indicator-mark" y="6" textAnchor="middle">{complete ? '✓' : index + 1}</text>
            </g>;
          })}
        </g>
      </svg>
      <ul className="surveyor-scene__legend" aria-label={t('challenge.samplesDone', { count: completedCount })}>
        {actions.map((action) => <li key={action} className={completedActions.includes(action) ? 'is-complete' : ''}>
          <span aria-hidden="true">{completedActions.includes(action) ? '✓' : '○'}</span>
          {t(action === 'dig' ? 'challenge.dig' : action === 'bearing' ? 'challenge.bearing' : 'challenge.impact')}
        </li>)}
      </ul>
      <figcaption>{t('challenge.surveyorSceneCaption')}</figcaption>
    </figure>
  );
}
