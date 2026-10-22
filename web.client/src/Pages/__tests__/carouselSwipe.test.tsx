import type { PointerEvent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { swipeDirection, useCarouselSwipe } from '../ProjectsPages/useCarouselSwipe';

function setup() {
    let handlers!: ReturnType<typeof useCarouselSwipe>;
    const next = vi.fn();
    const previous = vi.fn();
    const capture = vi.fn();
    function Harness() {
        handlers = useCarouselSwipe(next, previous);
        return null;
    }
    renderToStaticMarkup(<Harness />);
    const event = (overrides: Partial<PointerEvent<HTMLElement>> = {}) => ({
        pointerId: 1, pointerType: 'touch', isPrimary: true,
        clientX: 200, clientY: 100, timeStamp: 10,
        currentTarget: { setPointerCapture: capture }, ...overrides,
    } as unknown as PointerEvent<HTMLElement>);
    return { handlers, next, previous, capture, event };
}

describe('carousel swipe', () => {
    it.each([[-80, 8, 'next'], [80, -8, 'previous']] as const)('recognizes a deliberate horizontal swipe (%s, %s)', (dx, dy, direction) => {
        expect(swipeDirection(dx, dy, 200)).toBe(direction);
    });

    it.each([[20, 1, 100], [50, 60, 100], [70, 60, 100], [80, 1, 900], [80, 1, -1], [NaN, 0, 100], [Infinity, 0, 100]])(
        'ignores short, vertical, slow, or invalid gestures (%s, %s, %s)', (dx, dy, time) => {
            expect(swipeDirection(dx, dy, time)).toBeNull();
        },
    );

    it('captures a touch pointer and advances once after a swipe', () => {
        const { handlers, next, previous, capture, event } = setup();
        handlers.onPointerDown(event());
        handlers.onPointerUp(event({ clientX: 100, timeStamp: 200 }));
        handlers.onPointerUp(event({ clientX: 100, timeStamp: 250 }));
        expect(capture).toHaveBeenCalledWith(1);
        expect(next).toHaveBeenCalledTimes(1);
        expect(previous).not.toHaveBeenCalled();
    });

    it('goes back for the opposite swipe', () => {
        const { handlers, next, previous, event } = setup();
        handlers.onPointerDown(event());
        handlers.onPointerUp(event({ clientX: 300, timeStamp: 200 }));
        expect(previous).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
    });

    it.each(['mouse', 'pen'] as const)('does not navigate for %s input', pointerType => {
        const { handlers, next, capture, event } = setup();
        handlers.onPointerDown(event({ pointerType }));
        handlers.onPointerUp(event({ pointerType, clientX: 100, timeStamp: 200 }));
        expect(next).not.toHaveBeenCalled();
        expect(capture).not.toHaveBeenCalled();
    });

    it.each(['onPointerCancel', 'onLostPointerCapture'] as const)('clears an interrupted gesture (%s)', method => {
        const { handlers, next, event } = setup();
        handlers.onPointerDown(event());
        handlers[method]();
        handlers.onPointerUp(event({ clientX: 100, timeStamp: 200 }));
        expect(next).not.toHaveBeenCalled();
    });

    it('does not confuse a different pointer or a multi-touch gesture with a swipe', () => {
        const { handlers, next, event } = setup();
        handlers.onPointerDown(event());
        handlers.onPointerUp(event({ pointerId: 2, clientX: 100, timeStamp: 200 }));
        handlers.onPointerDown(event());
        handlers.onPointerDown(event({ pointerId: 2, isPrimary: false }));
        handlers.onPointerUp(event({ clientX: 100, timeStamp: 200 }));
        expect(next).not.toHaveBeenCalled();
    });
});
