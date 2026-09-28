export const locales = ['en', 'cs'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  cs: 'Čeština',
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && locales.includes(value as Locale);
