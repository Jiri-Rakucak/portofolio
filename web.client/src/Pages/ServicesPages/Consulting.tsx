import styled from 'styled-components';
import Text from '../../Components/Shared/Typography';

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
    background-color: ${({ theme }) => theme.colors.background};
    padding: 6rem 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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

const StyledList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-left: 1.5rem;
    border-left: 4px solid ${({ theme }) => theme.colors.accent || '#667eea'};
`;

const TechContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
`;

const TechBadge = styled.span`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    font-size: 0.95rem;
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(255,255,255,0.1)'};
    display: flex;
    align-items: center;
    
    &:hover {
        border-color: ${({ theme }) => theme.colors.accent || '#667eea'};
        color: ${({ theme }) => theme.colors.accent || '#667eea'};
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

export default function Consulting() {
    return (
        <Container>
            <HeroSection>
                <Text variant="h1">IT Consulting</Text>
                <Description>
                    <Text variant="h3">
                        Strategic guidance to navigate complex technology landscapes and drive digital transformation.
                    </Text>
                </Description>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">Strategic Partnership</Text>
                    <Text variant="bodyL">
                        We don't just offer advice; we partner with you to understand your unique business challenges. 
                        Our consulting services bridge the gap between technical possibilities and business goals, 
                        helping you make informed decisions that optimize processes and accelerate growth.
                    </Text>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Areas of Expertise</Text>
                    <StyledList>
                        <ListItem>
                            <Text variant="h4">Digital Transformation</Text>
                            <Text variant="bodyS">
                                Guiding organizations through the modernization of legacy systems and the adoption of cloud-native technologies.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Architecture Review</Text>
                            <Text variant="bodyS">
                                Analyzing existing software architecture to identify bottlenecks, security risks, and scalability issues.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Tech Stack Selection</Text>
                            <Text variant="bodyS">
                                Helping you choose the right tools and frameworks that align with your team's skills and long-term project requirements.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Process Optimization</Text>
                            <Text variant="bodyS">
                                Implementing Agile methodologies and DevOps practices to streamline development lifecycles and improve delivery speed.
                            </Text>
                        </ListItem>
                    </StyledList>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Focus Areas</Text>
                    <Text variant="bodyS">
                        Our consulting approach covers a broad spectrum of modern software engineering disciplines.
                    </Text>
                    <TechContainer>
                        <TechBadge>System Architecture</TechBadge>
                        <TechBadge>Cloud Strategy</TechBadge>
                        <TechBadge>DevOps Culture</TechBadge>
                        <TechBadge>Agile & Scrum</TechBadge>
                        <TechBadge>Security Audits</TechBadge>
                        <TechBadge>Scalability Planning</TechBadge>
                        <TechBadge>Team Mentoring</TechBadge>
                    </TechContainer>
                </Section>
            </ContentWrapper>
        </Container>
    );
}
