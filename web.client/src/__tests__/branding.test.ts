import { describe, expect, it } from 'vitest';
import favicon from '../../public/favicon.svg?raw';
import html from '../../index.html?raw';

describe('portfolio branding', () => {
    it('uses the JR favicon and owner identity instead of template branding', () => {
        expect(html).toContain('href="/favicon.svg"');
        expect(html).toContain('<title>Jiří Rakučák | Portfolio</title>');
        expect(html).toContain('name="description"');
        expect(html).not.toContain('vite.svg');
        expect(html).not.toContain('<title>DevOs</title>');
    });

    it('keeps the monogram self-contained when web fonts are unavailable', () => {
        expect(favicon).toContain('viewBox="0 0 64 64"');
        expect(favicon).toContain('<title>JR</title>');
        expect(favicon).toContain('<path');
        expect(favicon).not.toMatch(/<text\b|<image\b|<script\b|@import|font-family|url\(/);
        expect(favicon).toContain('/licenses/inter-OFL.txt');
    });

    it('does not publish a fabricated production URL or sharing image', () => {
        expect(html).not.toContain('rel="canonical"');
        expect(html).not.toContain('property="og:url"');
        expect(html).not.toContain('property="og:image"');
        expect(html).not.toContain('example.com');
    });
});
