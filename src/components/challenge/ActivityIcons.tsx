/**
 * ActivityIcons — small original storybook vectors for the learning activities.
 * Decorative only: every icon sits next to a text label.
 */

const INK = '#2A2552';

/** Spirit's clue: a pale, silica-rich patch of soil. */
export function SilicaClueIcon() {
  return (
    <svg className="activity-icon activity-icon--silica" viewBox="0 0 96 72" aria-hidden="true" focusable="false">
      <path d="M4 52c14-10 30-12 46-8s30 2 42-6v30H4Z" fill="#B65A4C" />
      <path d="M4 60c18-6 38-6 58-2s22 0 30-4v14H4Z" fill="#8E3F45" />
      <ellipse cx="46" cy="50" rx="27" ry="9" fill="#FFF4D9" stroke={INK} strokeWidth="2.5" />
      <path d="M28 49c6-3 12-3 18 0m6-2c5-2 9-2 13 1" fill="none" stroke="#C9C3E6" strokeWidth="2.5" strokeLinecap="round" />
      <g className="activity-icon__shine" fill="#FFF">
        <path d="M70 18c.8 4.4 2.6 6.2 7 7-4.4.8-6.2 2.6-7 7-.8-4.4-2.6-6.2-7-7 4.4-.8 6.2-2.6 7-7Z" />
        <circle cx="22" cy="30" r="2" />
      </g>
    </svg>
  );
}

/** Opportunity's clue: tiny hematite "blueberries" resting on rock. */
export function HematiteClueIcon() {
  return (
    <svg className="activity-icon activity-icon--hematite" viewBox="0 0 96 72" aria-hidden="true" focusable="false">
      <path d="M6 46 22 34l18 6 16-10 18 8 16-6v38H6Z" fill="#C46A54" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M6 58c22-6 46-4 84-4v16H6Z" fill="#9A465C" />
      <g stroke={INK} strokeWidth="2">
        <circle className="activity-icon__berry" cx="30" cy="48" r="6" fill="#5D6A9E" />
        <circle className="activity-icon__berry" cx="46" cy="52" r="5" fill="#6F7DB4" />
        <circle className="activity-icon__berry" cx="60" cy="46" r="6.5" fill="#56629A" />
        <circle className="activity-icon__berry" cx="72" cy="54" r="4.5" fill="#6F7DB4" />
      </g>
      <g fill="#E8ECFF" opacity=".85">
        <circle cx="28" cy="46" r="1.6" /><circle cx="44" cy="50" r="1.3" /><circle cx="58" cy="44" r="1.7" /><circle cx="71" cy="52" r="1.1" />
      </g>
    </svg>
  );
}

/** Surveyor sampler actions. */
export function SamplerActionIcon({ action }: { action: 'dig' | 'bearing' | 'impact' }) {
  return (
    <svg className={`activity-icon activity-icon--${action}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M2 46c12-5 24-5 34-1s18 3 26-1v20H2Z" fill="#8F86B8" />
      <path d="M2 54c16-4 34-4 60-2v12H2Z" fill="#6E669B" />
      {action === 'dig' && (
        <g className="activity-icon__tool" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M18 46c6 7 18 7 24 0" fill="#4F477C" />
          <path d="M44 10 32 36" fill="none" strokeWidth="5" stroke="#F7AE32" />
          <path d="M44 10 32 36" fill="none" />
          <path d="M26 34l12 6-4 8c-5-1-9-4-11-8Z" fill="#74B8E7" />
        </g>
      )}
      {action === 'bearing' && (
        <g className="activity-icon__tool" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <ellipse cx="32" cy="46" rx="14" ry="4" fill="#4F477C" />
          <path d="M32 8v26" fill="none" strokeWidth="5" stroke="#F7AE32" />
          <path d="M32 8v26" fill="none" />
          <rect x="22" y="33" width="20" height="9" rx="3" fill="#74B8E7" />
          <path d="M14 26l4 6m32-6-4 6" fill="none" stroke="#FFF4D9" />
        </g>
      )}
      {action === 'impact' && (
        <g className="activity-icon__tool" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M32 6v18" fill="none" strokeWidth="5" stroke="#F7AE32" />
          <path d="M32 6v18" fill="none" />
          <path d="M24 22h16l-3 14H27Z" fill="#74B8E7" />
          <path d="M18 40l-6-4m34 4 6-4M32 40v-1" fill="none" stroke="#FFD15A" strokeWidth="3" />
          <circle cx="20" cy="44" r="2" fill="#C9C3E6" stroke="none" />
          <circle cx="45" cy="43" r="2.4" fill="#C9C3E6" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/** Tiny stylised helicopter used to show Ingenuity's progress on the flight path. */
export function MiniHelicopter() {
  return (
    <g className="mini-helicopter" stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      {/* Solar panel on the mast, two stacked (coaxial) rotors below it. */}
      <rect x="-6" y="-29" width="12" height="4" rx="1" fill="#74B8E7" />
      <path d="M0 -25v13" fill="none" />
      <g className="mini-helicopter__rotor">
        <path d="M-22 -21H22" fill="none" strokeWidth="3" stroke="#FFF4D9" />
      </g>
      <g className="mini-helicopter__rotor mini-helicopter__rotor--lower">
        <path d="M-20 -16H20" fill="none" strokeWidth="3" stroke="#FFF4D9" />
      </g>
      <rect x="-9" y="-12" width="18" height="12" rx="4" fill="#C7A8EE" />
      <path d="M-7 0-12 10M7 0l5 10M-14 10h6m8 0h6" fill="none" />
    </g>
  );
}
