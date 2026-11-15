/**
 * Starfield — The Lost Space Archive
 * Decorative, app-wide night sky: three drifting parallax layers, a few
 * storybook sparkles that twinkle, and rare shooting stars.
 * Purely decorative (aria-hidden). All motion stops under reduced motion.
 */

import './Starfield.css';

// Deterministic positions so the sky looks the same on every visit.
const SPARKLES = [
  { x: 8, y: 14, s: 0.9, d: 0 },
  { x: 23, y: 72, s: 0.7, d: 1.4 },
  { x: 37, y: 31, s: 0.6, d: 2.9 },
  { x: 52, y: 9, s: 0.8, d: 0.7 },
  { x: 64, y: 58, s: 0.65, d: 3.6 },
  { x: 78, y: 22, s: 1, d: 2.1 },
  { x: 91, y: 66, s: 0.75, d: 4.4 },
  { x: 14, y: 46, s: 0.55, d: 5.2 },
  { x: 46, y: 88, s: 0.7, d: 1.9 },
  { x: 85, y: 90, s: 0.6, d: 3.1 },
  { x: 70, y: 40, s: 0.5, d: 6 },
  { x: 30, y: 5, s: 0.55, d: 4.8 },
] as const;

export function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      <span className="starfield__layer starfield__layer--far" />
      <span className="starfield__layer starfield__layer--mid" />
      <span className="starfield__layer starfield__layer--near" />
      {SPARKLES.map((star, index) => (
        <svg
          key={index}
          className="starfield__sparkle"
          viewBox="0 0 20 20"
          focusable="false"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            ['--sparkle-scale' as string]: star.s,
            animationDelay: `${star.d}s`,
          }}
        >
          <path d="M10 0c.9 5.4 3.6 8.1 10 10-6.4 1.9-9.1 4.6-10 10-.9-5.4-3.6-8.1-10-10C6.4 8.1 9.1 5.4 10 0Z" />
        </svg>
      ))}
      <span className="starfield__shooting starfield__shooting--one" />
      <span className="starfield__shooting starfield__shooting--two" />
    </div>
  );
}
