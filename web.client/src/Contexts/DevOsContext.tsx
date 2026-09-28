import React, { createContext, useContext, useReducer, useMemo } from 'react';
import type { ReactNode } from 'react';
// OPRAVA: Chybějící importy pro initialState
import HomeIcon from '../Components/Icons/Home';
import AtomScene from '../Components/Desktop/AtomScene';
import Explorer from '../Components/Applications/Explorer';
import ExplorerIcon from '../Components/Icons/ExplorerIcon';
import WebBrowser from '../Components/Applications/Browser';
import Terminal from '../Components/Applications/Terminal';
import TerminalIcon from '../Components/Icons/Terminal';
import AboutMe from '../Components/Applications/AboutMe';
import Lab from '../Components/Applications/Lab';
import FileIcon from '../Components/Icons/File';
import SettingsIcon from '../Components/Icons/Settings';

// --- Typy ---
type WindowProps = Record<string, unknown>;

export interface WindowState {
    id: string;
    type: 'browser' | 'game' | 'app' | 'file-explorer' | 'terminal';
    title: string;
    icon: React.ComponentType<{ size?: number }>;
    position: { x: number; y: number };
    size: { width: number; height: number };
    state: 'normal' | 'minimized' | 'maximized';
    zIndex: number;
    component: React.ElementType;
    props?: WindowProps;
    previousState?: 'normal' | 'maximized';
    previousPosition?: { x: number; y: number };
    previousSize?: { width: number; height: number };
}

export interface DesktopIconState {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  position: { x: number; y: number };
  onDoubleClick: (state: DevOsState, actions: DevOsActions) => void;
}

export interface DevOsState {
    windows: WindowState[];
    desktopIcons: DesktopIconState[];
    activeWindowId: string | null;
    isStartMenuOpen: boolean; // OPRAVA: Přidán stav pro start menu
}

export interface DevOsActions {
    createWindow: (windowConfig: Omit<WindowState, 'id' | 'zIndex' | 'state'>) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void; // PŘIDÁNO
    updateWindowSize: (id: string, size: { width: number; height: number }) => void; // PŘIDÁNO
    updateIconPosition: (id: string, position: { x: number; y: number }) => void;
    toggleStartMenu: () => void;
}

// --- Akce pro Reducer ---

type DevOsAction = 
    | { type: 'CREATE_WINDOW'; payload: Omit<WindowState, 'id' | 'zIndex' | 'state'> }
    | { type: 'CLOSE_WINDOW'; payload: { id: string } }
    | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
    | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
    | { type: 'FOCUS_WINDOW'; payload: { id: string } }
    | { type: 'UPDATE_WINDOW_POSITION'; payload: { id: string; position: { x: number; y: number } } } // PŘIDÁNO
    | { type: 'UPDATE_WINDOW_SIZE'; payload: { id: string; size: { width: number; height: number } } } // PŘIDÁNO
    | { type: 'UPDATE_ICON_POSITION'; payload: { id: string; position: { x: number; y: number } } } // OPRAVA: Přidána chybějící akce
    | { type: 'TOGGLE_START_MENU' }; // OPRAVA: Přidána chybějící akce

// --- Konstanty ---

const Z_INDEX = {
    MINIMIZED: -1,
    NORMAL: 10,
    ACTIVE: 99,
};

// --- Výchozí Stav ---

const initialState: DevOsState = {
  windows: [],
  desktopIcons: [
    {
      id: 'atom-scene-icon',
      title: 'Atom Scene Explorer',
      icon: HomeIcon,
      position: { x: 0, y: 0 },
      onDoubleClick: (state, actions) => {
        const existingWindow = state.windows.find(w => w.title === 'Atom Scene');
        if (existingWindow) {
          actions.focusWindow(existingWindow.id);
        } else {
          actions.createWindow({
            type: 'app',
            title: 'Atom Scene',
            icon: HomeIcon,
            component: AtomScene,
            position: { x: 100, y: 100 },
            size: { width: 600, height: 550 },
          });
        }
      },
    },
    {
      id: 'explorer-icon',
      title: 'Explorer',
      icon: ExplorerIcon,
      position: { x: 0, y: 80 },
      onDoubleClick: (state, actions) => {
        const existingWindow = state.windows.find(w => w.type === 'file-explorer');
        if (existingWindow) {
          actions.focusWindow(existingWindow.id);
        } else {
          actions.createWindow({
            type: 'file-explorer',
            title: 'Průzkumník souborů',
            icon: ExplorerIcon,
            component: Explorer,
            size: { width: 800, height: 500 },
            position: { x: 100, y: 100 },
          });
        }
      },
    },
    {
        id: 'browser-icon',
        title: 'Web Browser',
        icon: HomeIcon,
        position: { x: 0, y: 160 },
        onDoubleClick: (state, actions) => {
            const existingWindow = state.windows.find(w => w.title === 'Web Browser');
            if (existingWindow) {
                actions.focusWindow(existingWindow.id);
            } else {
                actions.createWindow({
                    type: 'browser',
                    title: 'Web Browser',
                    icon: HomeIcon,
                    component: WebBrowser,
                    position: { x: 100, y: 100 },
                    size: { width: 800, height: 600 },
                });
            }
        }
    },
    {
        id: 'about-me-icon',
        title: 'About Me',
        icon: FileIcon,
        position: { x: 0, y: 240 },
        onDoubleClick: (state, actions) => {
            const existingWindow = state.windows.find(w => w.title === 'About Me');
            if (existingWindow) {
                actions.focusWindow(existingWindow.id);
            } else {
                actions.createWindow({
                    type: 'app',
                    title: 'About Me',
                    icon: FileIcon,
                    component: AboutMe,
                    position: { x: 180, y: 90 },
                    size: { width: 720, height: 540 },
                });
            }
        }
    },
    {
        id: 'lab-icon',
        title: 'Component Lab',
        icon: SettingsIcon,
        position: { x: 0, y: 320 },
        onDoubleClick: (state, actions) => {
            const existingWindow = state.windows.find(w => w.title === 'Component Lab');
            if (existingWindow) {
                actions.focusWindow(existingWindow.id);
            } else {
                actions.createWindow({
                    type: 'app',
                    title: 'Component Lab',
                    icon: SettingsIcon,
                    component: Lab,
                    position: { x: 220, y: 90 },
                    size: { width: 820, height: 600 },
                });
            }
        }
    },
    {
        id: 'terminal-icon',
        title: 'Terminal',
        icon: TerminalIcon,
        position: { x: 0, y: 400 },
        onDoubleClick: (state, actions) => {
            const existingWindow = state.windows.find(w => w.type === 'terminal');
            if (existingWindow) {
                actions.focusWindow(existingWindow.id);
            } else {
                actions.createWindow({
                    type: 'terminal',
                    title: 'Portfolio Terminal',
                    icon: TerminalIcon,
                    component: Terminal,
                    position: { x: 140, y: 120 },
                    size: { width: 720, height: 440 },
                });
            }
        }
    }

  ],
  activeWindowId: null,
  isStartMenuOpen: false,
};

// --- Reducer ---

const devOsReducer = (state: DevOsState, action: DevOsAction): DevOsState => {
    switch (action.type) {
        case 'CREATE_WINDOW': {
            const newWindowId = `window-${Date.now()}`;
            return {
                ...state,
                windows: [
                    ...state.windows.map(w => ({
                        ...w,
                        zIndex: w.state === 'minimized' ? Z_INDEX.MINIMIZED : Z_INDEX.NORMAL,
                    })),
                    {
                        ...action.payload,
                        id: newWindowId, 
                        state: 'normal',
                        zIndex: Z_INDEX.ACTIVE,
                        previousState: 'normal',
                        previousPosition: action.payload.position,
                        previousSize: action.payload.size,
                    },
                ],
                activeWindowId: newWindowId,
            };
        }

        case 'CLOSE_WINDOW': {
            const remainingWindows = state.windows.filter(w => w.id !== action.payload.id);
            const newActiveWindow = remainingWindows.find(w => w.state !== 'minimized');
            return {
                ...state,
                windows: remainingWindows,
                activeWindowId: newActiveWindow ? newActiveWindow.id : null,
            };
        }

        case 'FOCUS_WINDOW': {
            if (state.activeWindowId === action.payload.id) return state;
            
            return {
                ...state,
                windows: state.windows.map(w => {
                    if (w.id === action.payload.id) {
                        const newState = w.state === 'minimized' ? (w.previousState ?? 'normal') : w.state;
                        return { ...w, zIndex: Z_INDEX.ACTIVE, state: newState };
                    }
                    return { ...w, zIndex: w.state === 'minimized' ? Z_INDEX.MINIMIZED : Z_INDEX.NORMAL };
                }),
                activeWindowId: action.payload.id,
            };
        }

        case 'MAXIMIZE_WINDOW': {
            return {
                ...state,
                windows: state.windows.map(w => {
                    if (w.id === action.payload.id) {
                        if (w.state === 'maximized') {
                            // Obnovení z maximalizovaného stavu
                            return { 
                                ...w, 
                                state: 'normal', 
                                position: w.previousPosition ?? w.position, 
                                size: w.previousSize ?? w.size 
                            };
                        } else {
                            // Maximalizace okna
                            return { 
                                ...w, 
                                state: 'maximized',
                                previousPosition: w.position, // Uložíme aktuální pozici
                                previousSize: w.size,       // a velikost
                            };
                        }
                    }
                    return w;
                }),
                activeWindowId: action.payload.id,
            };
        }

        case 'MINIMIZE_WINDOW': {
            const windowToMinimize = state.windows.find(w => w.id === action.payload.id);
            if (!windowToMinimize) return state;

            const nextActiveWindow = state.windows
                .filter(w => w.id !== action.payload.id && w.state !== 'minimized')
                .sort((a, b) => b.zIndex - a.zIndex)[0];

            return {
                ...state,
                windows: state.windows.map(w => 
                    w.id === action.payload.id 
                        ? { 
                            ...w, 
                            state: 'minimized', 
                            zIndex: Z_INDEX.MINIMIZED,
                            // ZMĚNA: Uložíme si stav před minimalizací
                            previousState: w.state === 'minimized' ? (w.previousState ?? 'normal') : w.state,
                          } 
                        : w
                ),
                activeWindowId: nextActiveWindow ? nextActiveWindow.id : null,
            };
        }
        case 'UPDATE_WINDOW_POSITION':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.id ? { ...w, position: action.payload.position } : w
                ),
            };

        case 'UPDATE_WINDOW_SIZE':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.id ? { ...w, size: action.payload.size } : w
                ),
            };
        
        case 'UPDATE_ICON_POSITION':
            return {
                ...state,
                desktopIcons: state.desktopIcons.map(icon =>
                    icon.id === action.payload.id ? { ...icon, position: action.payload.position } : icon
                ),
            };

        case 'TOGGLE_START_MENU':
            return { ...state, isStartMenuOpen: !state.isStartMenuOpen };

        default:
            return state;
    }
};

// --- Context a Provider ---

const DevOsContext = createContext<{ state: DevOsState; actions: DevOsActions } | null>(null);

export const DevOsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(devOsReducer, initialState);

    const actions: DevOsActions = useMemo(() => ({
        createWindow: (windowConfig) => dispatch({ type: 'CREATE_WINDOW', payload: windowConfig }),
        closeWindow: (id) => dispatch({ type: 'CLOSE_WINDOW', payload: { id } }),
        minimizeWindow: (id) => dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } }),
        maximizeWindow: (id) => dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } }),
        focusWindow: (id) => dispatch({ type: 'FOCUS_WINDOW', payload: { id } }),
        updateWindowPosition: (id, position) => dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { id, position } }), // PŘIDÁNO
        updateWindowSize: (id, size) => dispatch({ type: 'UPDATE_WINDOW_SIZE', payload: { id, size } }), // PŘIDÁNO
        updateIconPosition: (id, position) => dispatch({ type: 'UPDATE_ICON_POSITION', payload: { id, position } }),
        toggleStartMenu: () => dispatch({ type: 'TOGGLE_START_MENU' }),
    }), []);

    return (
        <DevOsContext.Provider value={{ state, actions }}>
            {children}
        </DevOsContext.Provider>
    );
};

// --- Hook ---

export const useDevOs = () => {
    const context = useContext(DevOsContext);
    if (!context) {
        throw new Error('useDevOs must be used within DevOsProvider');
    }
    return context;
};
