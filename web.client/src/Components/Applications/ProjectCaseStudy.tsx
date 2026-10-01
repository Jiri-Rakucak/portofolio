import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import type { ProjectCaseStudy as ProjectCaseStudyModel } from '../../content/projects';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const Summary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 12px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const StudyBlock = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 14px;
`;

const BlockTitle = styled.h4`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.82rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-weight: 700;
  text-transform: uppercase;
`;

const BlockText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

const Subsection = styled.div`
  display: grid;
  gap: 10px;
`;

const ItemList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;

  &::before {
    content: '';
    position: absolute;
    top: 0.72em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const NoteGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const Note = styled.article`
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: 12px;
`;

const NoteTitle = styled.h4`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.92rem;
`;

const AssetList = styled.div`
  display: grid;
  gap: 8px;
`;

const AssetItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 10px 12px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const AssetMeta = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const AssetType = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.76rem;
`;

const AssetLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AssetPlaceholder = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
`;

type ProjectCaseStudyProps = {
  caseStudy: ProjectCaseStudyModel;
};

export const ProjectCaseStudy = ({ caseStudy }: ProjectCaseStudyProps) => {
  const { t } = useTranslation('devos');
  const notes = caseStudy.sections ?? [];
  const assets = caseStudy.assets ?? [];

  return (
    <Wrapper>
      <Header>
        <Title>{t('projectWindow.caseStudy.title')}</Title>
        <Summary>{caseStudy.summary}</Summary>
      </Header>

      <StudyGrid>
        <StudyBlock>
          <BlockTitle>{t('projectWindow.caseStudy.problem')}</BlockTitle>
          <BlockText>{caseStudy.problem}</BlockText>
        </StudyBlock>
        <StudyBlock>
          <BlockTitle>{t('projectWindow.caseStudy.solution')}</BlockTitle>
          <BlockText>{caseStudy.solution}</BlockText>
        </StudyBlock>
        <StudyBlock>
          <BlockTitle>{t('projectWindow.caseStudy.outcome')}</BlockTitle>
          <BlockText>{caseStudy.outcome}</BlockText>
        </StudyBlock>
      </StudyGrid>

      <Subsection>
        <BlockTitle>{t('projectWindow.caseStudy.lessons')}</BlockTitle>
        <ItemList>
          {caseStudy.lessons.map(lesson => (
            <ListItem key={lesson}>{lesson}</ListItem>
          ))}
        </ItemList>
      </Subsection>

      {notes.length > 0 && (
        <Subsection>
          <BlockTitle>{t('projectWindow.caseStudy.additionalNotes')}</BlockTitle>
          <NoteGrid>
            {notes.map(note => (
              <Note key={note.title}>
                <NoteTitle>{note.title}</NoteTitle>
                <BlockText>{note.body}</BlockText>
              </Note>
            ))}
          </NoteGrid>
        </Subsection>
      )}

      {assets.length > 0 && (
        <Subsection>
          <BlockTitle>{t('projectWindow.caseStudy.assets')}</BlockTitle>
          <AssetList>
            {assets.map(asset => (
              <AssetItem key={`${asset.type}-${asset.label}`}>
                <AssetMeta>{asset.label}</AssetMeta>
                {asset.src ? (
                  <AssetLink href={asset.src} target="_blank" rel="noreferrer">
                    {asset.type}
                  </AssetLink>
                ) : (
                  <AssetPlaceholder>
                    {t('projectWindow.caseStudy.assetPending')} <AssetType>{asset.type}</AssetType>
                  </AssetPlaceholder>
                )}
              </AssetItem>
            ))}
          </AssetList>
        </Subsection>
      )}
    </Wrapper>
  );
};
