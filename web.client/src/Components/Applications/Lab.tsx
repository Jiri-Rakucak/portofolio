import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import type { Theme } from '../../styles/theme';

const colorTokens = [
  'background',
  'backgroundSecondary',
  'surface',
  'border',
  'text',
  'textSecondary',
  'accent',
  'success',
  'warning',
  'error',
] as const;

const typographyTokens = ['h1', 'h2', 'h3', 'h4', 'bodyL', 'bodyM', 'bodyS', 'bodyXS'] as const;
const noteIndexes = [0, 1, 2];

const Wrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const LabHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const DotGroup = styled.div`
  display: flex;
  gap: 5px;
`;

const Dot = styled.span<{ $color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const FilePath = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Content = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Hero = styled.section`
  display: grid;
  gap: 10px;
`;

const Kicker = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  line-height: 1.1;
`;

const Subtitle = styled.p`
  max-width: 720px;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.65;
`;

const WorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  display: grid;
  gap: 14px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const PanelTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const TokenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
`;

const TokenItem = styled.div`
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
`;

const Swatch = styled.span<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $color }) => $color};
`;

const TokenMeta = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`;

const TokenName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.84rem;
  font-weight: 700;
`;

const TokenValue = styled.span`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TypeScale = styled.div`
  display: grid;
  gap: 10px;
`;

const TypeRow = styled.div<{ $fontSize: string; $fontWeight: number }>`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: baseline;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};

  span:last-child {
    flex: 0 0 auto;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.72rem;
    font-weight: 400;
  }
`;

const ComponentStack = styled.div`
  display: grid;
  gap: 14px;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' | 'quiet' }>`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.accent : theme.colors.border};
  color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.background : theme.colors.text};
  background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.accent : 'transparent'};
  cursor: pointer;
  font: inherit;
  font-weight: 700;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.background : theme.colors.accent};
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.84rem;
`;

const Input = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Status = styled.span<{ $tone: 'ready' | 'draft' | 'prototype' }>`
  padding: 5px 9px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, $tone }) => {
    if ($tone === 'ready') return theme.colors.success + '33';
    if ($tone === 'draft') return theme.colors.warning + '33';
    return theme.colors.accent + '33';
  }};
  border: 1px solid ${({ theme, $tone }) => {
    if ($tone === 'ready') return theme.colors.success;
    if ($tone === 'draft') return theme.colors.warning;
    return theme.colors.accent;
  }};
  font-size: 0.8rem;
  font-weight: 700;
`;

const SampleRow = styled.div`
  display: grid;
  gap: 8px;
  padding-left: 14px;
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
`;

const SampleTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const SampleBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
`;

const NoteList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
`;

const Lab: React.FC = () => {
  const { t } = useTranslation('devos');
  const theme = useTheme() as Theme;

  return (
    <Wrapper>
      <LabHeader>
        <HeaderLeft>
          <DotGroup aria-hidden="true">
            <Dot $color="#ff5f57" />
            <Dot $color="#febc2e" />
            <Dot $color="#28c840" />
          </DotGroup>
          <FilePath>{t('lab.fileName')}</FilePath>
        </HeaderLeft>
        <span>{t('lab.windowTitle')}</span>
      </LabHeader>

      <Content>
        <Hero>
          <Kicker>{t('lab.kicker')}</Kicker>
          <Title>{t('lab.title')}</Title>
          <Subtitle>{t('lab.subtitle')}</Subtitle>
        </Hero>

        <WorkspaceGrid>
          <Panel>
            <PanelTitle>{t('lab.tokensTitle')}</PanelTitle>
            <TokenGrid>
              {colorTokens.map(token => (
                <TokenItem key={token}>
                  <Swatch $color={theme.colors[token]} />
                  <TokenMeta>
                    <TokenName>{token}</TokenName>
                    <TokenValue>{theme.colors[token]}</TokenValue>
                  </TokenMeta>
                </TokenItem>
              ))}
            </TokenGrid>
          </Panel>

          <Panel>
            <PanelTitle>{t('lab.typographyTitle')}</PanelTitle>
            <TypeScale>
              {typographyTokens.map(token => (
                <TypeRow
                  key={token}
                  $fontSize={theme.typography[token].fontSize}
                  $fontWeight={theme.typography[token].fontWeight}
                >
                  <span>{token}</span>
                  <span>{theme.typography[token].fontSize}</span>
                </TypeRow>
              ))}
            </TypeScale>
          </Panel>
        </WorkspaceGrid>

        <WorkspaceGrid>
          <Panel>
            <PanelTitle>{t('lab.componentsTitle')}</PanelTitle>
            <ComponentStack>
              <ActionRow>
                <ActionButton type="button" $variant="primary">{t('lab.primaryAction')}</ActionButton>
                <ActionButton type="button" $variant="secondary">{t('lab.secondaryAction')}</ActionButton>
                <ActionButton type="button" $variant="quiet">{t('lab.quietAction')}</ActionButton>
              </ActionRow>
              <Field>
                {t('lab.inputLabel')}
                <Input placeholder={t('lab.inputPlaceholder')} />
              </Field>
              <StatusRow>
                <Status $tone="ready">{t('lab.statusReady')}</Status>
                <Status $tone="draft">{t('lab.statusDraft')}</Status>
                <Status $tone="prototype">{t('lab.statusPrototype')}</Status>
              </StatusRow>
            </ComponentStack>
          </Panel>

          <Panel>
            <PanelTitle>{t('lab.interfaceTitle')}</PanelTitle>
            <SampleRow>
              <SampleTitle>{t('lab.sampleTitle')}</SampleTitle>
              <SampleBody>{t('lab.sampleBody')}</SampleBody>
              <TagPreview />
            </SampleRow>
          </Panel>
        </WorkspaceGrid>

        <Panel>
          <PanelTitle>{t('lab.notesTitle')}</PanelTitle>
          <NoteList>
            {noteIndexes.map(index => (
              <li key={index}>{t(`lab.notes.${index}`)}</li>
            ))}
          </NoteList>
        </Panel>
      </Content>
    </Wrapper>
  );
};

const TagPreview = () => (
  <StatusRow>
    <Status $tone="prototype">React</Status>
    <Status $tone="prototype">TypeScript</Status>
    <Status $tone="prototype">styled-components</Status>
  </StatusRow>
);

export default Lab;
