import { describe, expect, it } from 'vitest';
import { initialNavigationState, navigationReducer } from '../headerNavigationState';

describe('header navigation state', () => {
    it('opens and closes through native button activation', () => {
        const open = navigationReducer(initialNavigationState, 'activate');
        expect(open.mode).toBe('expanded');
        expect(navigationReducer(open, 'activate')).toEqual(initialNavigationState);
    });

    it('allows a hover preview but pins it on click or keyboard focus', () => {
        const hover = navigationReducer(initialNavigationState, 'hover');
        expect(hover.mode).toBe('hover');
        expect(navigationReducer(hover, 'leave')).toEqual(initialNavigationState);
        for (const action of ['activate', 'open'] as const) {
            const pinned = navigationReducer(hover, action);
            expect(navigationReducer(pinned, 'leave').mode).toBe('expanded');
            expect(navigationReducer(pinned, 'hover').mode).toBe('expanded');
        }
    });

    it('collapses skills first, then closes the main disclosure on Escape', () => {
        const open = navigationReducer(initialNavigationState, 'activate');
        const services = navigationReducer(open, 'toggle-services');
        expect(services.servicesOpen).toBe(true);
        const collapsed = navigationReducer(services, 'escape');
        expect(collapsed).toEqual({ mode: 'expanded', servicesOpen: false });
        expect(navigationReducer(collapsed, 'escape')).toEqual(initialNavigationState);
    });

    it('resets nested state on dismissal and ignores a stale leave timer after closing', () => {
        const services = navigationReducer(initialNavigationState, 'toggle-services');
        const closed = navigationReducer(services, 'close');
        expect(closed).toEqual(initialNavigationState);
        expect(navigationReducer(closed, 'leave')).toEqual(initialNavigationState);
        expect(navigationReducer(closed, 'activate').servicesOpen).toBe(false);
    });

    it('toggles skills without collapsing the main navigation', () => {
        const services = navigationReducer(initialNavigationState, 'toggle-services');
        expect(navigationReducer(services, 'toggle-services')).toEqual({ mode: 'expanded', servicesOpen: false });
    });
});
