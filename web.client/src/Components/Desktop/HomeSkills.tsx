import { useTranslation } from 'react-i18next';
import { getFeaturedServices } from '../../content/services';
import { useLocale } from '../../i18n/useLocale';
import { ArrowRight } from '../Icons/Arrows';
import {
  SkillsSection, SkillsLayout, SkillsIntro, SectionTitle, Copy, TextLink,
  SkillList, SkillItem, SkillLink, SkillDescription,
} from './HomeSections.styles';

export default function HomeSkills() {
  const { t } = useTranslation('common');
  const { locale } = useLocale();
  const services = getFeaturedServices(locale);

  return (
    <SkillsSection aria-labelledby="home-skills-title">
      <SkillsLayout>
        <SkillsIntro>
          <SectionTitle id="home-skills-title">{t('home.servicesTitle')}</SectionTitle>
          <Copy>{t('home.servicesDescription')}</Copy>
          <TextLink to="/services" viewTransition>
            {t('home.exploreSkills')} <ArrowRight size={18} />
          </TextLink>
        </SkillsIntro>
        <SkillList>
          {services.map(service => (
            <SkillItem key={service.id}>
              <SkillLink to={service.route} viewTransition>
                {service.title} <ArrowRight size={18} />
              </SkillLink>
              <SkillDescription>{service.description}</SkillDescription>
            </SkillItem>
          ))}
        </SkillList>
      </SkillsLayout>
    </SkillsSection>
  );
}
