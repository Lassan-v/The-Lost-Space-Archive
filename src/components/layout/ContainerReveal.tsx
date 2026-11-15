/**
 * ContainerReveal — The Lost Space Archive
 * When a content container scrolls into view it flips up into place and
 * glows once, so the child's attention goes to the newest card.
 * Skipped on the Memory Station (it has its own choreography) and under
 * reduced motion. Purely presentational: content is never hidden when JS
 * or IntersectionObserver is unavailable.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const REVEAL_SELECTOR = [
  '.fact-card',
  '.dossier-object__category',
  '.mission-character-panel',
  '.spark-dialogue',
  '.simulation-banner',
  '.challenge-screen__panel',
  '.clue-card',
  '.sampler-tool',
  '.mission-route-card',
  '.mission-route-figure',
  '.surveyor-scene',
  '.map-preview',
  '.map-mission-list',
  '.map-screen__map-area',
  '.fragment-reward__fragment',
  '.welcome-overview__world',
  '.constellation-replay',
].join(', ');

const STAGGER_MS = 110;

function prefersReducedMotion() {
  return document.documentElement.classList.contains('reduced-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function ContainerReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main || !('IntersectionObserver' in window) || prefersReducedMotion()) return;

    const observer = new window.IntersectionObserver((entries) => {
      let order = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        element.style.setProperty('--reveal-delay', `${order * STAGGER_MS}ms`);
        order += 1;
        element.classList.remove('reveal-pending');
        element.classList.add('reveal-in');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    const scan = () => {
      main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (element.dataset.reveal || element.closest('.storybook-station')) return;
        element.dataset.reveal = 'true';
        element.classList.add('reveal-pending');
        observer.observe(element);
      });
    };

    scan();
    const mutations = new window.MutationObserver(scan);
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      // Never leave anything invisible behind.
      main.querySelectorAll<HTMLElement>('.reveal-pending').forEach((element) => {
        element.classList.remove('reveal-pending');
        delete element.dataset.reveal;
      });
    };
  }, [pathname]);

  return null;
}
