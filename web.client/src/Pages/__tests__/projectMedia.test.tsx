import { beforeEach, describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import type { ReactNode } from 'react';
import type { ProjectAsset } from '../../content/contentTypes';
import i18n from '../../i18n';
import { darkTheme } from '../../styles/theme';
import ProjectGallery from '../ProjectsPages/ProjectGallery';
import PortfolioImage from '../ProjectsPages/PortfolioImage';

const render = (children: ReactNode) => renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </I18nextProvider>,
);

beforeEach(async () => { await i18n.changeLanguage('en'); });

const image: ProjectAsset = { type: 'image', label: 'Ship flight', src: '/flight.png', alt: 'Ship in space' };

describe('project gallery', () => {
    it('renders labelled image controls without opening a viewer on load', () => {
        const html = render(<ProjectGallery assets={[image]} />);

        expect(html).toContain('aria-label="Enlarge: Ship flight"');
        expect(html).toContain('alt="Ship in space"');
        expect(html).toContain('<figcaption');
        expect(html).not.toContain('<dialog');
    });

    it('uses the caption as alt text when a single image has no alt', () => {
        const html = render(<ProjectGallery assets={[{ ...image, alt: undefined }]} />);

        expect(html).toContain('alt="Ship flight"');
        expect(html.match(/<button/g)).toHaveLength(1);
    });

    it('omits unusable images and does not treat non-image links as screenshots', () => {
        const html = render(<ProjectGallery assets={[
            { ...image, src: '' }, { ...image, src: '   ' }, { ...image, src: undefined },
            { type: 'video', label: 'Trailer', src: '/trailer.mp4' },
        ]} />);

        expect(html).toBe('');
    });

    it('renders no gallery for an empty asset catalog', () => {
        expect(render(<ProjectGallery assets={[]} />)).toBe('');
    });
});

describe('portfolio image', () => {
    it('renders an eager cover with its original source and alt text', () => {
        const html = render(<PortfolioImage src="/planet.png" alt="Generated planet" fit="cover" loading="eager" />);

        expect(html).toContain('src="/planet.png"');
        expect(html).toContain('alt="Generated planet"');
        expect(html).toContain('loading="eager"');
    });

    it('defaults gallery images to lazy loading', () => {
        expect(render(<PortfolioImage src="/planet.png" alt="Planet" />)).toContain('loading="lazy"');
    });

    it('shows a localized accessible fallback instead of an empty image request', async () => {
        await i18n.changeLanguage('cs');
        const html = render(<PortfolioImage src="   " alt="Planeta" />);

        expect(html).toContain('role="img" aria-label="Planeta"');
        expect(html).toContain('Obrázek není dostupný');
        expect(html).not.toContain('<img');
    });
});
