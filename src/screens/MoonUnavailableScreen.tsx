import { BackButton } from '../components/navigation/BackButton';
import { ROUTES } from '../utils/constants';
import { useLanguage } from '../i18n';

export function MoonUnavailableScreen() {
  const { t } = useLanguage();
  return (
    <section className="screen-container error-state" aria-labelledby="moon-unavailable-title">
      <h1 id="moon-unavailable-title">{t('station.moon')}</h1>
      <p>{t('moon.unavailable')}</p>
      <BackButton href={ROUTES.STATION} label={t('nav.memoryStation')} />
    </section>
  );
}
