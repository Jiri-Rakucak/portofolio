import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPageVisible, heroMotionPolicy, observeHeroVisibility, subscribePageVisibility } from '../heroActivity';
import { getReducedMotion, subscribeReducedMotion } from '../../../Hooks/useReducedMotion';

afterEach(() => vi.unstubAllGlobals());

describe('hero activity policy', () => {
  it('animates only a visible hero with full motion enabled', () => {
    expect(heroMotionPolicy(false, true, true)).toEqual({ animated: true, frameloop: 'always' });
    expect(heroMotionPolicy(true, true, true)).toEqual({ animated: false, frameloop: 'demand' });
    for (const reduced of [true, false]) {
      expect(heroMotionPolicy(reduced, false, true)).toEqual({ animated: false, frameloop: 'never' });
      expect(heroMotionPolicy(reduced, true, false)).toEqual({ animated: false, frameloop: 'never' });
    }
  });

  it('watches the actual hero intersection and disconnects on cleanup', () => {
    let notify!: (entries: { target: HTMLElement; isIntersecting: boolean }[]) => void;
    const observe = vi.fn();
    const disconnect = vi.fn();
    class Observer {
      constructor(callback: typeof notify) { notify = callback; }
      observe = observe;
      disconnect = disconnect;
    }
    const source = { ownerDocument: { defaultView: { IntersectionObserver: Observer } } } as unknown as HTMLElement;
    const changed = vi.fn();
    const cleanup = observeHeroVisibility(source, changed);
    notify([{ target: source, isIntersecting: false }]);
    expect(changed).toHaveBeenLastCalledWith(false);
    notify([{ target: source, isIntersecting: true }]);
    expect(changed).toHaveBeenLastCalledWith(true);
    expect(observe).toHaveBeenCalledWith(source);
    cleanup();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('keeps the scene usable when IntersectionObserver is unavailable', () => {
    const source = { ownerDocument: { defaultView: {} } } as unknown as HTMLElement;
    expect(() => observeHeroVisibility(source, vi.fn())()).not.toThrow();
  });

  it('reads visibility changes and removes the document listener', () => {
    const doc = { visibilityState: 'hidden', addEventListener: vi.fn(), removeEventListener: vi.fn() };
    vi.stubGlobal('document', doc);
    const changed = vi.fn();
    const cleanup = subscribePageVisibility(changed);
    expect(getPageVisible()).toBe(false);
    doc.visibilityState = 'visible';
    expect(getPageVisible()).toBe(true);
    expect(doc.addEventListener).toHaveBeenCalledWith('visibilitychange', changed);
    cleanup();
    expect(doc.removeEventListener).toHaveBeenCalledWith('visibilitychange', changed);
  });

  it('follows reduced-motion changes and removes the media listener', () => {
    const media = { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    const matchMedia = vi.fn(() => media);
    vi.stubGlobal('window', { matchMedia });
    const changed = vi.fn();
    const cleanup = subscribeReducedMotion(changed);
    expect(getReducedMotion()).toBe(false);
    media.matches = true;
    expect(getReducedMotion()).toBe(true);
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    expect(media.addEventListener).toHaveBeenCalledWith('change', changed);
    cleanup();
    expect(media.removeEventListener).toHaveBeenCalledWith('change', changed);
  });

  it('uses safe server/media fallbacks without browser APIs', () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('document', undefined);
    expect(getReducedMotion()).toBe(true);
    expect(getPageVisible()).toBe(true);
    expect(() => subscribeReducedMotion(vi.fn())()).not.toThrow();
    expect(() => subscribePageVisibility(vi.fn())()).not.toThrow();
  });
});
