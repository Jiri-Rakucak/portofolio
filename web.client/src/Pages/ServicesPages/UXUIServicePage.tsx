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
    padding: 6rem 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const HeroTitleWrapper = styled.div`
    view-transition-name: title-ux-ui-design;    
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
    border-left: 4px solid ${({ theme }) => theme.colors.accent || '#f093fb'};
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
        border-color: ${({ theme }) => theme.colors.accent || '#f093fb'};
        color: ${({ theme }) => theme.colors.accent || '#f093fb'};
    }
`;

const Divider = styled.hr`
    max-width: 900px;
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border || 'rgba(255,255,255,0.1)'};
    margin: 0;
    width: 100%;
`;

export default function UXUIServicePage() {
    return (
        <Container>
            <HeroSection>
                <HeroTitleWrapper>
                    <Text variant="h1">User Interface and Experience Design</Text>
                </HeroTitleWrapper>
                <Description>
                    <Text variant="h3">
                    Designing intuitive and engaging user interfaces that enhance user experience and drive satisfaction.
                    </Text>
                </Description>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">Creative Vision</Text>
                    <Text variant="bodyL">
                        Our UX/UI design services focus on creating user-centric designs that are not only visually appealing but also highly functional. We prioritize user needs and behaviors to craft interfaces that facilitate seamless interactions and enhance overall user satisfaction.
                    </Text>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Services Offered</Text>
                    <StyledList>
                        <ListItem>
                            <Text variant="h4">User Research & Prototyping</Text>
                            <Text variant="bodyS">
                                Conducting user research, creating wireframes, and developing interactive prototypes to validate design concepts and improve usability.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Responsive Design</Text>
                            <Text variant="bodyS">
                                Designing responsive interfaces for web and mobile applications that ensure a consistent user experience across all devices.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Visual Design</Text>
                            <Text variant="bodyS">
                                Crafting visually appealing designs that align with brand identity and enhance user engagement through effective use of color, typography, and layout.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Usability Testing & Iteration+</Text>
                            <Text variant="bodyS">
                                Usability Testing & Iteration: Conducting usability tests to gather user feedback and iterating on designs to continuously improve the user experience.
                            </Text>
                        </ListItem>
                    </StyledList>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Tools & Technologies</Text>
                    <Text variant="bodyS">
                        We use industry-standard tools to ensure compatibility and top-tier quality.
                    </Text>
                    <TechContainer>
                        <TechBadge>Figma</TechBadge>
                        <TechBadge>Sketch</TechBadge>
                        <TechBadge>Adobe XD</TechBadge>
                        <TechBadge>InVision</TechBadge>
                        <TechBadge>Axure RP</TechBadge>
                        <TechBadge>Substance Painter</TechBadge>
                        <TechBadge>WebGL</TechBadge>
                        <TechBadge>HLSL / GLSL</TechBadge>
                    </TechContainer>
                </Section>
            </ContentWrapper>
        </Container>
    );
}