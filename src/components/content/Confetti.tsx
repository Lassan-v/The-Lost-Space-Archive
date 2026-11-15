/**
 * Confetti — a short, soft celebratory shower (plays twice, then stops).
 * Decorative only; hidden under reduced motion.
 */

import './Confetti.css';

export function Confetti({ pieces = 14, className = '' }: { pieces?: number; className?: string }) {
  return (
    <div className={`confetti ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: pieces }, (_, index) => <span key={index} style={{ ['--i' as string]: index }} />)}
    </div>
  );
}
