/**
 * ChallengeScreen — The Lost Space Archive
 * Sojourner Part Builder (P3) - Drag parts onto chassis silhouette
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect, useRef, type ComponentRef } from 'react';
import { useProgress } from '../components/providers/ProgressProvider';
import { useAudio } from '../components/providers/AudioProvider';
import { ChassisSilhouette } from '../components/challenge/ChassisSilhouette';
import { PartCard } from '../components/challenge/PartCard';
import { InstructionText } from '../components/content/InstructionText';
import { SimulationBanner } from '../components/content/SimulationBanner';
import { SparkDialogue } from '../components/content/SparkDialogue';
import { getObjectSourceIds, SOJOURNER_OBJECT_ID } from '../data/nasa';
import { BackButton } from '../components/navigation/BackButton';
import { SOJOURNER_PARTS, SOJOURNER_SLOTS, DOSSIER_IDS, FRAGMENT_IDS, ROUTES } from '../utils/constants';
import type { ChassisSlot } from '../types';
import { announce } from '../utils/accessibility';
import { useLanguage, type TranslationKey } from '../i18n';
import './ChallengeScreen.css';
import { MissionActivityScreen } from './MissionActivityScreen';

const PART_TRANSLATIONS: Record<string, { label: TranslationKey; job: TranslationKey }> = {
  'solar-panel': { label: 'challenge.part.solar.label', job: 'challenge.part.solar.job' },
  'front-cameras': { label: 'challenge.part.front.label', job: 'challenge.part.front.job' },
  'rear-camera': { label: 'challenge.part.rear.label', job: 'challenge.part.rear.job' },
  'apxs-arm': { label: 'challenge.part.apxs.label', job: 'challenge.part.apxs.job' },
  wheels: { label: 'challenge.part.wheels.label', job: 'challenge.part.wheels.job' },
};

const SLOT_TRANSLATIONS: Record<string, TranslationKey> = {
  solar: 'challenge.part.solar.label',
  'front-cam': 'challenge.part.front.label',
  'rear-cam': 'challenge.part.rear.label',
  apxs: 'challenge.part.apxs.label',
  wheels: 'challenge.part.wheels.label',
};

export function ChallengeScreen() {
  const { id } = useParams<{ id: string }>();
  if (id === DOSSIER_IDS.SOJOURNER) return <SojournerChallengeScreen key={id} />;
  return <MissionActivityScreen key={id ?? 'unavailable'} />;
}

function SojournerChallengeScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { challengeProgress, updateChallengeProgress, completeDossier } = useProgress();
  const { playSound, speak } = useAudio();
  const { t } = useLanguage();

  const dossierId = DOSSIER_IDS.SOJOURNER;
  const savedProgress = challengeProgress[dossierId] || { placedParts: [] };
  const localizedParts = SOJOURNER_PARTS.map(part => ({
    ...part,
    label: t(PART_TRANSLATIONS[part.id].label),
    job: t(PART_TRANSLATIONS[part.id].job),
  }));
  const [restoredComplete] = useState(() =>
    SOJOURNER_PARTS.every(part => savedProgress.placedParts.includes(part.id))
  );

  // State
  const [slots, setSlots] = useState<ChassisSlot[]>(() =>
    SOJOURNER_SLOTS.map(slot => {
      const placedPart = SOJOURNER_PARTS.find(part =>
        part.targetSlot === slot.id && savedProgress.placedParts.includes(part.id)
      );
      return { ...slot, label: t(SLOT_TRANSLATIONS[slot.id]), filled: Boolean(placedPart), partId: placedPart?.id };
    })
  );

  const [draggedPartId, setDraggedPartId] = useState<string | null>(null);
  const [keyboardSelectedPartId, setKeyboardSelectedPartId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ key: TranslationKey | ''; values?: { partId?: string; slotId?: string }; type: 'success' | 'error' | 'hint' | '' }>({
    key: '',
    type: '',
  });
  const [highlightedSlotId, setHighlightedSlotId] = useState<string | undefined>();
  const [attemptCount, setAttemptCount] = useState<Record<string, number>>({});
  const [challengeComplete, setChallengeComplete] = useState(() =>
    SOJOURNER_PARTS.every(part => savedProgress.placedParts.includes(part.id))
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const exitDialogRef = useRef<ComponentRef<'div'>>(null);
  const [exitDestination, setExitDestination] = useState<string>(ROUTES.STATION);
  const feedbackPart = localizedParts.find(part => part.id === feedback.values?.partId);
  const feedbackValues: Record<string, string> = {};
  if (feedbackPart) {
    feedbackValues.part = feedbackPart.label;
    feedbackValues.job = feedbackPart.job;
  }
  if (feedback.values?.slotId) {
    feedbackValues.slot = t(SLOT_TRANSLATIONS[feedback.values.slotId] ?? 'challenge.parts');
  }
  const feedbackMessage = feedback.key ? t(feedback.key, feedbackValues) : '';

  const handleChallengeComplete = useCallback(() => {
    playSound('success');
    announce(t('challenge.complete'), 'polite');
    speak(t('challenge.completeDetail'));

    setFeedback({
      key: 'challenge.complete',
      type: 'success',
    });

    // Navigate to fragment reward after brief delay
    setTimeout(() => {
      completeDossier(DOSSIER_IDS.SOJOURNER, FRAGMENT_IDS.SOJOURNER);
      navigate(`${ROUTES.FRAGMENT}/${DOSSIER_IDS.SOJOURNER}`);
    }, 2000);
  }, [playSound, speak, completeDossier, navigate, t, setFeedback]);

  // Persist progress on each change
  useEffect(() => {
    const placedParts = slots.filter(s => s.filled).map(s => s.partId!).filter(Boolean);
    updateChallengeProgress(dossierId, { placedParts });
  }, [slots, dossierId, updateChallengeProgress]);

  useEffect(() => {
    const handleExitRequest = () => {
      if (slots.some(slot => slot.filled)) {
        setExitDestination(ROUTES.STATION);
        setShowExitModal(true);
      } else {
        navigate(ROUTES.STATION);
      }
    };
    window.addEventListener('lsa:exit-challenge', handleExitRequest);
    return () => window.removeEventListener('lsa:exit-challenge', handleExitRequest);
  }, [slots, navigate]);

  const handleDragStart = useCallback((partId: string) => {
    setDraggedPartId(partId);
    setKeyboardSelectedPartId(null);
    playSound('place');
    const part = localizedParts.find(p => p.id === partId);
    if (part) {
      speak(part.job);
    }
  }, [localizedParts, playSound, speak, setDraggedPartId, setKeyboardSelectedPartId]);

  const handleDragEnd = useCallback(() => {
    setDraggedPartId(null);
    setHighlightedSlotId(undefined);
  }, [setDraggedPartId, setHighlightedSlotId]);

  const handlePartClick = useCallback((partId: string) => {
    if (keyboardSelectedPartId === partId) {
      setKeyboardSelectedPartId(null);
      setHighlightedSlotId(undefined);
    } else {
      setKeyboardSelectedPartId(partId);
      const part = localizedParts.find(p => p.id === partId);
      const slot = slots.find(s => s.id === part?.targetSlot);
      if (slot) setHighlightedSlotId(slot.id);
      playSound('click');
      if (part) speak(part.job);
    }
  }, [keyboardSelectedPartId, slots, localizedParts, playSound, speak, setKeyboardSelectedPartId, setHighlightedSlotId]);

  const handleSlotDrop = useCallback((slotId: string, partId: string) => {
    const part = localizedParts.find(p => p.id === partId);
    const slot = slots.find(s => s.id === slotId);
    if (!part || !slot || slot.filled) return;

    // Check if correct slot
    if (part.targetSlot === slotId) {
      // Correct placement
      const newSlots = slots.map(s =>
        s.id === slotId ? { ...s, filled: true, partId } : s
      );
      setSlots(newSlots);
      playSound('success');
      setFeedback({
        key: 'challenge.partPlaced',
        values: { partId: part.id },
        type: 'success',
      });
      speak(t('challenge.partPlaced', { part: part.label, job: part.job }));
      setAttemptCount(prev => ({ ...prev, [partId]: 0 }));
      setKeyboardSelectedPartId(null);
      setHighlightedSlotId(undefined);

      // Check if this completes the challenge
      if (newSlots.every(s => s.filled) && !challengeComplete) {
        setChallengeComplete(true);
        handleChallengeComplete();
      }
    } else {
      // Incorrect placement
      const attempts = (attemptCount[partId] || 0) + 1;
      setAttemptCount(prev => ({ ...prev, [partId]: attempts }));

      if (attempts >= 2) {
        // Show hint - highlight correct slot
        setHighlightedSlotId(part.targetSlot);
        const correctSlot = slots.find(s => s.id === part.targetSlot);
        playSound('hint');
        const hint = t('challenge.hint', { part: part.label, slot: correctSlot?.label ?? '' });
        setFeedback({
          key: 'challenge.hint',
          values: { partId: part.id, slotId: part.targetSlot },
          type: 'hint',
        });
        speak(hint);
      } else {
        playSound('error');
        const incorrect = t('challenge.incorrect', { part: part.label, slot: t(SLOT_TRANSLATIONS[slot.id]) });
        setFeedback({
          key: 'challenge.incorrect',
          values: { partId: part.id, slotId: slot.id },
          type: 'error',
        });
        speak(incorrect);
      }
    }
  }, [slots, attemptCount, playSound, speak, challengeComplete, handleChallengeComplete, localizedParts, t, setSlots, setFeedback, setAttemptCount, setChallengeComplete, setKeyboardSelectedPartId, setHighlightedSlotId]);

  const handlePartRemove = useCallback((slotId: string) => {
    setSlots(prev =>
      prev.map(s =>
        s.id === slotId ? { ...s, filled: false, partId: undefined } : s
      )
    );
    playSound('click');
  }, [playSound, setSlots]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, partId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePartClick(partId);
    } else if (e.key === 'Escape') {
      setKeyboardSelectedPartId(null);
      setHighlightedSlotId(undefined);
    }
  }, [handlePartClick, setKeyboardSelectedPartId, setHighlightedSlotId]);

  const requestExit = (destination: string) => {
    if (slots.some(s => s.filled)) {
      setExitDestination(destination);
      setShowExitModal(true);
    } else {
      navigate(destination);
    }
  };

  const handleExitConfirm = useCallback((confirm: boolean) => {
    setShowExitModal(false);
    if (confirm) {
      navigate(exitDestination);
    }
  }, [exitDestination, navigate, setShowExitModal]);

  useEffect(() => {
    if (!showExitModal) return;
    const dialog = exitDialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleExitConfirm(false);
      } else if (event.key === 'Tab' && focusable.length) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    dialog.addEventListener('keydown', keepFocusInside);
    return () => {
      dialog.removeEventListener('keydown', keepFocusInside);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [showExitModal, handleExitConfirm]);

  return (
    <div className="challenge-screen challenge-screen--sojourner">
      <div className="challenge-screen__content">
        <header className="challenge-screen__header">
          <BackButton href={ROUTES.DOSSIER + '/' + id} label={t('nav.dossier')} onClick={() => requestExit(`${ROUTES.DOSSIER}/${id}`)} />
          <div>
            <h1 className="challenge-screen__title">{t('challenge.sojournerTitle')}</h1>
            <InstructionText
              id="sojourner-challenge-instruction"
              instruction={t('challenge.sojournerInstruction')}
              termDefinitions={{
                'Sojourner': t('challenge.term.sojourner'),
                'Mars rover': t('challenge.term.rover'),
              }}
            />
            <SimulationBanner sourceIds={getObjectSourceIds(SOJOURNER_OBJECT_ID)} variant="challenge" />
          </div>
        </header>

        <SparkDialogue message={t('spark.sojourner')} showCharacter pose={challengeComplete ? 'celebration' : 'speaking'} />

        <section className="challenge-screen__main challenge-p3">
          <div className="challenge-screen__panel challenge-p3__chassis-panel">
            <h2 className="challenge-screen__panel-title">{t('challenge.chassis')}</h2>
            <ChassisSilhouette
              slots={slots.map(slot => ({ ...slot, label: t(SLOT_TRANSLATIONS[slot.id]) }))}
              highlightedSlotId={highlightedSlotId}
              selectedPartId={keyboardSelectedPartId ?? undefined}
              onDrop={handleSlotDrop}
              onPartRemove={handlePartRemove}
            />
          </div>

          <div className="challenge-screen__panel challenge-p3__palette-panel">
            <h2 className="challenge-screen__panel-title">{t('challenge.parts')}</h2>
            <div className="parts-palette">
              <p className="parts-palette__label">{t('challenge.dragParts')}</p>
              {localizedParts.map(part => {
                const isPlaced = slots.some(s => s.filled && s.partId === part.id);
                const isDragging = draggedPartId === part.id;
                const isKeyboardSelected = keyboardSelectedPartId === part.id;

                return (
                  <PartCard
                    key={part.id}
                    part={part}
                    isPlaced={isPlaced}
                    isDragging={isDragging || isKeyboardSelected}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={handlePartClick}
                    onKeyDown={handleKeyDown}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <footer className="challenge-screen__footer">
          <div
            className={`challenge-screen__feedback challenge-screen__feedback--${feedback.type}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedbackMessage}
          </div>
          <button
            className="btn btn--secondary btn--lg challenge-screen__station-btn"
            onClick={() => requestExit(ROUTES.STATION)}
            type="button"
          >
            {t('nav.memoryStation')}
          </button>
          {restoredComplete && slots.every(slot => slot.filled) && (
            <button
              className="btn btn--primary btn--lg"
              onClick={() => {
                completeDossier(DOSSIER_IDS.SOJOURNER, FRAGMENT_IDS.SOJOURNER);
                navigate(`${ROUTES.FRAGMENT}/${DOSSIER_IDS.SOJOURNER}`);
              }}
              type="button"
            >
              {t('challenge.collectFragment')}
            </button>
          )}
        </footer>

        {/* Exit Confirmation Modal */}
        {showExitModal && (
          <div className="modal-overlay" onClick={() => handleExitConfirm(false)}>
            <div ref={exitDialogRef} className="modal modal--sm challenge-exit-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="exit-modal-title" tabIndex={-1}>
              <header className="modal__header">
                <h2 id="exit-modal-title" className="modal__title">{t('challenge.leaveTitle')}</h2>
                <button className="modal__close" onClick={() => handleExitConfirm(false)} aria-label={t('constellation.close')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </header>
              <div className="modal__content">
                <p className="challenge-exit-modal__message">
                  {t('challenge.leaveBody')}
                </p>
              </div>
              <footer className="challenge-exit-modal__actions">
                <button className="btn btn--primary" onClick={() => handleExitConfirm(true)} autoFocus>
                  {t('challenge.goStation')}
                </button>
                <button className="btn btn--secondary" onClick={() => handleExitConfirm(false)}>
                  {t('challenge.stay')}
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
