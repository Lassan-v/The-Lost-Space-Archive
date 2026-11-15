import { getSourceUrl } from '../../data/nasa';
import { useLanguage } from '../../i18n';

/**
 * SimulationBanner — The Lost Space Archive
 * Required disclaimer on dossier and challenge screens
 */

interface SimulationBannerProps {
  sourceIds: string[];
  variant?: 'dossier' | 'challenge';
}

export function SimulationBanner({ sourceIds, variant = 'dossier' }: SimulationBannerProps) {
  const { t } = useLanguage();
  return (
    <div className={`simulation-banner simulation-banner--${variant}`} role="status" aria-live="polite">
      <span className="simulation-banner__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </span>
      <div className="simulation-banner__content">
        <p className="simulation-banner__text">
          {t('facts.simulationNotice')}
        </p>
        <details className="simulation-banner__sources">
          <summary className="simulation-banner__sources-summary">{t('facts.viewSources')}</summary>
          <ul className="simulation-banner__sources-list">
            {sourceIds.map(id => (
              <li key={id}>
                <a
                  href={getSourceUrl(id)}
                  className="simulation-banner__source-link"
                  data-source-id={id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {id}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
