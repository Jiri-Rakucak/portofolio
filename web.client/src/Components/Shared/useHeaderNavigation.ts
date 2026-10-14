import { useEffect, useReducer, useRef } from 'react';
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react';
import { initialNavigationState, navigationReducer } from './headerNavigationState';

export default function useHeaderNavigation() {
    const [state, dispatch] = useReducer(navigationReducer, initialNavigationState);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const servicesRef = useRef<HTMLButtonElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isOpen = state.mode !== 'closed';

    const cancelTimer = () => {
        if (closeTimer.current !== null) clearTimeout(closeTimer.current);
        closeTimer.current = null;
    };

    const close = () => {
        cancelTimer();
        dispatch('close');
    };

    useEffect(() => () => {
        if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const dismiss = (event: globalThis.PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) dispatch('close');
        };
        document.addEventListener('pointerdown', dismiss);
        return () => document.removeEventListener('pointerdown', dismiss);
    }, [isOpen]);

    const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse') return;
        cancelTimer();
        dispatch('hover');
    };

    const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse') return;
        cancelTimer();
        closeTimer.current = setTimeout(() => dispatch('leave'), 250);
    };

    const onFocus = (event: FocusEvent<HTMLDivElement>) => {
        cancelTimer();
        if (isOpen && event.nativeEvent.target !== triggerRef.current) dispatch('open');
    };

    const onBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Escape' || !isOpen) return;
        event.preventDefault();
        event.stopPropagation();
        cancelTimer();
        dispatch('escape');
        (state.servicesOpen ? servicesRef : triggerRef).current?.focus();
    };

    return {
        isOpen, servicesOpen: state.servicesOpen, containerRef, triggerRef, servicesRef, close,
        activate: () => { cancelTimer(); dispatch('activate'); },
        toggleServices: () => { cancelTimer(); dispatch('toggle-services'); },
        onPointerEnter, onPointerLeave, onFocus, onBlur, onKeyDown,
    };
}
