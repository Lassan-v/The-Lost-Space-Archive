/**
 * PersistentHeader — The Lost Space Archive
 * Always-visible navigation and status header
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useProgress } from '../providers/ProgressProvider';
import { useAccessibility } from '../providers/AccessibilityProvider';
import { useAudio } from '../providers/AudioProvider';
import { useLanguage } from '../../i18n';
import { trapFocus } from '../../utils/accessibility';
import { DOSSIER_IDS, ROUTES, countPlayableFragments } from '../../utils/constants';
import './PersistentHeader.css';

export function PersistentHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { collectedFragments } = useProgress();
  const {
    announce,
    reducedMotion,
    toggleReducedMotion,
    highContrast,
    toggleHighContrast,
    audioEnabled,
    narrationEnabled,
    toggleAudio,
    toggleNarration,
  } = useAccessibility();
  const { playSound } = useAudio();
  const { language, setLanguage, t } = useLanguage();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsOpenerRef = useRef<HTMLButtonElement>(null);
  const settingsDialogRef = useRef<HTMLElement>(null);

  const fragmentCount = countPlayableFragments(collectedFragments);
  const totalFragments = 6;

  const handleMemoryStationClick = () => {
    playSound('click');
    if (location.pathname === `${ROUTES.CHALLENGE}/${DOSSIER_IDS.SOJOURNER}`) {
      window.dispatchEvent(new CustomEvent('lsa:exit-challenge'));
    } else {
      navigate(ROUTES.STATION);
      announce(t('nav.memoryStation'), 'polite');
    }
  };

  const handleConstellationClick = () => {
    playSound('click');
    navigate(ROUTES.CONSTELLATION);
    announce(t('nav.constellationProgress', { count: fragmentCount, total: totalFragments }), 'polite');
  };

  const handleSettingsClick = () => {
    playSound('click');
    setSettingsOpen(true);
  };

  useEffect(() => {
    if (!settingsOpen || !settingsDialogRef.current) return;
    const restoreFocus = () => window.setTimeout(() => settingsOpenerRef.current?.focus(), 0);
    const releaseFocus = trapFocus(settingsDialogRef.current);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSettingsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      releaseFocus();
      document.removeEventListener('keydown', handleEscape);
      restoreFocus();
    };
  }, [settingsOpen]);

  const handleHighContrastChange = () => {
    toggleHighContrast();
  };

  const isStationRoute = location.pathname === ROUTES.STATION || location.pathname === ROUTES.WELCOME;

  return (
    <header className="persistent-header" role="banner">
      <div className="persistent-header__left">
        <button
          className="memory-station-btn"
          onClick={handleMemoryStationClick}
          aria-label={t('nav.returnStation')}
          disabled={isStationRoute}
        >
          <span className="memory-station-btn__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
          </span>
          <span className="memory-station-btn__label">{t('nav.memoryStation')}</span>
        </button>
      </div>

      <div className="persistent-header__center">
        <button className="archive-wordmark" type="button" onClick={() => navigate(ROUTES.WELCOME)} aria-label={t('app.title')}>
          {t('app.title')}
        </button>
      </div>

      <div className="persistent-header__right">
        <label className="language-picker">
          <span className="sr-only">{t('language.label')}</span>
          <select
            aria-label={t('language.label')}
            value={language}
            onChange={event => setLanguage(event.target.value === 'en' ? 'en' : 'es')}
          >
            <option value="es">{t('language.spanish')}</option>
            <option value="en">{t('language.english')}</option>
          </select>
        </label>
        <button
          className="constellation-preview-btn"
          onClick={handleConstellationClick}
          aria-label={t('nav.constellationProgress', { count: fragmentCount, total: totalFragments })}
        >
          <span className="constellation-preview-btn__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
          <span className="constellation-preview-btn__count">{fragmentCount}/{totalFragments}</span>
        </button>

        <button
          ref={settingsOpenerRef}
          className="settings-btn"
          onClick={handleSettingsClick}
          aria-label={t('nav.settings')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
      {settingsOpen && createPortal(
        <div className="modal-overlay" onClick={() => setSettingsOpen(false)}>
          <section ref={settingsDialogRef} className="modal modal--sm" role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={event => event.stopPropagation()}>
            <header className="modal__header">
              <h2 id="settings-title" className="modal__title">{t('settings.title')}</h2>
              <button className="modal__close" onClick={() => setSettingsOpen(false)} aria-label={t('settings.close')} type="button">
                ×
              </button>
            </header>
            <div className="modal__content settings-options">
              <label className="settings-options__language">
                {t('settings.language')}
                <select value={language} onChange={event => setLanguage(event.target.value === 'en' ? 'en' : 'es')}>
                  <option value="es">{t('language.spanish')}</option>
                  <option value="en">{t('language.english')}</option>
                </select>
              </label>
              <label><input type="checkbox" checked={reducedMotion} onChange={toggleReducedMotion} /> {t('settings.reducedMotion')}</label>
              <label><input type="checkbox" checked={highContrast} onChange={handleHighContrastChange} /> {t('settings.highContrast')}</label>
              <label><input type="checkbox" checked={audioEnabled} onChange={toggleAudio} /> {t('settings.sound')}</label>
              <label><input type="checkbox" checked={narrationEnabled} onChange={toggleNarration} /> {t('settings.narration')}</label>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </header>
  );
}
