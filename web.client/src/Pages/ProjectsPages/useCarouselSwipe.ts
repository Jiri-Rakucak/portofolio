import { useRef, type PointerEvent } from 'react';

type TouchStart = { id: number; x: number; y: number; time: number };

export function swipeDirection(dx: number, dy: number, duration: number): 'next' | 'previous' | null {
    if (![dx, dy, duration].every(Number.isFinite)) return null;
    if (duration < 0 || duration > 800 || Math.abs(dx) < 48 || Math.abs(dx) <= Math.abs(dy) * 1.5) return null;
    return dx < 0 ? 'next' : 'previous';
}

export function useCarouselSwipe(onNext: () => void, onPrevious: () => void) {
    const start = useRef<TouchStart | null>(null);
    return {
        onPointerDown(event: PointerEvent<HTMLElement>) {
            start.current = null;
            if (event.pointerType !== 'touch' || !event.isPrimary) return;
            start.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
            event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerUp(event: PointerEvent<HTMLElement>) {
            const touch = start.current;
            start.current = null;
            if (!touch || touch.id !== event.pointerId) return;
            const direction = swipeDirection(event.clientX - touch.x, event.clientY - touch.y, event.timeStamp - touch.time);
            if (direction === 'next') onNext();
            if (direction === 'previous') onPrevious();
        },
        onPointerCancel() { start.current = null; },
        onLostPointerCapture() { start.current = null; },
    };
}
