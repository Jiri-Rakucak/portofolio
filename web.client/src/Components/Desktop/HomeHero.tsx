import { useTranslation } from 'react-i18next';
import { ArrowRight } from '../Icons/Arrows';
import TerminalIcon from '../Icons/Terminal';
import HeroScene from './HeroScene';
import { Hero, HeroInner, HeroCopy, Identity, Role, Intro, Actions, PrimaryLink, SecondaryLink } from './HomeHero.styles';

export default function HomeHero() {
  const { t } = useTranslation('common');

  return (
    <Hero>
      <HeroScene />
      <HeroInner>
        <HeroCopy>
          <Role>{t('home.heroSubtitle')}</Role>
          <Identity>{t('home.heroTitle')}</Identity>
          <Intro>{t('home.heroIntro')}</Intro>
          <Actions>
            <PrimaryLink to="/projects" viewTransition>
              {t('home.exploreProjects')} <ArrowRight size={16} />
            </PrimaryLink>
            <SecondaryLink to="/devos">
              <TerminalIcon size={18} /> {t('home.launchDevos')}
            </SecondaryLink>
          </Actions>
        </HeroCopy>
      </HeroInner>
    </Hero>
  );
}
