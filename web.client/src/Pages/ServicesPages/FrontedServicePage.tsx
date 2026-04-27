import styled from 'styled-components';
import Text from '../../Components/Shared/Typography';
import { Link } from 'react-router-dom';

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

const HeroTitleWrapper = styled.div`
    view-transition-name: title-frontend-development;
    
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
    
    /* Posuneme celou sekci nahoru, aby překryla bílé místo a navázala na Hero */
    margin-top: -2vw;
    
    /* Vnitřní odsazení, aby text nebyl uříznutý (21vw + extra místo) */
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

export default function FrontedServicePage() {
    return (
        <Container>
            <HeroSection>
                <HeroTitleWrapper>
                    <Text variant="h1">Frontend Development</Text>
                </HeroTitleWrapper>
                <Description>
                    <Text variant="h3">
                        Creating modern, responsive, and interactive web experiences with a focus on performance and usability.
                    </Text>
                </Description>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">Our Philosophy</Text>
                    <Text variant="bodyL">
                        We craft digital experiences that are not just visually stunning but also highly functional and accessible. 
                        By leveraging the latest frontend technologies, we ensure your application is fast, responsive across all devices, 
                        and provides an intuitive user journey that drives engagement.
                    </Text>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Key Capabilities</Text>
                    <StyledList>
                        <ListItem>
                            <Text variant="h4">SPA & Frameworks</Text>
                            <Text variant="bodyS">
                                Architecting complex single-page applications using modern React patterns, hooks, and state management for seamless user experiences.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">UI/UX Implementation</Text>
                            <Text variant="bodyS">
                                Translating designs into pixel-perfect, responsive interfaces with smooth animations and interactions using tools like Styled Components and Framer Motion.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Performance Optimization</Text>
                            <Text variant="bodyS">
                                Optimizing loading times, Core Web Vitals, and rendering performance to ensure your application runs smoothly on any device.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">3D & Interactive Web</Text>
                            <Text variant="bodyS">
                                Building immersive 3D experiences and visualizations directly in the browser using WebGL and Three.js technologies.
                            </Text>
                        </ListItem>
                    </StyledList>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Technology Stack</Text>
                    <Text variant="bodyS">
                        We utilize a modern and robust stack to build scalable frontend solutions.
                    </Text>
                    <TechContainer>
                        <TechBadge>React</TechBadge>
                        <TechBadge>TypeScript</TechBadge>
                        <TechBadge>Vite</TechBadge>
                        <TechBadge>Three.js</TechBadge>
                        <TechBadge>Styled Components</TechBadge>
                        <TechBadge>Framer Motion</TechBadge>
                        <TechBadge>Redux / Zustand</TechBadge>
                        <TechBadge>React Query</TechBadge>
                    </TechContainer>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Backend & Systems</Text>
                    <Text variant="bodyM">
                        While our primary focus is on frontend development, we also offer comprehensive backend services to ensure your application is fully functional and secure. 
                    </Text>
                    <Text variant="bodyM">
                        Our backend solutions include API development, database management, authentication systems, and server-side logic using technologies like Node.js, Express, and SQL/NoSQL databases.
                    </Text>
                    <span style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <ServiceLink to="/Services/BackendAndSystems" viewTransition>Learn More</ServiceLink> <ServiceLink to="/Services" viewTransition>Explore Services</ServiceLink><ServiceLink to="/Services/UXUIDesign" viewTransition>UX UI Services</ServiceLink>                                          
                    </span>
                    
                </Section>
            </ContentWrapper>
        </Container>
    );
}