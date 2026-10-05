import styled from 'styled-components';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import Text from '../../Components/Shared/Typography';
import { getServices } from '../../content/services';
import { useLocale } from '../../i18n/useLocale';
import { contact } from '../../content/contact';
import { angledSection } from '../../styles/angledSection';

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
    padding: 5.5rem 2rem 3.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Description = styled.div`
    margin-top: 1.15rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeroHighlights = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 1.8rem;
    justify-content: center;
`;

const HighlightPill = styled.span`
    padding: 0.45rem 1.1rem;
    border-radius: 999px;
    font-size: 0.86rem;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled.div`
    ${angledSection}
    padding: calc(var(--section-cut) + 3rem) 2rem 4.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3.2rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Section = styled.section`
    width: 100%;
    max-width: 920px;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
`;

const SectionHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
`;

const ServiceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    margin-top: 1rem;
`;

const ServiceItem = styled.article`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.25rem;
    align-items: start;
    padding: 1.15rem 0 1.15rem 1.35rem;
    border-left: 3px solid ${({ theme }) => theme.colors.accent};

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

const ServiceText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
`;

const TitleRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
`;

const ServiceIndex = styled.span`
    color: ${({ theme }) => theme.colors.accent};
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.76rem;
    font-weight: 800;
`;

const ServiceDescription = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.55;
`;

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Tag = styled.span`
    padding: 0.32rem 0.75rem;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const ServiceLink = styled(Link)`
    margin-top: 0.2rem;
    align-self: start;
    padding: 0.54rem 1.15rem;
    border-radius: 999px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    transition: all 0.2s ease;
    font-weight: 700;
    white-space: nowrap;

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

const QuestionStrip = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 0.8rem;
    margin-top: 1rem;
`;

const QuestionCard = styled.div`
    padding: 1rem 1.15rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.92rem;
    line-height: 1.5;
`;

const ContactPanel = styled.section`
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding: 1.5rem 0 0 1.35rem;
    border-left: 3px solid ${({ theme }) => theme.colors.accent};
`;

const ContactActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.2rem;
`;

const ContactLink = styled.a`
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.colors.accent};
    font-weight: 700;

    &:hover {
        opacity: 0.9;
    }
`;

const SecondaryContactLink = styled.a`
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-weight: 700;

    &:hover {
        border-color: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
    }
`;

const highlightIndexes = [0, 1, 2];
const questionIndexes = [0, 1, 2, 3];

export default function ServicePage() {
    const { t } = useTranslation('common');
    const { locale } = useLocale();
    const services = getServices(locale);

    return (
        <Container>
            <HeroSection>
                <Text variant="h1">{t('servicesPage.title')}</Text>
                <Description>
                    <Text variant="h3">{t('servicesPage.description')}</Text>
                </Description>

                <HeroHighlights>
                    {highlightIndexes.map(index => (
                        <HighlightPill key={index}>{t(`servicesPage.highlights.${index}`)}</HighlightPill>
                    ))}
                </HeroHighlights>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <SectionHeader>
                        <Text variant="h2">{t('servicesPage.laneTitle')}</Text>
                        <Text variant="bodyS">{t('servicesPage.laneDescription')}</Text>
                    </SectionHeader>

                    <ServiceList>
                        {services.map((service, index) => (
                            <ServiceItem key={service.id}>
                                <ServiceText style={{ viewTransitionName: service.viewTransitionName }}>
                                    <TitleRow>
                                        <ServiceIndex>{String(index + 1).padStart(2, '0')}</ServiceIndex>
                                        <Text variant="h3">{service.title}</Text>
                                    </TitleRow>

                                    <ServiceDescription>{service.description}</ServiceDescription>

                                    <TagRow>
                                        {service.tags.map(tag => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))}
                                    </TagRow>
                                </ServiceText>

                                <ServiceLink to={service.route} viewTransition>
                                    {t('servicesPage.exploreDetails')}
                                </ServiceLink>
                            </ServiceItem>
                        ))}
                    </ServiceList>
                </Section>

                <Divider />

                <Section>
                    <SectionHeader>
                        <Text variant="h2">{t('servicesPage.notSureTitle')}</Text>
                        <Text variant="bodyS">{t('servicesPage.notSureDescription')}</Text>
                    </SectionHeader>

                    <QuestionStrip>
                        {questionIndexes.map(index => (
                            <QuestionCard key={index}>{t(`servicesPage.questions.${index}`)}</QuestionCard>
                        ))}
                    </QuestionStrip>
                </Section>

                <Divider />

                <ContactPanel>
                    <Text variant="h2">{t('servicesPage.contactTitle')}</Text>
                    <Text variant="bodyS">{t('servicesPage.contactDescription')}</Text>
                    <ContactActions>
                        <ContactLink href={`mailto:${contact.email}`}>{t('servicesPage.email')}</ContactLink>
                        <SecondaryContactLink href={contact.githubUrl} target="_blank" rel="noreferrer">
                            GitHub
                        </SecondaryContactLink>
                        <SecondaryContactLink href={contact.linkedinUrl} target="_blank" rel="noreferrer">
                            LinkedIn
                        </SecondaryContactLink>
                    </ContactActions>
                </ContactPanel>
            </ContentWrapper>
        </Container>
    );
}
