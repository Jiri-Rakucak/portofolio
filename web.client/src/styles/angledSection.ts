import { css } from 'styled-components';

export const angledSection = css`
  --section-cut: 48px;
  margin-top: calc(-1 * var(--section-cut));
  clip-path: polygon(0 0, 100% var(--section-cut), 100% 100%, 0 100%);

  @media (max-width: 640px) {
    --section-cut: 32px;
  }
`;
