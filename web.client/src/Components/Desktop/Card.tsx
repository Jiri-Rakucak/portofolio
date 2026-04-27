import styled from "styled-components";
import { Link } from "react-router";

export interface Technology {
    name: string;
    url: string;
}
interface CardProps {
    title: string;
    description: string;
    technologies: Technology[];
    gradient: string;
    url?: string;
    viewTransitionName?: string;
}

const StyledCard = styled.div`
    position: relative;
    padding: 24px;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.background}33;
    backdrop-filter: blur(20px);
    border: 1px solid ${({ theme }) => theme.colors.accent}33;
    transition: all 0.3s ease;
    overflow: hidden;
    min-height: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* Efekt hoveru pro celou kartu */
    &:hover {
        transform: translateY(-5px);
        background: ${({ theme }) => theme.colors.backgroundSecondary}55;
        border-color: ${({ theme }) => theme.colors.accent};
        box-shadow: ${({ theme }) => theme.shadows.lg};
        color: ${({ theme }) => theme.colors.text};
    }
`;

// Odkaz přes celou kartu
const StretchedLink = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Nejnižší interaktivní vrstva */
    cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.spacing.medium};
    position: relative;
    z-index: 2; /* Obsah musí být nad pozadím, ale pod StretchedLink (pokud chceme klikat skrz text) */
    pointer-events: none; /* Důležité: Text neblokuje kliknutí na StretchedLink */
`;

const Title = styled.h4<{ $vtName?: string }>`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    line-height: 1.5;
    margin-bottom: 12px;
    padding-top: ${({ theme }) => theme.spacing.small};
    view-transition-name: ${({ $vtName }) => $vtName};
    width: fit-content;
`;

const Description = styled.p`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.bodyS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyS.fontWeight};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 20px;
    line-height: 1.6;
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    /* Důležité: Vrátíme interaktivitu pro kontejner tagů a zvedneme ho nad StretchedLink */
    pointer-events: auto; 
    z-index: 3; 
    position: relative;
`;

const TechTag = styled.a`
    padding: 4px 12px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 20px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;
    
    /* Zajištění, že je nad StretchedLink */
    position: relative;
    z-index: 4; 

    &:hover {
        background: ${({ theme }) => theme.colors.backgroundSecondary}20;
        transform: scale(1.05);
        color: ${({ theme }) => theme.colors.text};
    }
`;

const CardGlow = styled.div<{ gradient: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${({ gradient }) => gradient} 0%, transparent 70%);
    opacity: 0.1;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
`;

export const Card = ({ title, description, technologies, gradient, url, viewTransitionName }: CardProps) => {
    return (
        <StyledCard>
            {/* Hlavní odkaz přes celou kartu */}
            {url && <StretchedLink to={url} viewTransition />}
            
            <Content>
                <div>
                    <Title $vtName={viewTransitionName}>{title}</Title>
                    <Description>{description}</Description>
                </div>
                <TechStack>
                    {technologies.map((tech, index) => (
                        <TechTag 
                            key={index} 
                            href={`${tech.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {tech.name}
                        </TechTag>
                    ))}
                </TechStack>
            </Content>
            <CardGlow gradient={gradient} />
        </StyledCard>
    );
};
