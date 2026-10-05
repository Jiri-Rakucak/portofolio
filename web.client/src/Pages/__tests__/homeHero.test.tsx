import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import i18n from '../../i18n';
import { darkTheme } from '../../styles/theme';
import HomeHero from '../../Components/Desktop/HomeHero';
import HeroScene from '../../Components/Desktop/HeroScene';

vi.mock('../../Components/Desktop/HeroScene', () => ({
    default: vi.fn(() => <div data-testid="hero-scene" />),
}));

const renderHero = async (locale: 'en' | 'cs') => {
    await i18n.changeLanguage(locale);
    return renderToStaticMarkup(
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={darkTheme}>
                <MemoryRouter><HomeHero /></MemoryRouter>
            </ThemeProvider>
        </I18nextProvider>,
    );
};

afterEach(() => vi.clearAllMocks());

describe('home hero', () => {
    it('introduces the owner and presents projects before DevOS in English', async () => {
        const html = await renderHero('en');

        expect(html).toMatch(/<h1[^>]*>Jiří Rakučák<\/h1>/);
        expect(html).toContain('I build web applications, game prototypes');
        expect(html).toContain('View projects');
        expect(html.indexOf('href="/projects"')).toBeLessThan(html.indexOf('href="/devos"'));
        expect(html).not.toContain('Web operation system');
    });

    it('keeps the same identity and translates the Czech introduction and actions', async () => {
        const html = await renderHero('cs');

        expect(html).toMatch(/<h1[^>]*>Jiří Rakučák<\/h1>/);
        expect(html).toContain('Vyvíjím webové aplikace, herní prototypy');
        expect(html).toContain('Prohlédnout projekty');
        expect(html).toContain('Spustit DevOS');
        expect(html.match(/<h1/g)).toHaveLength(1);
    });

    it('preserves the introduction and both links when the optional scene is unavailable', async () => {
        vi.mocked(HeroScene).mockReturnValueOnce(<></>);
        const html = await renderHero('en');

        expect(html).not.toContain('hero-scene');
        expect(html).toContain('Jiří Rakučák');
        expect(html).toContain('href="/projects"');
        expect(html).toContain('href="/devos"');
    });
});
