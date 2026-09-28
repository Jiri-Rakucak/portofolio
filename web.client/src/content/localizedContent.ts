import { defaultLocale, isLocale, type Locale } from '../i18n/types';
import enContent from '../i18n/locales/en/content.json';
import csContent from '../i18n/locales/cs/content.json';
import type { PortfolioContent } from './contentTypes';

const contentByLocale = {
    en: enContent,
    cs: csContent,
} as Record<Locale, PortfolioContent>;

export const resolveLocale = (locale?: Locale) =>
    isLocale(locale) ? locale : defaultLocale;

export const getPortfolioContent = (locale?: Locale) =>
    contentByLocale[resolveLocale(locale)];
