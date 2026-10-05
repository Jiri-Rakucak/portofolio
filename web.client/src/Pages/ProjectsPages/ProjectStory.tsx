import { useTranslation } from 'react-i18next';
import Text from '../../Components/Shared/Typography';
import type { ProjectCaseStudy } from '../../content/projects';
import { Section, StoryGrid, StoryBlock, BodyCopy, SubSection, HighlightList, HighlightItem } from './ProjectDetailPage.styles';

export default function ProjectStory({ caseStudy }: { caseStudy: ProjectCaseStudy }) {
  const { t } = useTranslation('common');

  return (
    <>
      <Section>
        <StoryGrid>
          <StoryBlock>
            <Text variant="h2" as="h2">{t('projectsPage.problemTitle')}</Text>
            <BodyCopy>{caseStudy.problem}</BodyCopy>
          </StoryBlock>
          <StoryBlock>
            <Text variant="h2" as="h2">{t('projectsPage.solutionTitle')}</Text>
            <BodyCopy>{caseStudy.solution}</BodyCopy>
          </StoryBlock>
          <StoryBlock>
            <Text variant="h2" as="h2">{t('projectsPage.outcomeTitle')}</Text>
            <BodyCopy>{caseStudy.outcome}</BodyCopy>
          </StoryBlock>
        </StoryGrid>
      </Section>
      {caseStudy.lessons.length > 0 && (
        <Section>
          <SubSection>
            <Text variant="h2" as="h2">{t('projectsPage.lessonsTitle')}</Text>
            <HighlightList>
              {caseStudy.lessons.map(lesson => <HighlightItem key={lesson}>{lesson}</HighlightItem>)}
            </HighlightList>
          </SubSection>
        </Section>
      )}
    </>
  );
}
