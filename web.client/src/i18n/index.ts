import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLocale, isLocale, locales } from './types';
import enCommon from './locales/en/common.json';
import csCommon from './locales/cs/common.json';
import enDevos from './locales/en/devos.json';
import csDevos from './locales/cs/devos.json';

const storageKey = 'portfolio.locale';

const getInitialLocale = () => {
  if (typeof window === 'undefined') return defaultLocale;

  const storedLocale = window.localStorage.getItem(storageKey);
  return isLocale(storedLocale) ? storedLocale : defaultLocale;
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      devos: enDevos,
    },
    cs: {
      common: csCommon,
      devos: csDevos,
    },
  },
  lng: getInitialLocale(),
  fallbackLng: defaultLocale,
  supportedLngs: [...locales],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export { storageKey as localeStorageKey };
export default i18n;
