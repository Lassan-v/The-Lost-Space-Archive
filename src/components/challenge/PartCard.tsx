/**
 * PartCard — The Lost Space Archive
 * Draggable part card with icon, label, job description for P3 Part Builder
 */

import { useAudio } from '../../components/providers/AudioProvider';
import type { SojournerParts } from '../../types';
import { useLanguage } from '../../i18n';
import './PartCard.css';

interface PartCardProps {
  part: SojournerParts;
  isPlaced: boolean;
  isDragging: boolean;
  onDragStart: (partId: string) => void;
  onDragEnd: () => void;
  onClick: (partId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, partId: string) => void;
}

const PART_ICONS: Record<string, React.ReactNode> = {
  'solar-panel': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="10" width="36" height="28" rx="3" />
      <line x1="14" y1="18" x2="34" y2="18" />
      <line x1="14" y1="26" x2="34" y2="26" />
      <line x1="24" y1="10" x2="24" y2="4" />
      <line x1="24" y1="38" x2="24" y2="44" />
    </svg>
  ),
  'front-cameras': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="14" width="14" height="12" rx="2" />
      <circle cx="15" cy="20" r="4" />
      <rect x="26" y="14" width="14" height="12" rx="2" />
      <circle cx="33" cy="20" r="4" />
      <line x1="22" y1="20" x2="26" y2="20" />
    </svg>
  ),
  'rear-camera': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="17" y="16" width="14" height="12" rx="2" />
      <circle cx="24" cy="22" r="5" />
      <circle cx="24" cy="22" r="2" fill="currentColor" />
    </svg>
  ),
  'apxs-arm': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 24 10 L 24 28" />
      <path d="M 14 28 L 24 38 L 34 28" />
      <circle cx="24" cy="38" r="8" />
      <line x1="24" y1="30" x2="24" y2="46" />
    </svg>
  ),
  'wheels': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {[7, 14, 21, 28, 35, 42].map((x) => <g key={x} transform={`translate(${x} 24)`}>
        <circle r="4.5" />
        <path d="M-2.5-3L-1 0L-2.5 3M2.5-3L1 0L2.5 3" strokeWidth="1" />
      </g>)}
    </svg>
  ),
};

export function PartCard({
  part,
  isPlaced,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
  onKeyDown,
}: PartCardProps) {
  const { playSound } = useAudio();
  const { t } = useLanguage();

  const handleDragStart = (e: React.DragEvent) => {
    if (isPlaced) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', part.id);
    onDragStart(part.id);
    playSound('place');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();
    onDragEnd();
  };

  const handleClick = () => {
    if (!isPlaced) {
      onClick(part.id);
      playSound('click');
    }
  };

  const handleKeyDownWrapper = (e: React.KeyboardEvent) => {
    onKeyDown(e, part.id);
  };

  return (
    <article
      className={`part-card ${isPlaced ? 'part-card--placed' : ''} ${isDragging ? 'part-card--dragging' : ''}`}
      draggable={!isPlaced}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onKeyDown={handleKeyDownWrapper}
      role="button"
      tabIndex={isPlaced ? -1 : 0}
      aria-label={`${part.label}. ${part.job}. ${isPlaced ? t('challenge.placedOnRover') : t('challenge.partAction')}`}
      aria-grabbed={isDragging}
      aria-disabled={isPlaced}
    >
      <div className="part-card__icon" data-part-id={part.id} aria-hidden="true">
        {PART_ICONS[part.id]}
      </div>
      <div className="part-card__info">
        <h3 className="part-card__label">{part.label}</h3>
        <p className="part-card__job">{part.job}</p>
      </div>
      {isPlaced && (
        <span className="part-card__badge" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </article>
  );
}
