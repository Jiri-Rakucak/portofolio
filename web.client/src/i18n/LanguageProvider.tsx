import { useEffect, useMemo, useState, type ReactNode } from 'react';
import i18n, { localeStorageKey } from './index';
import { defaultLocale, isLocale, type Locale } from './types';
import { LanguageContext, type LanguageContextValue } from './LanguageContext';

const getStoredLocale = () => {
  if (typeof window === 'undefined') return defaultLocale;

  const storedLocale = window.localStorage.getItem(localeStorageKey);
  return isLocale(storedLocale) ? storedLocale : defaultLocale;
};

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  useEffect(() => {
    void i18n.changeLanguage(locale);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(localeStorageKey, locale);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState(currentLocale => currentLocale === 'en' ? 'cs' : 'en'),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
