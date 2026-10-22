import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

export function getReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches : true;
}

export function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

const serverSnapshot = () => true;

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, serverSnapshot);
}
