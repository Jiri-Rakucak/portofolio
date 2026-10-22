import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';
import { ActionAnchor, ActionButton, ActionLink, IconButton, TextLink } from '../Actions';
import { actionForeground } from '../actionContrast';
import { darkTheme, lightTheme, type Theme } from '../../../styles/theme';

function render(element: ReactElement, theme: Theme = darkTheme) {
    const sheet = new ServerStyleSheet();
    try {
        const html = renderToStaticMarkup(sheet.collectStyles(
            <ThemeProvider theme={theme}><MemoryRouter>{element}</MemoryRouter></ThemeProvider>,
        ));
        return { html, css: sheet.getStyleTags() };
    } finally { sheet.seal(); }
}

describe('public actions', () => {
    it('uses native elements for commands, internal navigation, and external URLs', () => {
        const { html } = render(<>
            <ActionButton disabled>Reset</ActionButton>
            <ActionLink to="/projects">Projects</ActionLink>
            <ActionAnchor href="https://example.org" target="_blank" rel="noreferrer">Source</ActionAnchor>
        </>);
        expect(html).toMatch(/<button[^>]*disabled=""[^>]*type="button"/);
        expect(html).toContain('href="/projects"');
        expect(html).toContain('target="_blank" rel="noreferrer"');
        expect(html).not.toContain('$variant');
        expect(html).not.toContain('$onMedia');
    });

    it.each([darkTheme, lightTheme])('shares touch sizing, focus, wrapping, and reduced motion across variants', theme => {
        const { css } = render(<>
            <ActionLink to="/projects">Primary</ActionLink>
            <ActionAnchor $variant="secondary" href="mailto:owner@example.org">Contact</ActionAnchor>
            <TextLink to="/services">Skills</TextLink>
            <IconButton aria-label="Next" title="Next">&gt;</IconButton>
        </>, theme);
        expect(css).toContain('min-height:48px');
        expect(css).toContain('min-height:44px');
        expect(css).toContain('width:44px;height:44px');
        expect(css).toContain('border-radius:6px');
        expect(css).toContain('overflow-wrap:anywhere');
        expect(css).toContain(`outline:2px solid ${theme.colors.accent}`);
        expect(css).toContain(':disabled{opacity:0.35;cursor:default;pointer-events:none;}');
        expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
        expect(css).not.toContain('#646cff');
    });

    it('limits photo-specific secondary colors to wide layouts', () => {
        const { css } = render(<ActionAnchor $variant="secondary" $onMedia href="https://example.org">Source</ActionAnchor>);
        expect(css).toContain(`--action-text:${darkTheme.colors.text}`);
        expect(css).toMatch(/@media \(min-width:\s*901px\)/);
        expect(css).toContain('--action-text:#ffffff;--action-on-text:#000000;');
    });

    it.each(['#ffffff', '#000000', '#007BFF', '#3498db', '#ff00ff', '#ffff00'])('uses the higher-contrast foreground on custom accent %s', accent => {
        const theme = { ...darkTheme, colors: { ...darkTheme.colors, accent } };
        const { css } = render(<ActionButton>Apply</ActionButton>, theme);
        expect(css).toContain(`background:${accent};border-color:${accent};color:${actionForeground(accent)}`);
    });
});

describe('action foreground', () => {
    it.each(['#ffffff', '#FFFF00', '#3498db'])('uses black on light colors (%s)', color => {
        expect(actionForeground(color)).toBe('#000000');
    });
    it.each(['#000000', '#111827', '#0000ff'])('uses white on dark colors (%s)', color => {
        expect(actionForeground(color)).toBe('#ffffff');
    });
    it.each(['', 'red', '#fff', '#gggggg', '#000000;background:red'])('rejects malformed input (%s)', color => {
        expect(actionForeground(color)).toBe('#000000');
    });
});
