import { describe, expect, it, vi } from 'vitest';
import { animateDrawerClose } from '../drawerMotion';

function fixture(reducedMotion = false) {
    let finish!: () => void;
    let fail!: (error: Error) => void;
    const finished = new Promise<void>((resolve, reject) => { finish = resolve; fail = reject; });
    const animation = { finished, cancel: vi.fn() };
    const view = {
        matchMedia: vi.fn(() => ({ matches: reducedMotion })),
        getComputedStyle: vi.fn(() => ({ transform: 'matrix(1, 0, 0, 1, 0, -80)' })),
    };
    const element = { ownerDocument: { defaultView: view }, animate: vi.fn(() => animation) };
    return { element, panel: element as unknown as HTMLElement, animation, finish, fail, view };
}

describe('preferences drawer close motion', () => {
    it('slides upward from the current position and closes only after the slide finishes', async () => {
        const { panel, element, finish } = fixture();
        const onClosed = vi.fn();
        animateDrawerClose(panel, onClosed);
        expect(element.animate).toHaveBeenCalledWith([
            { transform: 'matrix(1, 0, 0, 1, 0, -80)' }, { transform: 'translateY(-100%)' },
        ], { duration: 160, easing: 'ease-in', fill: 'forwards' });
        expect(onClosed).not.toHaveBeenCalled();
        finish();
        await Promise.resolve();
        expect(onClosed).toHaveBeenCalledOnce();
    });

    it('closes immediately for reduced motion without starting an animation', () => {
        const { panel, element } = fixture(true);
        const onClosed = vi.fn();
        animateDrawerClose(panel, onClosed);
        expect(onClosed).toHaveBeenCalledOnce();
        expect(element.animate).not.toHaveBeenCalled();
    });

    it('does not notify the parent after unmount cancellation', async () => {
        const { panel, animation, finish } = fixture();
        const onClosed = vi.fn();
        const cancel = animateDrawerClose(panel, onClosed);
        cancel();
        expect(animation.cancel).toHaveBeenCalledOnce();
        finish();
        await Promise.resolve();
        expect(onClosed).not.toHaveBeenCalled();
    });

    it('handles a cancelled animation rejection without leaving the drawer stuck', async () => {
        const { panel, fail } = fixture();
        const onClosed = vi.fn();
        animateDrawerClose(panel, onClosed);
        fail(new Error('Animation interrupted'));
        await Promise.resolve();
        expect(onClosed).toHaveBeenCalledOnce();
    });

    it('ignores a rejected completion promise after lifecycle cleanup', async () => {
        const { panel, fail } = fixture();
        const onClosed = vi.fn();
        animateDrawerClose(panel, onClosed)();
        fail(new Error('Animation cancelled on unmount'));
        await Promise.resolve();
        expect(onClosed).not.toHaveBeenCalled();
    });

    it('still dismisses when the animation API throws', () => {
        const { panel, element } = fixture();
        element.animate.mockImplementationOnce(() => { throw new Error('Animation unavailable'); });
        const onClosed = vi.fn();
        expect(() => animateDrawerClose(panel, onClosed)).not.toThrow();
        expect(onClosed).toHaveBeenCalledOnce();
    });

    it('still dismisses when Web Animations are unavailable', () => {
        const panel = { ownerDocument: { defaultView: {} } } as unknown as HTMLElement;
        const onClosed = vi.fn();
        animateDrawerClose(panel, onClosed);
        expect(onClosed).toHaveBeenCalledOnce();
    });
});
