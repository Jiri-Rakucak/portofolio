import { Card } from "./Card";
import HomeHero from './HomeHero';
import styled from "styled-components";
import Text from "../Shared/Typography";
import { useTranslation } from "react-i18next";
import { getFeaturedServices } from "../../content/services";
import { useLocale } from "../../i18n/useLocale";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

const StyledMain = styled.div`
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

const StyledInfoSection = styled.section`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text};

  clip-path: polygon(0 0, 100% 48px, 100% 100%, 0 100%);
  margin-top: -48px;
  padding-top: calc(48px + 3rem);
  padding-bottom: 3rem;
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
          <HomeHero />

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
