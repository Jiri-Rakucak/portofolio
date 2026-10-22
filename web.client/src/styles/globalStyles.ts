import { createGlobalStyle } from 'styled-components';
import type { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }

  /* Globální scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    filter: brightness(1.2);
  }

  html {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.accent} ${({ theme }) => theme.colors.backgroundSecondary};
  }

  /* Styly pro výběr textu */
  ::selection {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
  }

  ::-moz-selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #ffffff;
  }

    @keyframes slide-to-left {
    to { transform: translateX(-20%); opacity: 0; }
  }

  @keyframes slide-from-right {
    from { transform: translateX(20%); opacity: 0; }
  }

  ::view-transition-old(root) {
    animation: 400ms ease both ;
  }

  ::view-transition-new(root) {
    animation: 400ms ease both ;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
      animation: none !important;
    }
  }
`;
