import { css } from 'styled-components';

export const pageTransitionDuration = '200ms';

export const pageTransitions = css`
    @keyframes portfolio-page-out { to { opacity: 0; } }
    @keyframes portfolio-page-in { from { opacity: 0; } }

    ::view-transition-group(*) {
        animation-duration: ${pageTransitionDuration};
        animation-timing-function: ease-in-out;
    }
    ::view-transition-old(*), ::view-transition-new(*) {
        animation-duration: ${pageTransitionDuration};
    }

    /* Fade viewport snapshots, not a tall main element that moves on scroll. */
    ::view-transition-group(root),
    ::view-transition-group(portfolio-header), ::view-transition-group(portfolio-footer) {
        animation: none;
    }
    ::view-transition-old(root) {
        animation: portfolio-page-out ${pageTransitionDuration} ease-out both;
    }
    ::view-transition-new(root) {
        animation: portfolio-page-in ${pageTransitionDuration} ease-out both;
    }

    /* Render the new shell directly, without fading/moving its old snapshot. */
    ::view-transition-old(portfolio-header), ::view-transition-old(portfolio-footer) {
        display: none;
    }
    ::view-transition-new(portfolio-header), ::view-transition-new(portfolio-footer) {
        animation: none;
    }
    ::view-transition-group(portfolio-header) { z-index: 2; }
    ::view-transition-group(portfolio-footer) { z-index: 1; }
`;
