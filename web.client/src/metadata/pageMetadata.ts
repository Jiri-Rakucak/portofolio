import i18n from '../i18n';
import type { Locale } from '../i18n/types';
import { contact } from '../content/contact';
import { getProjectById } from '../content/projects';
import { getServiceById } from '../content/services';

export type PageMetadataSource =
    | { kind: 'home' | 'projects' | 'services' | 'notFound' | 'devos' | 'login' | 'admin' | 'project' }
    | { kind: 'service'; serviceId: string };

export type MetadataHandle = { metadata: PageMetadataSource };

export type PageMetadata = {
    title: string;
    description: string;
    robots: 'index, follow' | 'noindex, follow';
};

type MetadataMatch = {
    handle?: unknown;
    params: Record<string, string | undefined>;
};

export const metadataHandle = (source: PageMetadataSource): MetadataHandle => ({ metadata: source });

export function resolvePageMetadata(source: PageMetadataSource, params: MetadataMatch['params'], locale: Locale): PageMetadata {
    const t = i18n.getFixedT(locale, 'common');
    const page = (title: string, description: string, noindex = false): PageMetadata => ({
        title: t('metadata.pageTitle', { page: title, owner: contact.name }),
        description,
        robots: noindex ? 'noindex, follow' : 'index, follow',
    });
    const missing = (kind: 'notFound' | 'projectNotFound' | 'serviceNotFound') =>
        page(t(`metadata.${kind}.title`), t(`metadata.${kind}.description`), true);

    switch (source.kind) {
        case 'home':
            return {
                title: t('metadata.home.pageTitle', { owner: contact.name }),
                description: t('metadata.home.description'),
                robots: 'index, follow',
            };
        case 'projects':
            return page(t('navigation.projects'), t('metadata.projects.description'));
        case 'services':
            return page(t('servicesPage.title'), t('metadata.services.description'));
        case 'project': {
            const project = getProjectById(params.projectId ?? '', locale);
            return project ? page(project.name, project.shortDescription) : missing('projectNotFound');
        }
        case 'service': {
            const service = getServiceById(source.serviceId, locale);
            return service ? page(service.detail.title, service.description) : missing('serviceNotFound');
        }
        case 'devos':
            return page('DevOS', t('metadata.devos.description'));
        case 'login':
        case 'admin':
            return page(t(`metadata.${source.kind}.title`), t(`metadata.${source.kind}.description`), true);
        case 'notFound':
        default:
            return missing('notFound');
    }
}

export function resolveMatchedMetadata(matches: readonly MetadataMatch[], locale: Locale): PageMetadata {
    for (let index = matches.length - 1; index >= 0; index--) {
        const match = matches[index];
        const handle = match.handle as MetadataHandle | undefined;
        if (handle?.metadata) return resolvePageMetadata(handle.metadata, match.params, locale);
    }
    return resolvePageMetadata({ kind: 'notFound' }, {}, locale);
}
