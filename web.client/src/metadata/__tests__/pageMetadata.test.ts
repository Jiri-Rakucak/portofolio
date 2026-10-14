import { afterEach, describe, expect, it, vi } from 'vitest';
import i18n from '../../i18n';
import { locales } from '../../i18n/types';
import { contact } from '../../content/contact';
import * as projects from '../../content/projects';
import { getServices } from '../../content/services';
import { metadataHandle, resolveMatchedMetadata, resolvePageMetadata } from '../pageMetadata';
import html from '../../../index.html?raw';

afterEach(() => vi.restoreAllMocks());

describe('localized page metadata', () => {
    it.each(locales)('gives %s public directories different titles and descriptions', locale => {
        const pages = ['home', 'projects', 'services'] as const;
        const metadata = pages.map(kind => resolvePageMetadata({ kind }, {}, locale));
        expect(new Set(metadata.map(page => page.title)).size).toBe(3);
        expect(new Set(metadata.map(page => page.description)).size).toBe(3);
        for (const page of metadata) {
            expect(page.title).toContain(contact.name);
            expect(page.description.length).toBeGreaterThan(40);
            expect(page.robots).toBe('index, follow');
            expect(page.title + page.description).not.toMatch(/metadata\.|\{\{|undefined/);
        }
    });

    it.each(locales)('uses central %s project names and summaries without component-local copies', locale => {
        for (const project of projects.getPortfolioProjects(locale)) {
            const metadata = resolvePageMetadata({ kind: 'project' }, { projectId: project.id }, locale);
            expect(metadata.title).toBe(`${project.name} | ${contact.name}`);
            expect(metadata.description).toBe(project.shortDescription);
            expect(metadata.robots).toBe('index, follow');
        }
    });

    it.each(locales)('uses central %s service details, including the UI/UX id mismatch with its URL', locale => {
        for (const service of getServices(locale)) {
            const metadata = resolvePageMetadata({ kind: 'service', serviceId: service.id }, {}, locale);
            expect(metadata.title).toBe(`${service.detail.title} | ${contact.name}`);
            expect(metadata.description).toBe(service.description);
        }
    });

    it('resolves the selected locale even before the global i18next language changes', async () => {
        await i18n.changeLanguage('en');
        const metadata = resolvePageMetadata({ kind: 'projects' }, {}, 'cs');
        expect(metadata.title).toBe(`Projekty | ${contact.name}`);
        expect(metadata.description).toContain('Prohlédni si mé projekty');
        expect(i18n.language).toBe('en');
    });

    it('reflects updated central content without a second metadata record', () => {
        const project = projects.getProjectById('ragsystem', 'en')!;
        vi.spyOn(projects, 'getProjectById').mockReturnValue({ ...project, shortDescription: 'Updated project summary.' });
        expect(resolvePageMetadata({ kind: 'project' }, { projectId: project.id }, 'en').description)
            .toBe('Updated project summary.');
    });

    it.each(locales)('marks %s error and private pages noindex without exposing requested paths', locale => {
        for (const kind of ['notFound', 'login', 'admin'] as const) {
            const metadata = resolvePageMetadata({ kind }, { private: 'do-not-publish' }, locale);
            expect(metadata.robots).toBe('noindex, follow');
            expect(metadata.title + metadata.description).not.toContain('do-not-publish');
        }
        for (const metadata of [
            resolvePageMetadata({ kind: 'project' }, { projectId: 'missing-private-project' }, locale),
            resolvePageMetadata({ kind: 'project' }, {}, locale),
            resolvePageMetadata({ kind: 'service', serviceId: 'missing-service' }, {}, locale),
        ]) {
            expect(metadata.robots).toBe('noindex, follow');
            expect(metadata.title + metadata.description).not.toMatch(/missing-private-project|missing-service|undefined/);
        }
    });

    it('selects the deepest metadata handle and does not infer ids from path strings', () => {
        const metadata = resolveMatchedMetadata([
            { handle: metadataHandle({ kind: 'home' }), params: {} },
            { handle: metadataHandle({ kind: 'project' }), params: { projectId: 'ragsystem' } },
        ], 'en');
        expect(metadata.title).toBe(`Personal Conversation RAG | ${contact.name}`);
        expect(resolveMatchedMetadata([{ handle: { unrelated: true }, params: {} }], 'cs').robots)
            .toBe('noindex, follow');
        expect(resolveMatchedMetadata([], 'en').robots).toBe('noindex, follow');
    });

    it('resets the previous project identity for DevOS', () => {
        const metadata = resolvePageMetadata({ kind: 'devos' }, {}, 'en');
        expect(metadata.title).toBe(`DevOS | ${contact.name}`);
        expect(metadata.description).toContain('desktop-style portfolio');
        expect(metadata.description).not.toContain('Starbounder');
    });

    it('keeps the static English homepage fallback aligned and avoids invented sharing URLs', () => {
        const metadata = resolvePageMetadata({ kind: 'home' }, {}, 'en');
        expect(html).toContain(`<title>${metadata.title}</title>`);
        expect(html).toContain(`name="description" content="${metadata.description}"`);
        expect(html).not.toMatch(/rel="canonical"|property="og:url"|property="og:image"/);
    });
});
