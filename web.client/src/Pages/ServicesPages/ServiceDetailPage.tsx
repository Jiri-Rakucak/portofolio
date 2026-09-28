import styled from 'styled-components';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Text from '../../Components/Shared/Typography';
import { getServiceById } from '../../content/services';
import { useLocale } from '../../i18n/useLocale';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
`;

const HeroSection = styled.section`
    padding: 6rem 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const HeroTitleWrapper = styled.div<{ $viewTransitionName: string }>`
    view-transition-name: ${({ $viewTransitionName }) => $viewTransitionName};
    width: fit-content;
    display: inline-block;
`;

const Description = styled.div`
    margin-top: 1.5rem;
    max-width: 820px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    justify-content: center;
    margin-top: 2rem;
`;

const Tag = styled.span`
    padding: 0.45rem 1rem;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.surface};
    font-size: 0.84rem;
`;

const ContentWrapper = styled.div`
    margin: -2vw auto 0;
    padding: calc(10vw + 4rem) 2rem 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4.5rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    clip-path: polygon(0 0, 100% 15vw, 100% 100%, 0 100%);
`;

const Section = styled.section`
    max-width: 900px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const BodyCopy = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CapabilityList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const CapabilityItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-left: 1.5rem;
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
`;

const StackContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
`;

const StackBadge = styled.span`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.6rem 1.1rem;
    border-radius: 6px;
    font-size: 0.92rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RelatedActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 0.5rem;
`;

const ServiceLink = styled(Link)`
    padding: 0.6rem 1.3rem;
    border-radius: 999px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    transition: all 0.2s ease;
    font-weight: 700;

    &:hover {
        background: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.background};
        transform: translateY(-1px);
    }
`;

const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin: 0;
    width: 100%;
    max-width: 900px;
`;

const EmptyState = styled.div`
    padding: 8rem 2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
`;

type ServiceDetailPageProps = {
    serviceId: string;
};

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
    const { t } = useTranslation('common');
    const { locale } = useLocale();
    const service = getServiceById(serviceId, locale);

    if (!service) {
        return (
            <Container>
                <EmptyState>{t('servicesPage.serviceNotFound')}</EmptyState>
            </Container>
        );
    }

    return (
        <Container>
            <HeroSection>
                <HeroTitleWrapper $viewTransitionName={service.viewTransitionName}>
                    <Text variant="h1">{service.detail.title}</Text>
                </HeroTitleWrapper>
                <Description>
                    <Text variant="h3">{service.detail.subtitle}</Text>
                </Description>
                <TagRow>
                    {service.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </TagRow>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">{service.detail.introTitle}</Text>
                    <BodyCopy>
                        {service.detail.introBody.map(paragraph => (
                            <Text key={paragraph} variant="bodyL">{paragraph}</Text>
                        ))}
                    </BodyCopy>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">{service.detail.capabilitiesTitle}</Text>
                    <CapabilityList>
                        {service.detail.capabilities.map(capability => (
                            <CapabilityItem key={capability.title}>
                                <Text variant="h4">{capability.title}</Text>
                                <Text variant="bodyS">{capability.description}</Text>
                            </CapabilityItem>
                        ))}
                    </CapabilityList>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">{service.detail.stackTitle}</Text>
                    <Text variant="bodyS">{service.detail.stackDescription}</Text>
                    <StackContainer>
                        {service.detail.stack.map(technology => (
                            <StackBadge key={technology}>{technology}</StackBadge>
                        ))}
                    </StackContainer>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">{service.detail.relatedTitle}</Text>
                    <Text variant="bodyS">{service.detail.relatedDescription}</Text>
                    <RelatedActions>
                        {service.detail.relatedLinks.map(link => (
                            <ServiceLink key={link.route} to={link.route} viewTransition>
                                {link.label}
                            </ServiceLink>
                        ))}
                    </RelatedActions>
                </Section>
            </ContentWrapper>
        </Container>
    );
}
