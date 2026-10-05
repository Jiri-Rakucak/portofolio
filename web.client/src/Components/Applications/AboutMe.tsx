import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { contact } from '../../content/contact';

const sectionKeys = ['focus', 'build', 'work'] as const;
const keywordKeys = ['react', 'typescript', 'devos', 'three', 'content', 'backend'] as const;

const Wrapper = styled.article`
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const EditorHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const DotGroup = styled.div`
  display: flex;
  gap: 5px;
  flex: 0 0 auto;
`;

const Dot = styled.span<{ $tone: 'red' | 'yellow' | 'green' }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $tone }) => {
    if ($tone === 'red') return '#ff5f57';
    if ($tone === 'yellow') return '#febc2e';
    return '#28c840';
  }};
`;

const FilePath = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Updated = styled.span`
  flex: 0 0 auto;
`;

const Document = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 30px 28px 36px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.05;
`;

const Role = styled.p`
  max-width: 720px;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  line-height: 1.65;
`;

const Summary = styled.p`
  max-width: 760px;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.75;
`;

const KeywordSection = styled.section`
  display: grid;
  gap: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Keyword = styled.button`
  position: relative;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: help;
  font: inherit;
  font-size: 0.84rem;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    bottom: calc(100% + 8px);
    width: min(260px, 70vw);
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.textSecondary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transform: translateX(-50%) translateY(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease, transform 0.15s ease;
    white-space: normal;
    line-height: 1.45;
    z-index: 5;
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const SectionList = styled.div`
  display: grid;
  gap: 18px;
`;

const TextSection = styled.section`
  display: grid;
  gap: 8px;
  padding-left: 16px;
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
`;

const SectionBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const ContactPanel = styled.section`
  display: grid;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContactIntro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const ContactActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ContactLink = styled.a`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 700;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const AboutMe: React.FC = () => {
  const { t } = useTranslation('devos');

  return (
    <Wrapper>
      <EditorHeader>
        <HeaderLeft>
          <DotGroup aria-hidden="true">
            <Dot $tone="red" />
            <Dot $tone="yellow" />
            <Dot $tone="green" />
          </DotGroup>
          <FilePath>{t('aboutMe.fileName')}</FilePath>
        </HeaderLeft>
        <Updated>{t('aboutMe.updatedLabel')}: {t('aboutMe.updatedValue')}</Updated>
      </EditorHeader>

      <Document>
        <Hero>
          <Kicker>{t('aboutMe.kicker')}</Kicker>
          <Title>{t('aboutMe.name')}</Title>
          <Role>{t('aboutMe.role')}</Role>
          <Summary>{t('aboutMe.summary')}</Summary>
        </Hero>

        <KeywordSection>
          <SectionTitle>{t('aboutMe.keywordsTitle')}</SectionTitle>
          <KeywordList>
            {keywordKeys.map(keywordKey => (
              <Keyword
                key={keywordKey}
                type="button"
                data-tooltip={t(`aboutMe.keywords.${keywordKey}.description`)}
                aria-label={`${t(`aboutMe.keywords.${keywordKey}.label`)}: ${t(`aboutMe.keywords.${keywordKey}.description`)}`}
              >
                {t(`aboutMe.keywords.${keywordKey}.label`)}
              </Keyword>
            ))}
          </KeywordList>
        </KeywordSection>

        <SectionList>
          {sectionKeys.map(sectionKey => (
            <TextSection key={sectionKey}>
              <SectionTitle>{t(`aboutMe.sections.${sectionKey}.title`)}</SectionTitle>
              <SectionBody>{t(`aboutMe.sections.${sectionKey}.body`)}</SectionBody>
            </TextSection>
          ))}
        </SectionList>

        <ContactPanel>
          <SectionTitle>{t('aboutMe.contactTitle')}</SectionTitle>
          <ContactIntro>{t('aboutMe.contactIntro')}</ContactIntro>
          <ContactActions>
            <ContactLink href={`mailto:${contact.email}`}>{t('aboutMe.email')}</ContactLink>
            <ContactLink href={contact.githubUrl} target="_blank" rel="noreferrer">
              {t('aboutMe.github')}
            </ContactLink>
            <ContactLink href={contact.linkedinUrl} target="_blank" rel="noreferrer">
              {t('aboutMe.linkedin')}
            </ContactLink>
          </ContactActions>
        </ContactPanel>
      </Document>
    </Wrapper>
  );
};

export default AboutMe;
