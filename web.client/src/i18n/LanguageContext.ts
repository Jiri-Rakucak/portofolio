import { createContext } from 'react';
import type { Locale } from './types';

export type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
