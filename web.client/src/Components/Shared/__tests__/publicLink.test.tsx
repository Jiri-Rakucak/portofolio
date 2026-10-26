import type { RefAttributes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Link, MemoryRouter, type LinkProps } from 'react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PublicLink from '../PublicLink';
import { useReducedMotion } from '../../../Hooks/useReducedMotion';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';
import { darkTheme } from '../../../styles/theme';
import i18n from '../../../i18n';
import Header from '../Header';
import HomeHero from '../../Desktop/HomeHero';

vi.mock('../../../Hooks/useReducedMotion', () => ({ useReducedMotion: vi.fn(() => false) }));
vi.mock('react-router', async importOriginal => {
    const actual = await importOriginal<typeof import('react-router')>();
    return { ...actual, Link: vi.fn((props: LinkProps & RefAttributes<HTMLAnchorElement>) => <actual.Link {...props} />) };
});

beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.stubGlobal('document', { startViewTransition: vi.fn() });
});
afterEach(() => vi.unstubAllGlobals());

function render(props: Partial<LinkProps & RefAttributes<HTMLAnchorElement>> = {}) {
    const html = renderToStaticMarkup(<MemoryRouter>
        <PublicLink to="/projects" {...props}>Projects</PublicLink>
    </MemoryRouter>);
    const forwarded = vi.mocked(Link).mock.calls[0][0];
    return { html, forwarded };
}

describe('public navigation transitions', () => {
    it('enables router view transitions by default when supported', () => {
        const { html, forwarded } = render();
        expect(forwarded.viewTransition).toBe(true);
        expect(html).toContain('href="/projects"');
        expect(html).not.toContain('viewTransition=');
    });

    it('does not enable transitions for a reduced-motion preference, even when explicitly requested', () => {
        vi.mocked(useReducedMotion).mockReturnValue(true);
        const { html, forwarded } = render({ viewTransition: true });
        expect(forwarded.viewTransition).toBe(false);
        expect(html).toContain('href="/projects"');
    });

    it.each([undefined, {}, { startViewTransition: null }])('keeps links usable without the browser API (%s)', document => {
        vi.stubGlobal('document', document);
        const { html, forwarded } = render();
        expect(forwarded.viewTransition).toBe(false);
        expect(html).toContain('href="/projects"');
    });

    it('honors explicit opt-outs for DevOS and private navigation', () => {
        const { html, forwarded } = render({ to: '/devos', viewTransition: false });
        expect(forwarded.viewTransition).toBe(false);
        expect(html).toContain('href="/devos"');
    });

    it.each([
        [Header, '/admin'], [HomeHero, '/devos'],
    ] as const)('keeps the actual shell entry to %s outside public transitions (%s)', (Component, destination) => {
        renderToStaticMarkup(<I18nextProvider i18n={i18n}><ThemeProvider theme={darkTheme}>
            <MemoryRouter><Component /></MemoryRouter>
        </ThemeProvider></I18nextProvider>);
        const props = vi.mocked(Link).mock.calls.find(([props]) => props.to === destination)?.[0];
        expect(props).toBeDefined();
        expect(props?.viewTransition).toBe(false);
        const projects = vi.mocked(Link).mock.calls.find(([props]) => props.to === '/projects')?.[0];
        expect(projects?.viewTransition).toBe(true);
    });

    it('preserves normal router props, handlers, anchor attributes, and refs', () => {
        const onClick = vi.fn();
        const ref = { current: null };
        const { html, forwarded } = render({
            to: '/services', replace: true, preventScrollReset: true,
            state: { from: 'home' }, target: '_blank', rel: 'noreferrer',
            className: 'example', 'aria-label': 'Skills', onClick, ref,
        });
        expect(forwarded).toMatchObject({ replace: true, preventScrollReset: true, state: { from: 'home' }, onClick, ref });
        expect(html).toContain('target="_blank"');
        expect(html).toContain('rel="noreferrer"');
        expect(html).toContain('class="example"');
        expect(html).toContain('aria-label="Skills"');
    });
});
