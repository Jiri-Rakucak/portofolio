import { defaultLocale, type Locale } from '../i18n/types';
import { getPortfolioContent } from './localizedContent';
import type { ServiceSummary } from './contentTypes';

export type { ServiceSummary, TechnologyLink } from './contentTypes';

export const getServices = (locale?: Locale): ServiceSummary[] =>
    getPortfolioContent(locale).services;

export const getFeaturedServices = (locale?: Locale): ServiceSummary[] =>
    getServices(locale).filter(service => service.featuredOnHome);

export const getServiceById = (serviceId: string, locale?: Locale) =>
    getServices(locale).find(service => service.id === serviceId);

export const services = getServices(defaultLocale);
export const featuredServices = getFeaturedServices(defaultLocale);
