import AtomScene from './AtomScene';
import { Card } from './Card';
import {LaunchButton} from './LaunchButton';
import styled from 'styled-components';
import Text from '../Shared/Typography'
import { Link } from 'react-router-dom';

const Container = styled.div`
    background: ${({ theme }) => theme.colors.backgroundSecondary}/*linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)*/;
    color: ${({ theme }) => theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

const HeroText = styled.div`
    position: absolute;
    bottom: -40px;
    right: -160px;
    transform: translate(-50%, -50%);
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
    max-width: 1200px;
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
    background-color: ${({ theme }) => theme.colors.backgroundSecondary}; /* Tmavší pozadí */
    color: ${({ theme }) => theme.colors.text};
    
    /* Zkosení cca 12 stupňů (tan(12) ~= 0.21).
       Ořízneme vršek: Levý bod začíná níže (21vw), Pravý bod začíná nahoře (0). */
    clip-path: polygon(0 0, 100% 15vw, 100% 100%, 0 100%);
    
    /* Posuneme celou sekci nahoru, aby překryla bílé místo a navázala na Hero */
    margin-top: -10vw;
    
    /* Vnitřní odsazení, aby text nebyl uříznutý (21vw + extra místo) */
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

const toSlug = (text: string) => 
  `title-${text.toLowerCase()
    .replace(/&/g, 'and')       // Nahradí & za 'and'
    .replace(/[^a-z0-9]+/g, '-') // Všechno ostatní divné nahradí pomlčkou
    .replace(/^-+|-+$/g, '')}`;  // Ořízne pomlčky na začátku/konci

export default function DesktopHomeLayout() {
    const cards = [
        {
            title: "Frontend Development",
            description: "Creating modern, responsive web applications with cutting-edge technologies",
            technologies: [
                { name: "React", url: "https://react.dev/" },
                { name: "TypeScript", url: "https://www.typescriptlang.org/" },
                { name: "Vite", url: "https://vitejs.dev/" },
                { name: "Three.js", url: "https://threejs.org/" }
            ],
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            urlRedirect: "/Services/FrontendDevelopment"
        },
        {
            title: "Game & 3D Graphics",
            description: "Building interactive experiences and immersive 3D worlds",
            technologies: [
                { name: "Unity", url: "https://unity.com/" },
                { name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
                { name: "Blender", url: "https://www.blender.org/" },
                { name: "WebGL", url: "https://get.webgl.org/" }
            ],
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            urlRedirect: "/Services/GameAnd3DGraphics"
        },
        {
            title: "Backend & Systems",
            description: "Developing robust server-side solutions and database architectures",
            technologies: [
                { name: "Node.js", url: "https://nodejs.org/" },
                { name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
                { name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" },
                { name: "APIs", url: "https://restfulapi.net/" }
            ],
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            urlRedirect: "/Services/BackendAndSystems"
        }
    ];

    return (
        <Container>
            <StyledMain>
                <StyledSectionBg>
                    <StyledHeroSection>
                        <AtomScene />
                        <HeroText>
                            {/*<h1>Jiří Rakučák</h1> */}
                            {/*<h2>Web & Unity Design-Developer </h2> */}
                            <Text variant='h1'>DevOs</Text>
                            <Text variant='h2'>Web operation system</Text>
                        </HeroText>
                        <LaunchButton to="/DevOs" text="Launch DevOs"/>
                        <SecondaryLink to="/Services" viewTransition>
                            <Text variant="bodyM">Or Explore Services &rarr;</Text>
                        </SecondaryLink>
                    </StyledHeroSection>
                    
                    <StyledInfoSection>
                        <InfoContent>
                            <Text variant="h2">Comprehensive IT Services</Text>
                            <Text variant="bodyL">
                                I provide full-cycle development services ranging from responsive frontend interfaces 
                                to robust backend systems and immersive 3D experiences. 
                                Explore the specialized categories below to see how we can build your next project.
                            </Text>
                        </InfoContent>
                    </StyledInfoSection>

                    <CardSection>
                        <CardGrid>
                            {cards.map((card, index) => (
                                <Card 
                                    key={index}
                                    title={card.title}
                                    description={card.description}
                                    technologies={card.technologies}
                                    gradient={card.gradient}
                                    url={card.urlRedirect}
                                    viewTransitionName={toSlug(card.title)}
                                />
                            ))}
                        </CardGrid>
                    </CardSection>
                </StyledSectionBg>
            </StyledMain>
        </Container>
    );
}
