import { useTranslation } from 'react-i18next';
import { getHomeProjects, getProjectStatusLabels } from '../../content/projects';
import { useLocale } from '../../i18n/useLocale';
import { projectGradients, fallbackGradient } from '../../styles/projectMedia';
import { ArrowRight } from '../Icons/Arrows';
import {
  ProjectsSection, SectionInner, SectionHeading, HeadingCopy, SectionTitle, Copy,
  TextLink, ProjectList, ProjectRow, MediaLink, ProjectImage, ProjectCopy,
  ProjectMeta, ProjectTitle, ProjectStack,
} from './HomeSections.styles';

export default function HomeProjects() {
  const { t } = useTranslation('common');
  const { locale } = useLocale();
  const projects = getHomeProjects(locale);
  const statusLabels = getProjectStatusLabels(locale);

  return (
    <ProjectsSection aria-labelledby="home-projects-title">
      <SectionInner>
        <SectionHeading>
          <HeadingCopy>
            <SectionTitle id="home-projects-title">{t('home.projectsTitle')}</SectionTitle>
            <Copy>{t('home.projectsDescription')}</Copy>
          </HeadingCopy>
          <TextLink to="/projects" viewTransition>
            {t('home.allProjects')} <ArrowRight size={18} />
          </TextLink>
        </SectionHeading>
        <ProjectList>
          {projects.map(project => {
            const path = `/projects/${project.id}`;
            return (
              <ProjectRow key={project.id} aria-labelledby={`home-project-${project.id}`}>
                <MediaLink to={path} viewTransition
                  aria-label={t('home.projectDetail', { name: project.name })}
                  $gradient={projectGradients[project.id] ?? fallbackGradient}>
                  {project.cover?.src.trim() && (
                    <ProjectImage src={project.cover.src} alt={project.cover.alt} fit="cover" />
                  )}
                </MediaLink>
                <ProjectCopy>
                  <ProjectMeta><span>{project.category}</span><span>{statusLabels[project.status]}</span></ProjectMeta>
                  <ProjectTitle id={`home-project-${project.id}`}>{project.name}</ProjectTitle>
                  <Copy>{project.shortDescription}</Copy>
                  <ProjectStack aria-label={t('projectsPage.technologiesTitle')}>
                    {project.technologies.slice(0, 4).map(technology => <li key={technology}>{technology}</li>)}
                  </ProjectStack>
                  <TextLink to={path} viewTransition aria-label={t('home.projectDetail', { name: project.name })}>
                    {t('projectsPage.viewDetail')} <ArrowRight size={18} />
                  </TextLink>
                </ProjectCopy>
              </ProjectRow>
            );
          })}
        </ProjectList>
        {projects.length === 0 && <Copy>{t('projectsPage.empty')}</Copy>}
      </SectionInner>
    </ProjectsSection>
  );
}
