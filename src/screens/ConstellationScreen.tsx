/**
 * ConstellationScreen — The Lost Space Archive
 * Night sky with six collectible fragments, one per playable object
 */

import { useHref, useNavigate } from 'react-router-dom';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { CONSTELLATION_STARS, CONSTELLATION_LINES, FRAGMENT_IDS, PLAYABLE_DOSSIER_IDS, PLAYABLE_FRAGMENT_IDS, ROUTES, countPlayableFragments } from '../utils/constants';
import type { Fragment } from '../types';
import { useState, useCallback, useEffect, useRef } from 'react';
import { announce } from '../utils/accessibility';
import { useLanguage, type TranslationKey } from '../i18n';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { StorySparkle } from '../components/content/StorySparkle';
import { FragmentArt } from '../components/content/FragmentArt';
import { Confetti } from '../components/content/Confetti';
import { CharacterIllustration } from '../components/content/CharacterIllustration';
import { trapFocus } from '../utils/accessibility';
import './ConstellationScreen.css';

const fragmentByStar: Record<string, { id: string; title: TranslationKey; caption: TranslationKey; illustration: string }> = {
  'sojourner-mpf': { id: FRAGMENT_IDS.SOJOURNER, title: 'fragment.sojournerTitle', caption: 'fragment.sojournerCaption', illustration: 'wheel-track' },
  'spirit-mer-a': { id: FRAGMENT_IDS.SPIRIT, title: 'fragment.spiritTitle', caption: 'fragment.spiritCaption', illustration: 'silica' },
  'opportunity-mer-b': { id: FRAGMENT_IDS.OPPORTUNITY, title: 'fragment.opportunityTitle', caption: 'fragment.opportunityCaption', illustration: 'hematite' },
  'ingenuity-mh': { id: FRAGMENT_IDS.INGENUITY, title: 'fragment.ingenuityTitle', caption: 'fragment.ingenuityCaption', illustration: 'rotor' },
  'surveyor-3': { id: FRAGMENT_IDS.SURVEYOR3, title: 'fragment.surveyorTitle', caption: 'fragment.surveyorCaption', illustration: 'scoop' },
  'apollo17-lrv-3': { id: FRAGMENT_IDS.APOLLO17, title: 'fragment.apollo17Title', caption: 'fragment.apollo17Caption', illustration: 'route' },
};

const characterNameByStar: Record<string, TranslationKey> = {
  'sojourner-mpf': 'character.sojourner.name',
  'spirit-mer-a': 'character.spirit.name',
  'opportunity-mer-b': 'character.opportunity.name',
  'ingenuity-mh': 'character.ingenuity.name',
  'surveyor-3': 'character.surveyor3.name',
  'apollo17-lrv-3': 'character.apollo17.name',
};

export function ConstellationScreen() {
  const navigate = useNavigate();
  const stationHref = useHref(ROUTES.STATION);
  const { collectedFragments, completedDossiers, resetProgress } = useProgress();
  const { playSound } = useAudio();
  const { t } = useLanguage();
  const collectedCount = countPlayableFragments(collectedFragments);
  const adventureComplete = PLAYABLE_DOSSIER_IDS.every(id => completedDossiers.includes(id))
    && PLAYABLE_FRAGMENT_IDS.every(id => collectedFragments.includes(id));

  const [selectedStarId, setSelectedStarId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReplayConfirmation, setShowReplayConfirmation] = useState(false);
  const [stayFeedback, setStayFeedback] = useState(false);
  const replayOpenerRef = useRef<HTMLButtonElement>(null);
  const replayDialogRef = useRef<HTMLElement>(null);
  const cancelReplayRef = useRef<HTMLButtonElement>(null);
  const confirmReplayRef = useRef<HTMLButtonElement>(null);
  const detailDialogRef = useRef<HTMLElement | null>(null);
  const detailCloseRef = useRef<HTMLButtonElement>(null);
  const detailOpenerRef = useRef<HTMLElement | null>(null);

  const closeReplayConfirmation = useCallback(() => {
    setShowReplayConfirmation(false);
    window.setTimeout(() => replayOpenerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!showReplayConfirmation) return;
    cancelReplayRef.current?.focus();
    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeReplayConfirmation();
      } else if (event.key === 'Tab') {
        const focusable = replayDialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable?.[0];
        const last = focusable?.[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleDialogKeyDown);
    return () => document.removeEventListener('keydown', handleDialogKeyDown);
  }, [showReplayConfirmation, closeReplayConfirmation]);

  useEffect(() => {
    if (!showDetail || !detailDialogRef.current) return;
    detailCloseRef.current?.focus();
    const releaseFocus = trapFocus(detailDialogRef.current, detailCloseRef.current);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        playSound('click');
        setShowDetail(false);
        setSelectedStarId(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      releaseFocus();
      document.removeEventListener('keydown', handleEscape);
      window.setTimeout(() => detailOpenerRef.current?.focus(), 0);
    };
  }, [showDetail, playSound]);

  // Build stars with collected status
  const stars = CONSTELLATION_STARS.map(star => {
    const metadata = fragmentByStar[star.id];
    const isCollected = metadata ? collectedFragments.includes(metadata.id) : false;
    const fragment: Fragment | undefined = metadata && isCollected ? {
      id: metadata.id,
      title: t(metadata.title),
      caption: t(metadata.caption),
      illustration: metadata.illustration,
    } : undefined;

    return { ...star, collected: isCollected, fragment };
  });

  const handleStarClick = useCallback((starId: string) => {
    const star = stars.find(s => s.id === starId);
    if (star?.collected && star.fragment) {
      playSound('click');
      setSelectedStarId(starId);
      detailOpenerRef.current = document.activeElement as HTMLElement;
      setShowDetail(true);
      announce(`${star.fragment.title}. ${star.fragment.caption}`, 'polite');
    } else if (!star?.collected) {
      playSound('error');
      announce(t('constellation.notExplored'), 'polite');
    }
  }, [playSound, stars, announce, t]);

  const handleStarKeyDown = useCallback((e: React.KeyboardEvent, starId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStarClick(starId);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      // Focus handled by roving tabindex
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      // Focus handled by roving tabindex
    } else if (e.key === 'Escape') {
      setShowDetail(false);
      setSelectedStarId(null);
    }
  }, [handleStarClick, stars]);

  const handleCloseDetail = () => {
    playSound('click');
    setShowDetail(false);
    setSelectedStarId(null);
  };

  const handleContinue = () => {
    playSound('click');
    navigate(ROUTES.STATION);
  };

  const handleStay = () => {
    setStayFeedback(true);
    announce(t('replay.stayFeedback'), 'polite');
  };

  const handleStartReplay = () => {
    resetProgress();
    setShowReplayConfirmation(false);
    navigate(ROUTES.WELCOME, { state: { newAdventure: true } });
  };

  return (
    <div className="constellation-screen">
      <header className="constellation-screen__header">
        <div className="constellation-screen__header-left">
          <a href={stationHref} className="btn btn--back" onClick={(e) => { e.preventDefault(); handleContinue(); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>{t('nav.memoryStation')}</span>
          </a>
        </div>
        <h1 className="constellation-screen__title">{t('constellation.title')}</h1>
        <div className="constellation-screen__header-right" aria-hidden="true">
          <span className="constellation-progress">
            {stars.map((star, index) => (
              <span key={star.id} className={`constellation-progress__star${star.collected ? ' is-lit' : ''}`} style={{ animationDelay: `${index * 90}ms` }}>
                {star.collected ? <StorySparkle variant="star" size={22} delay={index * 0.4} /> : (
                  <svg width="22" height="22" viewBox="0 0 48 48"><path d="M24 6l5.6 11.4 12.6 1.8-9.1 8.9 2.2 12.5L24 34.7l-11.3 5.9 2.2-12.5-9.1-8.9 12.6-1.8Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" /></svg>
                )}
              </span>
            ))}
          </span>
          <span className="constellation-screen__progress">{collectedCount}/6</span>
        </div>
      </header>

      <div className="constellation-screen__field-wrapper">
        <div className="constellation-field" role="graphics-document" aria-label={t('constellation.progressLabel', { count: collectedCount, total: 6 })}>
          {/* Background starfield */}
          <div className="constellation-field__bg" aria-hidden="true" />
          <div className="constellation-field__starfield" aria-hidden="true" />
          <div className="constellation-field__nebula constellation-field__nebula--violet" aria-hidden="true" />
          <div className="constellation-field__nebula constellation-field__nebula--amber" aria-hidden="true" />
          <div className="constellation-field__orbit" aria-hidden="true" />

          {/* Constellation lines */}
          <svg className="constellation-field__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CONSTELLATION_LINES.map((line, index) => {
              const fromStar = stars.find(s => s.id === line.from);
              const toStar = stars.find(s => s.id === line.to);
              const bothCollected = fromStar?.collected && toStar?.collected;

              if (!fromStar || !toStar) return null;

              return (
                <g key={index} className={`memory-line${bothCollected ? ' memory-line--complete' : ''}`} style={{ animationDelay: `${index * 120}ms` }}>
                  {bothCollected && <line className="memory-line__glow" x1={fromStar.position.x} y1={fromStar.position.y} x2={toStar.position.x} y2={toStar.position.y} vectorEffect="non-scaling-stroke" />}
                  <line className="memory-line__core" x1={fromStar.position.x} y1={fromStar.position.y} x2={toStar.position.x} y2={toStar.position.y} vectorEffect="non-scaling-stroke" />
                </g>
              );
            })}
          </svg>

          {/* Stars */}
          {stars.map((star, index) => (
            <button
              key={star.id}
              className={`memory-star ${star.collected ? 'memory-star--lit' : 'memory-star--dim'}`}
              style={{
                left: `${star.position.x}%`,
                top: `${star.position.y}%`,
                animationDelay: `${200 + index * 110}ms`,
              }}
              onClick={() => handleStarClick(star.id)}
              onKeyDown={e => handleStarKeyDown(e, star.id)}
              aria-label={star.collected
                ? `${star.fragment?.title}. ${star.fragment?.caption}`
                : `${t(fragmentByStar[star.id]?.title ?? 'constellation.title')}. ${t('constellation.notExplored')}`}
              aria-disabled={!star.collected}
              tabIndex={0}
            >
              <span className="memory-star__halo" aria-hidden="true" />
              <span className="memory-star__icon" aria-hidden="true">
                {star.collected ? <StorySparkle variant="star" size={48} delay={index * 0.35} /> : (
                  <svg width="34" height="34" viewBox="0 0 48 48">
                    <path d="M24 6l5.6 11.4 12.6 1.8-9.1 8.9 2.2 12.5L24 34.7l-11.3 5.9 2.2-12.5-9.1-8.9 12.6-1.8Z" fill="rgba(199, 168, 238, .12)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="5 4" />
                  </svg>
                )}
              </span>
              <span className="memory-star__label" aria-hidden="true">
                {star.collected ? <span aria-hidden="true">✓ </span> : <span aria-hidden="true">? </span>}
                {t(characterNameByStar[star.id] ?? 'constellation.title')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {adventureComplete && (
        <section className="constellation-replay celebration-card" aria-labelledby="replay-complete-title">
          <Confetti className="celebration-card__confetti" />
          <div className="celebration-card__badge" aria-hidden="true">
            <svg viewBox="0 0 120 120" width="112" height="112" focusable="false">
              <path d="M38 70 26 112l20-10 12 16 8-40Zm44 0 12 42-20-10-12 16-8-40Z" fill="#9270D9" stroke="#2A2552" strokeWidth="3" strokeLinejoin="round" />
              <circle cx="60" cy="54" r="40" fill="#FFD15A" stroke="#2A2552" strokeWidth="3.5" />
              <circle cx="60" cy="54" r="31" fill="#FFE9A8" stroke="#F29A3B" strokeWidth="3" strokeDasharray="4 5" />
              <path className="celebration-card__badge-star" d="M60 32l6.6 13.4 14.8 2.2-10.7 10.4 2.5 14.7L60 65.8l-13.2 6.9 2.5-14.7-10.7-10.4 14.8-2.2Z" fill="#F7AE32" stroke="#2A2552" strokeWidth="3" strokeLinejoin="round" />
              <path d="M44 34c4-4 9-6 14-6" fill="none" stroke="#FFFBEA" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <h2 id="replay-complete-title" className="celebration-card__title">{t('replay.completeTitle')}</h2>
          <div className="celebration-card__stars" aria-hidden="true">
            {stars.map((star, index) => <StorySparkle key={star.id} variant="star" size={34} delay={index * 0.25} className="celebration-card__star" />)}
          </div>
          <SparkDialogue
            className="constellation-replay__dialogue celebration-card__dialogue"
            message={t(stayFeedback ? 'replay.stayFeedback' : 'replay.completeMessage')}
            showCharacter
            pose="celebration"
            live
          />
          <div className="constellation-replay__actions">
            <button ref={replayOpenerRef} className="btn btn--primary btn--lg replay-btn" type="button" onClick={() => setShowReplayConfirmation(true)}>
              <svg className="replay-btn__icon replay-btn__icon--rocket" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M14 4c3-1 5-1 6 0 1 1 1 3 0 6l-6 6-6-6Z" fill="currentColor" opacity=".9" /><circle cx="15" cy="9" r="1.8" fill="#FFF4D9" /><path d="M8 10 5 11l-2 3 4 1M14 16l-1 3-3 2-1-4M6 18l-2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t('replay.startOver')}
            </button>
            <button className="btn btn--secondary btn--lg replay-btn" type="button" onClick={handleStay}>
              <svg className="replay-btn__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
              {t('replay.stay')}
            </button>
          </div>
        </section>
      )}

      <p className="constellation-screen__instruction">
        {t('constellation.instruction')}
      </p>

      <div className="constellation-screen__actions">
        <button className="btn btn--primary btn--xl" onClick={handleContinue} type="button">
          {t('constellation.continue')}
        </button>
      </div>

      {/* Fragment Detail Modal */}
      {showDetail && selectedStarId && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div ref={element => { detailDialogRef.current = element; }} className="modal modal--md constellation-detail-modal" role="dialog" aria-modal="true" aria-labelledby="constellation-detail-title" onClick={e => e.stopPropagation()}>
            <header className="modal__header">
              <h2 id="constellation-detail-title" className="modal__title">{t('constellation.detailTitle')}</h2>
              <button ref={detailCloseRef} className="modal__close" onClick={handleCloseDetail} aria-label={t('constellation.close')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <div className="modal__content">
              <div className="constellation-detail-modal__content">
                <div className="constellation-detail-modal__illustration" aria-hidden="true">
                  <FragmentArt name={stars.find(s => s.id === selectedStarId)?.fragment?.illustration || 'wheel-track'} size="xl" />
                </div>
                <h3 className="constellation-detail-modal__title">{stars.find(s => s.id === selectedStarId)?.fragment?.title}</h3>
                <p className="constellation-detail-modal__caption">{stars.find(s => s.id === selectedStarId)?.fragment?.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReplayConfirmation && (
        <div className="modal-overlay constellation-replay-overlay" onClick={closeReplayConfirmation}>
          <section
            ref={replayDialogRef}
            className="modal modal--md constellation-replay-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="replay-confirm-title"
            aria-describedby="replay-confirm-message"
            onClick={event => event.stopPropagation()}
          >
            <div className="replay-modal__sky" aria-hidden="true">
              <span className="replay-modal__orbit" />
              <StorySparkle className="replay-modal__sparkle replay-modal__sparkle--a" size={26} />
              <StorySparkle className="replay-modal__sparkle replay-modal__sparkle--b" size={20} delay={1.2} />
              <StorySparkle className="replay-modal__sparkle replay-modal__sparkle--c" variant="star" size={22} delay={.6} />
              <div className="replay-modal__spark">
                <CharacterIllustration character="keeper" pose="thinking" size="medium" ariaLabel="" />
              </div>
            </div>
            <div className="replay-modal__body">
              <h2 id="replay-confirm-title" className="replay-modal__title">{t('replay.confirmTitle')}</h2>
              <SparkDialogue className="replay-modal__bubble" message={t('replay.sparkPrompt')} />
              <p id="replay-confirm-message" className="constellation-replay-modal__message replay-modal__note">
                <svg className="replay-modal__note-icon" viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
                  <path d="M5 11h22v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" fill="#C7A8EE" stroke="#2A2552" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M3 6h26v5H3Z" fill="#9270D9" stroke="#2A2552" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 16h8" stroke="#2A2552" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
                <span>{t('replay.confirmMessage')}</span>
              </p>
              <div className="constellation-replay__actions replay-modal__actions">
                <button ref={cancelReplayRef} className="btn btn--secondary btn--lg replay-btn" type="button" onClick={closeReplayConfirmation}>
                  <svg className="replay-btn__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
                  {t('replay.cancelAction')}
                </button>
                <button ref={confirmReplayRef} className="btn btn--primary btn--lg replay-btn" type="button" onClick={handleStartReplay}>
                  <svg className="replay-btn__icon replay-btn__icon--rocket" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M14 4c3-1 5-1 6 0 1 1 1 3 0 6l-6 6-6-6Z" fill="currentColor" opacity=".9" /><circle cx="15" cy="9" r="1.8" fill="#FFF4D9" /><path d="M8 10 5 11l-2 3 4 1M14 16l-1 3-3 2-1-4M6 18l-2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {t('replay.confirmAction')}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
