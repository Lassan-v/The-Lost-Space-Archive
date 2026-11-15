/**
 * Interactive, code-drawn rover assembly scene for Sojourner.
 */

import type { ChassisSlot } from '../../types';
import { useLanguage } from '../../i18n';
import './ChassisSilhouette.css';

interface ChassisSilhouetteProps {
  slots: ChassisSlot[];
  highlightedSlotId?: string;
  selectedPartId?: string;
  onDrop: (slotId: string, partId: string) => void;
  onPartRemove: (slotId: string) => void;
}

function PartShape({ partId, filled }: { partId: string; filled: boolean }) {
  const color = filled ? 'var(--storybook-gold, #F7AE32)' : 'var(--color-border-strong)';
  const accent = filled ? 'var(--storybook-blue, #74B8E7)' : 'var(--color-border-subtle)';
  const opacity = filled ? 1 : 0.32;

  if (partId === 'solar-panel') {
    return <g opacity={opacity} fill={color} stroke="var(--storybook-navy, #111D38)" strokeWidth="2">
      <rect x="-62" y="-24" width="124" height="48" rx="4" />
      <path d="M-31 -24V24M0 -24V24M31 -24V24M-62 0H62" fill="none" stroke={accent} strokeWidth="2" />
      <path d="M-35 27L-26 40M35 27L26 40" fill="none" stroke="var(--storybook-navy, #111D38)" strokeWidth="4" />
    </g>;
  }

  if (partId === 'front-cameras') {
    return <g opacity={opacity} stroke="var(--storybook-navy, #111D38)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 20V-30H-4" fill="none" />
      <rect x="-27" y="-43" width="24" height="23" rx="5" fill={color} />
      <rect x="3" y="-43" width="24" height="23" rx="5" fill={color} />
      <circle cx="-15" cy="-31" r="5" fill={accent} strokeWidth="2" />
      <circle cx="15" cy="-31" r="5" fill={accent} strokeWidth="2" />
      <path d="M-3 -31H3" />
    </g>;
  }

  if (partId === 'rear-camera') {
    return <g opacity={opacity} stroke="var(--storybook-navy, #111D38)" strokeWidth="3" strokeLinejoin="round">
      <path d="M0 18V4" />
      <rect x="-22" y="-20" width="44" height="30" rx="6" fill={color} />
      <circle cx="0" cy="-5" r="9" fill={accent} />
      <circle cx="0" cy="-5" r="3" fill="var(--storybook-navy, #111D38)" stroke="none" />
    </g>;
  }

  if (partId === 'apxs-arm') {
    return <g opacity={opacity} fill="none" stroke="var(--storybook-navy, #111D38)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M-36 -18L-15 -3L12 -16L29 5" />
      <circle cx="-36" cy="-18" r="7" fill={color} strokeWidth="3" />
      <circle cx="-15" cy="-3" r="6" fill={color} strokeWidth="3" />
      <circle cx="12" cy="-16" r="6" fill={color} strokeWidth="3" />
      <path d="M29 5l11 8-8 3" strokeWidth="4" />
    </g>;
  }

  return <g opacity={opacity} stroke="var(--storybook-navy, #111D38)" strokeWidth="3">
    {[-75, 0, 75].flatMap((x) => [({ x: x + 9, y: -7, rear: true }), ({ x, y: 0, rear: false })]).sort((a, b) => Number(b.rear) - Number(a.rear)).map(({ x, y, rear }) => (
      <g key={`${x}:${y}`} transform={`translate(${x} ${y})`} opacity={rear ? 0.65 : 1}>
        <path d="M0 -26V-12" fill="none" strokeWidth="4" />
        <circle r="18" fill={color} />
        <circle r="6" fill={accent} strokeWidth="2" />
        <path d="M-8 -11L-4 -5M8 -11L4 -5M-8 11L-4 5M8 11L4 5" stroke="var(--storybook-paper, #FFF4D9)" strokeWidth="2" />
      </g>
    ))}
  </g>;
}

export function ChassisSilhouette({ slots, highlightedSlotId, selectedPartId, onDrop, onPartRemove }: ChassisSilhouetteProps) {
  const { t } = useLanguage();
  const partForSlot: Record<string, string> = {
    solar: 'solar-panel',
    'front-cam': 'front-cameras',
    'rear-cam': 'rear-camera',
    apxs: 'apxs-arm',
    wheels: 'wheels',
  };

  const handleDrop = (event: React.DragEvent, slotId: string) => {
    event.preventDefault();
    const partId = event.dataTransfer.getData('text/plain');
    if (partId) onDrop(slotId, partId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleKeyDown = (event: React.KeyboardEvent, slot: ChassisSlot) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (slot.filled) onPartRemove(slot.id);
    else if (selectedPartId) onDrop(slot.id, selectedPartId);
  };

  const handleClick = (slot: ChassisSlot) => {
    if (selectedPartId && !slot.filled) onDrop(slot.id, selectedPartId);
    else if (slot.filled) onPartRemove(slot.id);
  };

  const isComplete = slots.every((slot) => slot.filled);

  return (
    <div className="chassis-silhouette" role="group" aria-label={t('challenge.chassisLabel')}>
      <svg className={`chassis-silhouette__svg${isComplete ? ' chassis-silhouette__svg--complete' : ''}`} viewBox="0 0 400 320">
        <path aria-hidden="true" d="M0 226Q76 204 142 221T276 218T400 224V320H0Z" fill="var(--storybook-red, #B8543F)" opacity=".2" />
        <path aria-hidden="true" d="M0 247Q96 225 172 243T320 238T400 245" fill="none" stroke="var(--storybook-rust, #A95542)" strokeWidth="3" opacity=".5" />
        <circle aria-hidden="true" cx="344" cy="47" r="17" fill="var(--storybook-yellow, #F7D779)" opacity=".8" />

        <g className="chassis-silhouette__base-rover" aria-hidden="true">
          <path d="M75 142L92 128H306L327 145V190H75Z" fill="var(--storybook-gold, #F7AE32)" stroke="var(--storybook-navy, #111D38)" strokeWidth="4" strokeLinejoin="round" />
          <rect x="92" y="150" width="216" height="26" rx="5" fill="var(--storybook-paper, #FFF4D9)" stroke="var(--storybook-navy, #111D38)" strokeWidth="3" />
          <path d="M112 183L100 202M183 183L179 203M258 183L271 201" stroke="var(--storybook-navy, #111D38)" strokeWidth="5" strokeLinecap="round" />
          <rect x="166" y="133" width="50" height="12" rx="4" fill="var(--storybook-purple, #9270D9)" stroke="var(--storybook-navy, #111D38)" strokeWidth="2" />
        </g>

        <path aria-hidden="true" d="M315 202L336 202L350 218L326 226Z" fill="var(--storybook-rust, #A95542)" opacity=".7" />

        <g className="chassis-silhouette__slots">
          {slots.map((slot) => {
            const partId = slot.partId ?? partForSlot[slot.id] ?? slot.id;
            const highlighted = highlightedSlotId === slot.id;
            const isFocusedTarget = selectedPartId && !slot.filled;
            const state = slot.filled ? 'filled' : highlighted || isFocusedTarget ? 'hint' : 'empty';
            const slotClass = `chassis-silhouette__slot chassis-silhouette__slot--${state}`;
            return (
              <g key={slot.id} className={slotClass} transform={`translate(${slot.position.x} ${slot.position.y})`}>
                <PartShape partId={partId} filled={slot.filled} />
                <rect
                  className="chassis-silhouette__target-ring"
                  x={-slot.size.width / 2}
                  y={-slot.size.height / 2}
                  width={slot.size.width}
                  height={slot.size.height}
                  rx={Math.min(slot.size.width, slot.size.height) / 5}
                />
                <rect
                  className="chassis-silhouette__drop-zone"
                  x={-slot.size.width / 2}
                  y={-slot.size.height / 2}
                  width={slot.size.width}
                  height={slot.size.height}
                  rx={Math.min(slot.size.width, slot.size.height) / 5}
                  role="button"
                  tabIndex={0}
                  aria-pressed={slot.filled}
                  aria-label={slot.filled
                    ? t('challenge.slotFilled', { part: slot.label })
                    : t('challenge.slotEmpty', { part: slot.label })}
                  onDrop={(event) => handleDrop(event, slot.id)}
                  onDragOver={handleDragOver}
                  onKeyDown={(event) => handleKeyDown(event, slot)}
                  onClick={() => handleClick(slot)}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
