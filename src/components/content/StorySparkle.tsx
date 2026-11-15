/**
 * StorySparkle — hand-drawn style vector sparkle used instead of emoji stars.
 * Decorative only (aria-hidden). Two shapes: a four-point "sparkle" cluster
 * and a rounded five-point "star".
 */

import { useId } from 'react';
import './StorySparkle.css';

interface StorySparkleProps {
  variant?: 'sparkle' | 'star';
  size?: number;
  className?: string;
  /** Delay (s) so several sparkles don't twinkle in sync. */
  delay?: number;
}

export function StorySparkle({ variant = 'sparkle', size = 36, className = '', delay = 0 }: StorySparkleProps) {
  const gradientId = useId();

  return (
    <svg
      className={`story-sparkle story-sparkle--${variant} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF4C2" />
          <stop offset=".55" stopColor="#FFD15A" />
          <stop offset="1" stopColor="#F29A3B" />
        </linearGradient>
      </defs>
      {variant === 'sparkle' ? (
        <g stroke="#2A2552" strokeWidth="2" strokeLinejoin="round">
          <path
            className="story-sparkle__main"
            d="M27 4c1.6 9.4 5.6 13.4 15 15-9.4 1.6-13.4 5.6-15 15-1.6-9.4-5.6-13.4-15-15 9.4-1.6 13.4-5.6 15-15Z"
            fill={`url(#${gradientId})`}
          />
          <path
            className="story-sparkle__small"
            d="M11 27c.9 5 3 7.1 8 8-5 .9-7.1 3-8 8-.9-5-3-7.1-8-8 5-.9 7.1-3 8-8Z"
            fill="#FFB86B"
          />
          <path d="M24 13.5c1.4.9 2.4 2.3 2.9 4" fill="none" stroke="#FFFBEA" strokeWidth="2" strokeLinecap="round" opacity=".9" />
        </g>
      ) : (
        <g stroke="#2A2552" strokeWidth="2.2" strokeLinejoin="round">
          <path
            className="story-sparkle__main"
            d="M24 5.5c1 0 1.8.6 2.2 1.5l4.2 8.6 9.4 1.4c2 .3 2.8 2.8 1.4 4.2l-6.8 6.6 1.6 9.4c.3 2-1.8 3.5-3.6 2.6L24 35.4l-8.4 4.4c-1.8.9-3.9-.6-3.6-2.6l1.6-9.4-6.8-6.6c-1.4-1.4-.6-3.9 1.4-4.2l9.4-1.4L21.8 7c.4-.9 1.2-1.5 2.2-1.5Z"
            fill={`url(#${gradientId})`}
          />
          <path d="M17.5 19.5c1.5-1.6 3.4-2.4 5.4-2.4" fill="none" stroke="#FFFBEA" strokeWidth="2.2" strokeLinecap="round" opacity=".9" />
        </g>
      )}
    </svg>
  );
}
