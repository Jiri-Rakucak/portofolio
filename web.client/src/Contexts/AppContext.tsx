import React, { createContext, useState, useContext, useEffect, use } from 'react';
import type { ReactNode } from 'react';
//import { Elementy } from '../types/ViewModels';
//import { saveDataToLocalStorage, getDataFromLocalStorage } from '../utils/LocalStorage';

interface AppContextProps {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
    });    

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'system') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const value = {
        theme,
        setTheme
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};