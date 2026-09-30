import { lazy, Suspense } from "react";
import { Card } from "./Card";
import { LaunchButton } from "./LaunchButton";
import styled from "styled-components";
import Text from "../Shared/Typography";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { getFeaturedServices } from "../../content/services";
import { useLocale } from "../../i18n/useLocale";

const AtomScene = lazy(() => import("./AtomScene"));

const Container = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`;

const StyledMain = styled.main`
  margin: 0 auto;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSectionBg = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0;
  margin: 0;
`;

const StyledHeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: 1.5rem;
  min-height: 574px;
  max-width: 1264px;
  width: 100%;
  padding: 0 2rem;
`;

const AtomSceneFallback = styled.div`
  height: 550px;
  width: 100%;
  max-width: 1000px;
`;

const HeroText = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-bottom: 4rem;
  max-width: 90%;
`;

const CardSection = styled.section`
  padding: 2rem;
  padding-top: 1.5rem;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardGrid = styled.div`
  display: grid;
  max-width: 1264px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    .cardGrid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`;

const SecondaryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  text-decoration: underline;
  z-index: 10;
  &:hover {
    color: ${({ theme }) => theme.colors.accent}CC;
  }
`;

const StyledInfoSection = styled.section`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};

  clip-path: polygon(0 0, 100% 15vw, 100% 100%, 0 100%);
  margin-top: -10vw;
  padding-top: calc(10vw + 4rem);
  padding-bottom: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 5;
`;

const InfoContent = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default function DesktopHomeLayout() {
  const { t } = useTranslation("common");
  const { locale } = useLocale();
  const featuredServices = getFeaturedServices(locale);

  return (
    <Container>
      <StyledMain>
        <StyledSectionBg>
          <StyledHeroSection>
            <Suspense fallback={<AtomSceneFallback />}>
              <AtomScene />
            </Suspense>
            <HeroText>
              <Text variant="h1">{t("home.heroTitle")}</Text>
              <Text variant="h2">{t("home.heroSubtitle")}</Text>
            </HeroText>
            <LaunchButton to="/devos" text={t("home.launchDevos")} />
            <SecondaryLink to="/services" viewTransition>
              <Text variant="bodyM">{t("home.exploreServices")}</Text>
            </SecondaryLink>
          </StyledHeroSection>

          <StyledInfoSection>
            <InfoContent>
              <Text variant="h2">{t("home.servicesTitle")}</Text>
              <Text variant="bodyL">{t("home.servicesDescription")}</Text>
            </InfoContent>
          </StyledInfoSection>

          <CardSection>
            <CardGrid>
              {featuredServices.map((service) => (
                <Card
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  technologies={service.technologies}
                  gradient={service.gradient}
                  url={service.route}
                  viewTransitionName={service.viewTransitionName}
                />
              ))}
            </CardGrid>
          </CardSection>
        </StyledSectionBg>
      </StyledMain>
    </Container>
  );
}
