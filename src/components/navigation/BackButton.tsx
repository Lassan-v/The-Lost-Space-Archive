/**
 * BackButton — The Lost Space Archive
 * Contextual back navigation
 */

import { useHref, useNavigate } from 'react-router-dom';
import { useAudio } from '../providers/AudioProvider';
import { useLanguage } from '../../i18n';

interface BackButtonProps {
  href?: string;
  label: string;
  ariaLabel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function BackButton({ href, label, ariaLabel, onClick }: BackButtonProps) {
  const navigate = useNavigate();
  const linkHref = useHref(href || '.');
  const { playSound } = useAudio();
  const { t } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound('click');
    if (onClick) {
      onClick(e);
    } else if (href) {
      navigate(href);
    } else {
      navigate(-1);
    }
  };

  return (
    <a
      href={href ? linkHref : '#'}
      className="btn--back"
      onClick={handleClick}
      aria-label={ariaLabel || t('nav.backTo', { label })}
    >
      <svg className="btn--back__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
