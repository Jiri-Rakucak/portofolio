import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

export const useLocale = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLocale must be used within LanguageProvider.');
  }

  return context;
};
