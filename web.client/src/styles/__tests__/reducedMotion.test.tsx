import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { describe, expect, it } from 'vitest';
import { GlobalStyles } from '../globalStyles';
import { darkTheme } from '../theme';

describe('global reduced-motion styles', () => {
  it('disables CSS transitions, animations, and route view transitions without removing content', () => {
    const sheet = new ServerStyleSheet();
    try {
      const html = renderToStaticMarkup(sheet.collectStyles(<><GlobalStyles theme={darkTheme} /><p>Portfolio</p></>));
      const css = sheet.getStyleTags();
      expect(html).toContain('Portfolio');
      expect(css).toContain('@media (prefers-reduced-motion: reduce)');
      expect(css).toContain('animation:none!important');
      expect(css).toContain('transition:none!important');
      expect(css).toContain('scroll-behavior:auto!important');
      expect(css).toContain('::view-transition-group(*)');
    } finally { sheet.seal(); }
  });
});
