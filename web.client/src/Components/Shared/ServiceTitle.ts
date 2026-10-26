import styled from 'styled-components';

// Name only the title text, never its description, index, tags, or link icon.
export const ServiceTitle = styled.span<{ $transitionName: string }>`
    view-transition-name: ${({ $transitionName }) => $transitionName};
    display: inline-block;
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
`;
