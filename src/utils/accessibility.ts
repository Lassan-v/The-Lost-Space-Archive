/**
 * Accessibility Utilities — The Lost Space Archive
 * Helpers for ARIA, focus management, announcements, and reduced motion
 */

// Live region for screen reader announcements
let liveRegionPolite: HTMLElement | null = null;
let liveRegionAssertive: HTMLElement | null = null;

function getLiveRegion(priority: 'polite' | 'assertive'): HTMLElement {
  if (priority === 'polite') {
    if (!liveRegionPolite) {
      liveRegionPolite = document.createElement('div');
      liveRegionPolite.setAttribute('aria-live', 'polite');
      liveRegionPolite.setAttribute('aria-atomic', 'true');
      liveRegionPolite.className = 'sr-only';
      document.body.appendChild(liveRegionPolite);
    }
    return liveRegionPolite;
  } else {
    if (!liveRegionAssertive) {
      liveRegionAssertive = document.createElement('div');
      liveRegionAssertive.setAttribute('aria-live', 'assertive');
      liveRegionAssertive.setAttribute('aria-atomic', 'true');
      liveRegionAssertive.className = 'sr-only';
      document.body.appendChild(liveRegionAssertive);
    }
    return liveRegionAssertive;
  }
}

/**
 * Announce a message to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const region = getLiveRegion(priority);
  region.textContent = '';
  // Force reflow to ensure announcement
  void region.offsetHeight;
  region.textContent = message;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: more)').matches;
}

/**
 * Listen for reduced motion preference changes
 */
export function onReducedMotionChange(callback: (reduced: boolean) => void): () => void {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * Listen for high contrast preference changes
 */
export function onHighContrastChange(callback: (highContrast: boolean) => void): () => void {
  const mql = window.matchMedia('(prefers-contrast: more)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * Focus management utilities
 */

// Store last focused element before modal open
let lastFocusedElement: HTMLElement | null = null;

/**
 * Trap focus within an element
 */
export function trapFocus(element: HTMLElement, initialFocus?: HTMLElement | null): () => void {
  const getFocusableElements = () => Array.from(element.querySelectorAll<HTMLElement>(
    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )).filter(item => !item.hasAttribute('hidden') && item.getAttribute('aria-hidden') !== 'true');

  function handleTab(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const focusableElements = getFocusableElements();
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (!firstElement || !lastElement) {
      e.preventDefault();
      element.focus();
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }

  element.addEventListener('keydown', handleTab);
  (initialFocus ?? getFocusableElements()[0])?.focus();

  return () => {
    element.removeEventListener('keydown', handleTab);
  };
}

/**
 * Save current focus and restore later
 */
export function saveFocus(): () => void {
  lastFocusedElement = document.activeElement as HTMLElement;
  return () => {
    if (lastFocusedElement && document.body.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
  };
}

/**
 * Focus first focusable element in container
 */
export function focusFirst(container: HTMLElement): HTMLElement | null {
  const focusable = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  focusable?.focus();
  return focusable ?? null;
}

/**
 * Get all focusable elements in container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetParent !== null && !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

/**
 * Roving tabindex for lists/grids
 */
export function setupRovingTabindex(
  container: HTMLElement,
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical' | 'both' = 'both'
): () => void {
  let currentIndex = 0;

  function updateTabindex() {
    items.forEach((item, index) => {
      item.tabIndex = index === currentIndex ? 0 : -1;
    });
  }

  function handleKeydown(e: KeyboardEvent) {
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';
    const isVertical = orientation === 'vertical' || orientation === 'both';

    let newIndex = currentIndex;

    if (e.key === 'ArrowRight' && isHorizontal) {
      newIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowLeft' && isHorizontal) {
      newIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === 'ArrowDown' && isVertical) {
      newIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp' && isVertical) {
      newIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    currentIndex = newIndex;
    updateTabindex();
    items[currentIndex].focus();
  }

  container.addEventListener('keydown', handleKeydown);
  updateTabindex();

  return () => {
    container.removeEventListener('keydown', handleKeydown);
  };
}

/**
 * Skip link helper
 */
export function createSkipLink(targetId: string, text: string = 'Skip to main content'): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = `#${targetId}`;
  link.textContent = text;
  link.className = 'skip-link';
  return link;
}

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateId(prefix: string = 'lsa'): string {
  return `${prefix}-${++idCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Keyboard event helpers
 */
export function isActivationKey(e: KeyboardEvent): boolean {
  return e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar';
}

export function isEscapeKey(e: KeyboardEvent): boolean {
  return e.key === 'Escape' || e.key === 'Esc';
}

export function isArrowKey(e: KeyboardEvent): boolean {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
}

/**
 * Touch target size checker (for development)
 */
export function checkTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const minSize = 44; // WCAG AA minimum
  return rect.width >= minSize && rect.height >= minSize;
}

/**
 * Color contrast checker (simplified)
 */
export function getContrastRatio(): number {
  // This is a placeholder - in production use a proper color library
  // Returns 21 for perfect contrast, 1 for no contrast
  return 21;
}

/**
 * Reduced motion CSS class toggler
 */
export function applyReducedMotionClass(): void {
  if (prefersReducedMotion()) {
    document.documentElement.classList.add('reduced-motion');
  } else {
    document.documentElement.classList.remove('reduced-motion');
  }
}

export function setupReducedMotionListener(): () => void {
  const handler = () => applyReducedMotionClass();
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * High contrast CSS class toggler
 */
export function applyHighContrastClass(): void {
  if (prefersHighContrast()) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
}

export function setupHighContrastListener(): () => void {
  const handler = () => applyHighContrastClass();
  const mql = window.matchMedia('(prefers-contrast: more)');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}

/**
 * Initialize all accessibility features
 */
export function initAccessibility(): () => void {
  applyReducedMotionClass();
  applyHighContrastClass();

  const cleanupReduced = setupReducedMotionListener();
  const cleanupContrast = setupHighContrastListener();

  return () => {
    cleanupReduced();
    cleanupContrast();
  };
}
