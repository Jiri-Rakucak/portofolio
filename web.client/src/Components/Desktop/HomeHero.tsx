import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from '../Icons/Arrows';
import TerminalIcon from '../Icons/Terminal';
import HeroScene from './HeroScene';
import { Hero, HeroInner, HeroCopy, Identity, Role, Intro, Actions } from './HomeHero.styles';
import { PrimaryLink, TextLink } from '../Shared/Actions';
import { useBreakpoint } from '../../Hooks/useBreakpoint';

export default function HomeHero() {
  const { t } = useTranslation('common');
  const pointerSource = useRef<HTMLElement>(null);
  const isCompact = useBreakpoint(1001);

  return (
    <Hero ref={pointerSource}>
      {!isCompact && <HeroScene pointerSource={pointerSource} />}
      <HeroInner>
        <HeroCopy>
          <Role>{t('home.heroSubtitle')}</Role>
          <Identity>{t('home.heroTitle')}</Identity>
          <Intro>{t('home.heroIntro')}</Intro>
          <Actions>
            <PrimaryLink to="/projects">
              {t('home.exploreProjects')} <ArrowRight size={16} />
            </PrimaryLink>
            <TextLink to="/devos" viewTransition={false}>
              <TerminalIcon size={18} /> {t('home.launchDevos')}
            </TextLink>
          </Actions>
        </HeroCopy>
      </HeroInner>
    </Hero>
  );
}
