import { useEffect, useState, useSyncExternalStore, type RefObject } from 'react';

export function getPageVisible() {
  return typeof document === 'undefined' || document.visibilityState !== 'hidden';
}

export function subscribePageVisibility(onChange: () => void) {
  if (typeof document === 'undefined') return () => {};
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

export function observeHeroVisibility(source: HTMLElement, onChange: (visible: boolean) => void) {
  const Observer = source.ownerDocument.defaultView?.IntersectionObserver;
  if (!Observer) return () => {};
  const observer = new Observer(entries => {
    const entry = entries.find(item => item.target === source);
    if (entry) onChange(entry.isIntersecting);
  });
  observer.observe(source);
  return () => observer.disconnect();
}

export function heroMotionPolicy(reducedMotion: boolean, inView: boolean, pageVisible: boolean) {
  const visible = inView && pageVisible;
  return {
    animated: visible && !reducedMotion,
    frameloop: !visible ? 'never' as const : reducedMotion ? 'demand' as const : 'always' as const,
  };
}

const serverVisible = () => true;

export function useHeroActivity(source: RefObject<HTMLElement | null> | undefined, enabled: boolean, reducedMotion: boolean) {
  const [inView, setInView] = useState(true);
  const pageVisible = useSyncExternalStore(subscribePageVisibility, getPageVisible, serverVisible);
  useEffect(() => {
    const element = source?.current;
    if (!enabled || !element) return;
    return observeHeroVisibility(element, setInView);
  }, [source, enabled]);
  return heroMotionPolicy(reducedMotion, inView, pageVisible);
}
