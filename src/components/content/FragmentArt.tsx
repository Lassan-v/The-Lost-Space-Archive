/**
 * FragmentArt — original storybook vector for each memory fragment.
 * Shared by the fragment reward and the constellation detail dialog.
 */

import { useId } from 'react';
import './FragmentArt.css';

export function FragmentArt({ name, size }: { name: string; size: 'small' | 'medium' | 'large' | 'xl' }) {
  const glowId = useId();
  const sizes = { small: 80, medium: 120, large: 160, xl: 200 };
  const dim = sizes[size];

  return (
    <svg width={dim} height={dim} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#F5A623" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow background */}
      <circle cx="50" cy="50" r="45" fill={`url(#${glowId})`} />

      {name === 'wheel-track' && (
        <g transform="translate(50, 50)">
          {/* Wheel track in Martian dust */}
          <ellipse cx="-20" cy="0" rx="25" ry="8" fill="#E85D04" opacity="0.6" />
          <ellipse cx="20" cy="0" rx="25" ry="8" fill="#E85D04" opacity="0.6" />
          {/* Tread marks */}
          <g stroke="#A16207" strokeWidth="2" strokeLinecap="round">
            <line x1="-35" y1="-4" x2="-5" y2="-4" />
            <line x1="-35" y1="4" x2="-5" y2="4" />
            <line x1="5" y1="-4" x2="35" y2="-4" />
            <line x1="5" y1="4" x2="35" y2="4" />
          </g>
          {/* Small particles */}
          <g fill="#F5A623" opacity="0.5">
            <circle cx="-30" cy="-10" r="1.5" />
            <circle cx="30" cy="12" r="1" />
            <circle cx="-15" cy="15" r="1" />
            <circle cx="10" cy="-12" r="1.5" />
          </g>
        </g>
      )}

      {name === 'silica' && (
        <g className="fragment-art" transform="translate(50, 54) scale(1.45)" stroke="#2A2552" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M-36 10c10-8 22-10 36-6s24 2 36-4v18h-72Z" fill="#B65A4C" />
          <ellipse cx="0" cy="6" rx="22" ry="7" fill="#FFF4D9" />
          <path d="M-12 5c4-2 8-2 12 0m5-1c3-1 6-1 9 1" fill="none" stroke="#C9C3E6" strokeWidth="1.8" strokeLinecap="round" />
          <path className="fragment-art__twinkle" d="M14-22c.8 4 2.4 5.6 6.4 6.4-4 .8-5.6 2.4-6.4 6.4-.8-4-2.4-5.6-6.4-6.4 4-.8 5.6-2.4 6.4-6.4Z" fill="#FFE39A" />
        </g>
      )}

      {name === 'hematite' && (
        <g className="fragment-art" transform="translate(50, 52) scale(1.45)" stroke="#2A2552" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M-34 8-22-2l12 4 10-8 12 6 12-4 10 6v16h-68Z" fill="#C46A54" />
          <circle className="fragment-art__berry" cx="-14" cy="6" r="5" fill="#5D6A9E" />
          <circle className="fragment-art__berry" cx="0" cy="10" r="4" fill="#6F7DB4" />
          <circle className="fragment-art__berry" cx="13" cy="4" r="5.5" fill="#56629A" />
          <circle cx="-15.5" cy="4.5" r="1.4" fill="#E8ECFF" stroke="none" />
          <circle cx="11.5" cy="2.5" r="1.6" fill="#E8ECFF" stroke="none" />
        </g>
      )}

      {name === 'rotor' && (
        <g className="fragment-art" transform="translate(50, 52) scale(1.45)" stroke="#2A2552" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <rect x="-6" y="-26" width="12" height="4" rx="1" fill="#74B8E7" />
          <path d="M0-22V-4" fill="none" />
          <g className="fragment-art__rotor"><path d="M-28-15H28" fill="none" stroke="#FFF4D9" strokeWidth="3.5" /></g>
          <g className="fragment-art__rotor fragment-art__rotor--lower"><path d="M-26-9H26" fill="none" stroke="#FFF4D9" strokeWidth="3.5" /></g>
          <rect x="-9" y="-4" width="18" height="13" rx="4" fill="#C7A8EE" />
          <path d="M-6 9-12 20M6 9l6 11M-15 20h6m9 0h6" fill="none" />
        </g>
      )}

      {name === 'scoop' && (
        <g className="fragment-art" transform="translate(50, 54) scale(1.45)" stroke="#2A2552" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-36 10c12-6 26-7 38-3s22 2 34-3v18h-72Z" fill="#8F86B8" />
          <path d="M-16 9c6 7 18 7 24 0" fill="#4F477C" />
          <g className="fragment-art__scoop">
            <path d="M24-26 4 2" fill="none" stroke="#F7AE32" strokeWidth="4" />
            <path d="M24-26 4 2" fill="none" />
            <path d="M-2 0l12 5-3 8c-5-1-9-4-11-8Z" fill="#74B8E7" />
          </g>
        </g>
      )}

      {name === 'route' && (
        <g className="fragment-art" transform="translate(50, 50) scale(1.45)" stroke="#2A2552" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path className="fragment-art__route" d="M-30 18C-20 2-8 6 0-4S20-18 30-22" fill="none" stroke="#FFD15A" strokeWidth="3.5" strokeDasharray="5 5" />
          <circle cx="-30" cy="18" r="5" fill="#FFF4D9" />
          <circle cx="0" cy="-4" r="4" fill="#C7A8EE" />
          <circle cx="30" cy="-22" r="5" fill="#7FE0A4" />
          <g transform="translate(-12 6)">
            <path d="M-8 0h16l-3-6H-5Z" fill="#F7AE32" />
            <circle cx="-5" cy="2" r="3" fill="#2A2552" /><circle cx="5" cy="2" r="3" fill="#2A2552" />
          </g>
        </g>
      )}

      {!['wheel-track', 'silica', 'hematite', 'rotor', 'scoop', 'route'].includes(name) && (
        <g transform="translate(50, 50)">
          <circle r="20" fill="var(--color-accent-primary)" opacity="0.3" />
          <path d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z" fill="var(--color-accent-primary)" />
        </g>
      )}
    </svg>
  );
}
