/**
 * AppShell — The Lost Space Archive
 * Root layout wrapper with providers and persistent elements
 */

import { ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from '../providers/ThemeProvider';
import { AccessibilityProvider } from '../providers/AccessibilityProvider';
import { ProgressProvider } from '../providers/ProgressProvider';
import { AudioProvider } from '../providers/AudioProvider';
import { PersistentHeader } from '../layout/PersistentHeader';
import { AppFooter } from '../layout/AppFooter';
import { Starfield } from './Starfield';
import { ContainerReveal } from './ContainerReveal';
import { WelcomeScreen } from '../../screens/WelcomeScreen';
import { StationScreen } from '../../screens/StationScreen';
import { MarsMapScreen, MoonMapScreen } from '../../screens/MarsMapScreen';
import { DossierScreen } from '../../screens/DossierScreen';
import { ChallengeScreen } from '../../screens/ChallengeScreen';
import { FragmentScreen } from '../../screens/FragmentScreen';
import { ConstellationScreen } from '../../screens/ConstellationScreen';
import { useProgress } from '../providers/ProgressProvider';
import { useAccessibility } from '../providers/AccessibilityProvider';
import { initAccessibility } from '../../utils/accessibility';
import { ROUTES } from '../../utils/constants';
import { LanguageProvider, useLanguage } from '../../i18n';
import type { LocationState } from '../../types';
import { useEffect } from 'react';
import './AppShell.css';

interface AppShellProps {
  children?: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <ThemeProvider>
          <ProgressProvider>
            <AudioProvider>
              <AppShellContent>{children}</AppShellContent>
            </AudioProvider>
          </ProgressProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

function AppShellContent({ children }: AppShellProps) {
  const { currentLocation } = useProgress();
  const { announce } = useAccessibility();
  const { t } = useLanguage();

  // Initialize accessibility on mount
  useEffect(() => {
    const cleanup = initAccessibility();
    return cleanup;
  }, []);

  // Announce route changes for screen readers
  useEffect(() => {
    const locationMessages: Record<string, string> = {
      welcome: t('app.route.welcome'),
      station: t('app.route.station'),
      'mars-map': t('app.route.mars'),
      'moon-map': t('app.route.moon'),
      dossier: t('app.route.dossier'),
      challenge: t('app.route.challenge'),
      fragment: t('app.route.fragment'),
      constellation: t('app.route.constellation'),
    };

    const message = locationMessages[currentLocation];
    if (message) {
      // Small delay to ensure live region is ready
      setTimeout(() => announce(message, 'polite'), 100);
    }
  }, [currentLocation, announce, t]);

  return (
    <HashRouter>
      <RouteStateTracker />
      <RouteScrollReset />
      <ContainerReveal />
      <div className="app-shell">
        <Starfield />
        <a href="#main-content" className="skip-link">
          {t('nav.skipMain')}
        </a>
        <PersistentHeader />
        <main id="main-content" className="app-shell__main" role="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/station" element={<StationScreen />} />
            <Route path="/mars" element={<MarsMapScreen />} />
            <Route path="/moon" element={<MoonMapScreen />} />
            <Route path="/dossier/:id" element={<DossierScreen />} />
            <Route path="/challenge/:id" element={<ChallengeScreen />} />
            <Route path="/fragment/:id" element={<FragmentScreen />} />
            <Route path="/constellation" element={<ConstellationScreen />} />
            <Route path="*" element={(
              <section className="screen-container error-state">
                <h1>{t('error.notFoundTitle')}</h1>
                <p>{t('error.notFound')}</p>
                <Link className="btn btn--primary btn--lg" to={ROUTES.STATION}>{t('error.backStation')}</Link>
              </section>
            )} />
          </Routes>
        </main>
        <AppFooter />
        {children}
      </div>
    </HashRouter>
  );
}

function RouteScrollReset() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function RouteStateTracker() {
  const location = useLocation();
  const { currentLocation, setCurrentLocation } = useProgress();

  useEffect(() => {
    const path = location.pathname;
    const nextLocation: LocationState = path === ROUTES.WELCOME
      ? 'welcome'
      : path === ROUTES.STATION
        ? 'station'
        : path === ROUTES.MARS_MAP
          ? 'mars-map'
          : path === ROUTES.MOON_MAP
            ? 'moon-map'
            : path.startsWith(`${ROUTES.DOSSIER}/`)
              ? 'dossier'
              : path.startsWith(`${ROUTES.CHALLENGE}/`)
                ? 'challenge'
                : path.startsWith(`${ROUTES.FRAGMENT}/`)
                  ? 'fragment'
                  : path === ROUTES.CONSTELLATION
                    ? 'constellation'
                    : currentLocation;

    if (nextLocation !== currentLocation) {
      setCurrentLocation(nextLocation);
    }
  }, [location.pathname, currentLocation, setCurrentLocation]);

  return null;
}
