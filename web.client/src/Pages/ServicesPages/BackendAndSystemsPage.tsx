import styled from 'styled-components';
import Text from '../../Components/Shared/Typography';
import { Link } from 'react-router';

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
    view-transition-name: title-backend-and-systems;    
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
    gap: 5rem; /* Větší mezery mezi sekcemi */
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
    border-left: 4px solid ${({ theme }) => theme.colors.accent || '#4facfe'};
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
        border-color: ${({ theme }) => theme.colors.accent || '#4facfe'};
        color: ${({ theme }) => theme.colors.accent || '#4facfe'};
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

export default function BackendAndSystemsPage() {
    return (
        <Container>
            <HeroSection>
                <HeroTitleWrapper>
                     <Text variant="h1">Backend & Systems</Text>
                </HeroTitleWrapper>
                <Description>
                    <Text variant="h3">
                        Robust server-side solutions, scalable architectures, and high-performance database management.
                    </Text>
                </Description>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">Our Approach</Text>
                    <Text variant="bodyL">
                        We believe that a strong backend is the backbone of any successful application. 
                        Our focus is on building systems that are not only functional but also secure, 
                        scalable, and easy to maintain. We utilize modern architectural patterns 
                        to ensure your infrastructure can grow with your business.
                    </Text>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Core Services</Text>
                    <StyledList>
                        <ListItem>
                            <Text variant="h4">API Development</Text>
                            <Text variant="bodyS">
                                Designing and implementing RESTful and GraphQL APIs that serve as reliable communication bridges between your data and user interfaces.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Database Architecture</Text>
                            <Text variant="bodyS">
                                Modeling complex data structures and optimizing queries for SQL and NoSQL databases to ensure data integrity and fast retrieval.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Cloud Infrastructure</Text>
                            <Text variant="bodyS">
                                Deploying and managing applications on cloud platforms like Azure or AWS, utilizing serverless functions and containerization.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">System Integration</Text>
                            <Text variant="bodyS">
                                Connecting disparate systems and third-party services to create a unified and efficient workflow for your business operations.
                            </Text>
                        </ListItem>
                    </StyledList>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Technology Stack</Text>
                    <Text variant="bodyS">
                        We choose the right tools for the job, prioritizing performance and long-term support.
                    </Text>
                    <TechContainer>
                        <TechBadge>C# / .NET</TechBadge>
                        <TechBadge>Node.js</TechBadge>
                        <TechBadge>SQL Server</TechBadge>
                        <TechBadge>PostgreSQL</TechBadge>
                        <TechBadge>Docker</TechBadge>
                        <TechBadge>Azure</TechBadge>
                        <TechBadge>Redis</TechBadge>
                        <TechBadge>Kafka</TechBadge>
                    </TechContainer>
                </Section>
                <Divider />
            
                <Section>
                    <Text variant="h2">Frontend Development</Text>
                    <Text variant="bodyM">
                        While our primary focus is on frontend development, we also offer comprehensive backend services to ensure your application is fully functional and secure. 
                    </Text>
                    <Text variant="bodyM">
                        We provide fullstack solutions that include API development, database management, authentication systems, and server-side logic using technologies like Node.js, Express, and SQL/NoSQL databases.
                    </Text>
                    <span style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <ServiceLink to="/Services/FrontendDevelopment" viewTransition>Learn More</ServiceLink> <ServiceLink to="/Services" viewTransition>Explore Services</ServiceLink>
                    </span>
                    
                </Section>
            </ContentWrapper>
        </Container>
    );
}