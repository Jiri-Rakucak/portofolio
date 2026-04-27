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
    view-transition-name: title-game-and-3d-graphics;
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
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.border || 'rgba(255,255,255,0.1)'};
    margin: 0;
    width: 100%;
    max-width: 900px;
`;

export default function GameAnd3DGraphicsPage() {
    return (
        <Container>
            <HeroSection>
                <HeroTitleWrapper>
                    <Text variant="h1">Game & 3D Graphics Development</Text>
                </HeroTitleWrapper>
                <Description>
                    <Text variant="h3">
                        Building immersive interactive experiences, virtual worlds, and high-fidelity 3D assets.
                    </Text>
                </Description>
            </HeroSection>

            <ContentWrapper>
                <Section>
                    <Text variant="h2">Creative Vision</Text>
                    <Text variant="bodyL">
                        We merge artistic creativity with technical precision to bring virtual worlds to life. 
                        Whether it's a full-scale game production, interactive simulation, or photorealistic 3D rendering, 
                        we focus on delivering engaging experiences that captivate users and tell compelling stories.
                    </Text>
                </Section>

                <Divider />

                <Section>
                    <Text variant="h2">Services Offered</Text>
                    <StyledList>
                        <ListItem>
                            <Text variant="h4">Game Development</Text>
                            <Text variant="bodyS">
                                Full-cycle game development using Unity and Unreal Engine, from prototyping and mechanics programming to final polish and optimization.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">3D Modeling & Animation</Text>
                            <Text variant="bodyS">
                                Creating high-quality 3D assets, characters, and environments in Blender, including rigging, texturing, and animation.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Interactive Simulations</Text>
                            <Text variant="bodyS">
                                Developing training simulations, architectural visualizations, and VR/AR experiences for enterprise and educational purposes.
                            </Text>
                        </ListItem>
                        <ListItem>
                            <Text variant="h4">Shader & VFX Programming</Text>
                            <Text variant="bodyS">
                                Writing custom shaders and creating visual effects to achieve unique art styles and enhance visual fidelity.
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
                        <TechBadge>Unity</TechBadge>
                        <TechBadge>Unreal Engine 5</TechBadge>
                        <TechBadge>C#</TechBadge>
                        <TechBadge>C++</TechBadge>
                        <TechBadge>Blender</TechBadge>
                        <TechBadge>Substance Painter</TechBadge>
                        <TechBadge>WebGL</TechBadge>
                        <TechBadge>HLSL / GLSL</TechBadge>
                    </TechContainer>
                </Section>
            </ContentWrapper>
        </Container>
    );
}