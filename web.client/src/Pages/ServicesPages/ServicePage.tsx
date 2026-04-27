import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from '../../Components/Shared/Typography';
import { ContactForm, LoginForm, SignUpForm } from '../../Components/Shared/Forms';

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
    padding: 6rem 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const HeroTitleWrapper = styled.div`
    view-transition-name: title-services;
    width: fit-content;
    display: inline-block;
`;

const ContentWrapper = styled.div`
    margin: 0 auto;
    padding: 4rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};

    clip-path: polygon(0 0, 100% 15vw, 100% 100%, 0 100%);
    
    margin-top: -2vw;
    
    padding-top: calc(10vw + 4rem);
    padding-bottom: 6rem;
    padding-left: 2rem;
    padding-right: 2rem;
`;

const Section = styled.section`
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Description = styled.div`
    margin-top: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const HeroHighlights = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2.5rem;
    justify-content: center;
`;

const HighlightPill = styled.span`
    padding: 0.5rem 1.4rem;
    border-radius: 999px;
    font-size: 0.9rem;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
`;

const SectionHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const ServiceGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    margin-top: 2rem;
`;

const ServiceItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.75rem;
    border-left: 4px solid ${({ theme }) => theme.colors.accent || '#667eea'};
    box-shadow: ${({ theme }) => theme.shadows?.sm || 'none'};
`;

const ServiceTop = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const Marker = styled.span`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
`;

const ServiceDescription = styled(Text).attrs({ variant: 'bodyS' })`
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const TagRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
`;

const Tag = styled.span`
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const ServiceLink = styled(Link)`
    margin-top: 1rem;
    align-self: flex-start;
    padding: 0.55rem 1.4rem;
    border-radius: 999px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    transition: all 0.2s ease;
    font-weight: 600;

    &:hover {
        background: ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.background};
        transform: translateY(-1px);
    }
`;

const Divider = styled.hr`
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border || 'rgba(255,255,255,0.1)'};
    margin: 0;
    width: 100%;
    max-width: 900px;
`;

const QuestionStrip = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
`;

const QuestionCard = styled.div`
    padding: 1.25rem 1.5rem;
    border-radius: 16px;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.95rem;
`;

const services = [
    {
        title: 'Web Development',
        description: 'Modern web apps, marketing sites, and bespoke portals with performance-first mindset.',
        tags: ['React', 'TypeScript', 'CMS'],
        url: '/Services/FrontendDevelopment'
    },
    {
        title: 'Unity Development',
        description: 'Prototyping, gameplay systems and technical art for Unity projects and interactive demos.',
        tags: ['Unity', 'C#', 'XR'],
        url: '/Services/GameAnd3DGraphics'
    },
    {
        title: '3D Design & Modeling',
        description: 'Product mockups, stylized assets and 3D storytelling for web or realtime experiences.',
        tags: ['Blender', 'Texturing', 'Rendering'],
        url: '/Services/GameAnd3DGraphics'
    },
    {
        title: 'UI/UX Design',
        description: 'Design systems, high-fidelity prototypes and user testing to shape intuitive interfaces.',
        tags: ['Design Systems', 'Figma', 'Prototype'],
        url: '/Services/FrontendDevelopment'
    },
    {
        title: 'Consulting',
        description: 'Audits, roadmaps and team mentoring to help you ship faster with confidence.',
        tags: ['Workshops', 'Architecture', 'Mentoring'],
        url: '/Services/BackendAndSystems'
    }
];

export default function ServicePage() {
    return (
        <Container>
            <HeroSection>
                <Text variant="h1">What do you need?</Text>
                <Description>
                    <Text variant="h3">
                        A simple directory of everything I can help you with. Pick a track and the site will guide you to deeper details.
                    </Text>
                </Description>

                <HeroHighlights>
                    <HighlightPill>Single founder friendly</HighlightPill>
                    <HighlightPill>Studio-scale delivery</HighlightPill>
                    <HighlightPill>Hands-on collaboration</HighlightPill>
                </HeroHighlights>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <SectionHeader>
                        <Text variant="h2">Choose your lane</Text>
                        <Text variant="bodyS">
                            These tracks mirror the Services section in the footer and route you to the detailed breakdowns.
                        </Text>
                    </SectionHeader>

                    <ServiceGrid>
                        {services.map(service => (
                            <ServiceItem key={service.title}>
                                <ServiceTop>
                                    <Marker />
                                    <Text variant="h3">{service.title}</Text>
                                </ServiceTop>

                                <ServiceDescription>
                                    {service.description}
                                </ServiceDescription>

                                <TagRow>
                                    {service.tags.map(tag => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))}
                                </TagRow>

                                <ServiceLink to={service.url} viewTransition>Explore details</ServiceLink>
                            </ServiceItem>
                        ))}
                    </ServiceGrid>
                </Section>

                <Divider />

                <Section>
                    <SectionHeader>
                        <Text variant="h2">Not sure yet?</Text>
                        <Text variant="bodyS">
                            Start with a quick question to point us in the right direction.
                        </Text>
                    </SectionHeader>

                    <QuestionStrip>
                        <QuestionCard>Need a single powerful landing page?</QuestionCard>
                        <QuestionCard>Building an interactive concept for investors?</QuestionCard>
                        <QuestionCard>Want to refresh your design system?</QuestionCard>
                        <QuestionCard>Looking for tech guidance for your internal team?</QuestionCard>
                    </QuestionStrip>
                </Section>

                <Divider />
                <ContactForm/>
                <LoginForm/>
                <SignUpForm/>
            </ContentWrapper>
        </Container>
    );
}