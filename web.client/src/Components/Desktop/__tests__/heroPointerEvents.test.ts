import { describe, expect, it, vi } from 'vitest';
import { bindHeroPointer } from '../heroPointerEvents';
import { heroTiltLimits } from '../heroPointer';

const createSource = (reduced = false, fine = true) => {
  const reducedMotion = Object.assign(new EventTarget(), { matches: reduced });
  const finePointer = Object.assign(new EventTarget(), { matches: fine });
  const view = Object.assign(new EventTarget(), {
    matchMedia: vi.fn((query: string) => query.includes('reduced-motion') ? reducedMotion : finePointer),
  });
  const source = Object.assign(new EventTarget(), {
    ownerDocument: { defaultView: view },
    getBoundingClientRect: vi.fn(() => ({ left: 100, top: 68, width: 1000, height: 640 })),
  });
  const onTilt = vi.fn();
  const cleanup = bindHeroPointer(source as unknown as HTMLElement, onTilt);
  const move = (pointerType = 'mouse') => {
    const event = Object.assign(new Event('pointermove'), { pointerType, clientX: 1100, clientY: 708 });
    source.dispatchEvent(event);
  };
  return { source, view, reducedMotion, finePointer, onTilt, cleanup, move };
};

describe('hero pointer event lifecycle', () => {
  it('uses hero-relative client coordinates when receiving a mouse event', () => {
    const { move, onTilt, source, cleanup } = createSource();
    move();

    expect(source.getBoundingClientRect).toHaveBeenCalledOnce();
    expect(onTilt).toHaveBeenLastCalledWith({ pitch: -heroTiltLimits.pitch, yaw: heroTiltLimits.yaw });
    cleanup();
  });

  it.each(['touch', 'pen'])('does not introduce mouse-follow motion for %s input', pointerType => {
    const { move, onTilt, source, cleanup } = createSource();
    move(pointerType);

    expect(onTilt).not.toHaveBeenCalled();
    expect(source.getBoundingClientRect).not.toHaveBeenCalled();
    cleanup();
  });

  it.each([[true, true], [false, false]])('disables tracking for reduced motion=%s, fine pointer=%s', (reduced, fine) => {
    const { move, onTilt, cleanup } = createSource(reduced, fine);
    move();

    expect(onTilt).not.toHaveBeenCalled();
    cleanup();
  });

  it.each(['pointerleave', 'pointercancel'])('resets the tilt on %s', type => {
    const { move, source, onTilt, cleanup } = createSource();
    move();
    source.dispatchEvent(new Event(type));

    expect(onTilt).toHaveBeenLastCalledWith({ pitch: 0, yaw: 0 });
    cleanup();
  });

  it.each(['blur', 'scroll', 'resize'])('clears stale coordinates after a window %s event', type => {
    const { move, view, onTilt, cleanup } = createSource();
    move();
    view.dispatchEvent(new Event(type));

    expect(onTilt).toHaveBeenLastCalledWith({ pitch: 0, yaw: 0 });
    cleanup();
  });

  it.each(['reducedMotion', 'finePointer'] as const)('responds to changes in the %s preference', preference => {
    const state = createSource();
    state.move();
    state[preference].matches = preference === 'reducedMotion';
    state[preference].dispatchEvent(new Event('change'));
    expect(state.onTilt).toHaveBeenLastCalledWith({ pitch: 0, yaw: 0 });

    state.onTilt.mockClear();
    state.move();
    expect(state.onTilt).not.toHaveBeenCalled();
    state.cleanup();
  });

  it('removes all listeners on cleanup, including media-query subscriptions', () => {
    const state = createSource();
    state.cleanup();
    state.onTilt.mockClear();
    state.move();
    state.source.dispatchEvent(new Event('pointerleave'));
    state.source.dispatchEvent(new Event('pointercancel'));
    for (const type of ['blur', 'scroll', 'resize']) state.view.dispatchEvent(new Event(type));
    state.reducedMotion.dispatchEvent(new Event('change'));
    state.finePointer.dispatchEvent(new Event('change'));

    expect(state.onTilt).not.toHaveBeenCalled();
  });

  it('can be safely mounted and cleaned up without a browser window', () => {
    const source = { ownerDocument: { defaultView: null } } as unknown as HTMLElement;
    const onTilt = vi.fn();

    expect(() => bindHeroPointer(source, onTilt)()).not.toThrow();
    expect(onTilt).not.toHaveBeenCalled();
  });
});
