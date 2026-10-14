export type NavigationState = {
    mode: 'closed' | 'hover' | 'expanded';
    servicesOpen: boolean;
};

export type NavigationAction = 'hover' | 'activate' | 'leave' | 'open' | 'close' | 'toggle-services' | 'escape';

export const initialNavigationState: NavigationState = { mode: 'closed', servicesOpen: false };

export function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
    switch (action) {
        case 'hover':
            return state.mode === 'closed' ? { ...state, mode: 'hover' } : state;
        case 'activate':
            return state.mode === 'expanded' ? initialNavigationState : { ...state, mode: 'expanded' };
        case 'leave':
            return state.mode === 'hover' ? initialNavigationState : state;
        case 'open':
            return { ...state, mode: 'expanded' };
        case 'close':
            return initialNavigationState;
        case 'toggle-services':
            return { mode: 'expanded', servicesOpen: !state.servicesOpen };
        case 'escape':
            return state.servicesOpen ? { ...state, servicesOpen: false } : initialNavigationState;
    }
}
