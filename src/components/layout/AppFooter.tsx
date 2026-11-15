import { useLanguage } from '../../i18n';
import './AppFooter.css';

const sources = [
  { key: 'footer.nssdca', href: 'https://nssdc.gsfc.nasa.gov/nmc/' },
  { key: 'footer.missions', href: 'https://science.nasa.gov/missions/' },
  { key: 'footer.images', href: 'https://images.nasa.gov/' },
  { key: 'footer.marsRovers', href: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/' },
  { key: 'footer.ingenuity', href: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/' },
  { key: 'footer.surveyor', href: 'https://science.nasa.gov/mission/surveyor-3/' },
  { key: 'footer.apollo17', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C' },
] as const;

export function AppFooter() {
  const { t } = useLanguage();

  return (
    <footer className="archive-footer">
      <div className="archive-footer__inner">
        <div className="archive-footer__identity">
          <img src={`${import.meta.env.BASE_URL}images/brand/grupo-epico.svg`} alt={t('footer.teamLogoAlt')} width="166" height="64" />
          <div>
            <p className="archive-footer__project">{t('app.title')}</p>
            <p className="archive-footer__event">{t('footer.event')}</p>
          </div>
        </div>
        <nav className="archive-footer__sources" aria-label={t('footer.sourcesLabel')}>
          <h2>{t('footer.sourcesTitle')}</h2>
          <ul>
            {sources.map(source => (
              <li key={source.key}>
                <a href={source.href} target="_blank" rel="noreferrer">{t(source.key)}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="archive-footer__notes">
          <p>{t('footer.disclosure')}</p>
          <p>{t('footer.independent')}</p>
        </div>
      </div>
    </footer>
  );
}
