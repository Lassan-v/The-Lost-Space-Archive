/**
 * FactCard — The Lost Space Archive
 * Single fact with source citation for dossier screen
 */

import type { FactCardData } from '../../types';
import { useLanguage } from '../../i18n';

interface FactCardProps {
  fact: FactCardData;
}

export function FactCard({ fact }: FactCardProps) {
  const { t } = useLanguage();
  return (
    <article className="fact-card">
      <p className="fact-card__text">{fact.fact}</p>
      <footer className="fact-card__source">
        <span className="fact-card__source-label">{t('facts.source')}</span>
        {fact.sourceUrl ? (
          <a
            href={fact.sourceUrl}
            className="fact-card__source-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {fact.sourceId}
          </a>
        ) : (
          <span className="fact-card__source-id">{fact.sourceId}</span>
        )}
      </footer>
      {fact.termDefinitions && (
        <details className="fact-card__terms">
          <summary className="fact-card__terms-summary">{t('facts.explainTerms')}</summary>
          <dl className="fact-card__terms-list">
            {Object.entries(fact.termDefinitions).map(([term, def]) => (
              <div key={term} className="fact-card__term">
                <dt className="fact-card__term-name">{term}</dt>
                <dd className="fact-card__term-definition">{def}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </article>
  );
}
