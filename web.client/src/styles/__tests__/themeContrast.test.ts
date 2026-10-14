import { Color } from 'three';
import { describe, expect, it } from 'vitest';
import { darkTheme, lightTheme } from '../theme';

function luminance(hex: string) {
    if (hex.length === 9) expect(hex.slice(-2).toLowerCase()).toBe('ff');
    const color = new Color(hex.slice(0, 7));
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

function contrast(a: string, b: string) {
    const first = luminance(a), second = luminance(b);
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe('default theme text contrast', () => {
    it.each([['light', lightTheme], ['dark', darkTheme]] as const)(
        'keeps small primary, secondary, and muted text readable on all %s theme surfaces', (_name, theme) => {
            for (const text of [theme.colors.text, theme.colors.textSecondary, theme.colors.textMuted]) {
                for (const background of [theme.colors.background, theme.colors.backgroundSecondary, theme.colors.surface]) {
                    expect(contrast(text, background)).toBeGreaterThanOrEqual(4.5);
                }
            }
        },
    );
});
