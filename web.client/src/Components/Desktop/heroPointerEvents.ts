import { getHeroPointerTilt, type HeroTilt } from './heroPointer';

export function bindHeroPointer(source: HTMLElement, onTilt: (tilt: HeroTilt) => void) {
  const view = source.ownerDocument.defaultView;
  if (!view) return () => {};

  const reducedMotion = view.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = view.matchMedia('(any-hover: hover) and (any-pointer: fine)');
  const reset = () => onTilt({ pitch: 0, yaw: 0 });
  const onMove = (event: PointerEvent) => {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
    onTilt(getHeroPointerTilt(event.clientX, event.clientY, source.getBoundingClientRect()));
  };

  // Listen on the whole hero so its text and buttons do not interrupt tracking.
  source.addEventListener('pointermove', onMove);
  source.addEventListener('pointerleave', reset);
  source.addEventListener('pointercancel', reset);
  view.addEventListener('blur', reset);
  view.addEventListener('scroll', reset, { passive: true });
  view.addEventListener('resize', reset);
  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);

  return () => {
    source.removeEventListener('pointermove', onMove);
    source.removeEventListener('pointerleave', reset);
    source.removeEventListener('pointercancel', reset);
    view.removeEventListener('blur', reset);
    view.removeEventListener('scroll', reset);
    view.removeEventListener('resize', reset);
    reducedMotion.removeEventListener('change', reset);
    finePointer.removeEventListener('change', reset);
    reset();
  };
}
