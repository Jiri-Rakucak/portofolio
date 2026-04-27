import React from 'react';
import styled from 'styled-components';
import GitHubIcon from '../Icons/Github';
import Text from './Typography';
import { Link } from 'react-router';


const StyledFooter = styled.footer`
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
    padding: 60px 0 20px;
    margin-top: auto;

    @media (max-width: 480px) {
        padding: 40px 0 20px;
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 480px) {
        padding: 0 15px;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 40px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 30px;
    }
`;

const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.h4`
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    line-height: 1.5;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 30px;
        height: 2px;
        background: ${({ theme }) => theme.colors.accent};
    }
`;

const SectionDescription = styled.p`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.bodyS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyS.fontWeight};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 20px;
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 15px;

    @media (max-width: 480px) {
        justify-content: center;
    }
`;

const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    text-decoration: none;
    &:hover {
        background: ${({ theme }) => theme.colors.accent};
        color: #ffffff;
        transform: translateY(-2px);
    }
`;

const FooterList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    display: block;

    &:hover {
        color: ${({ theme }) => theme.colors.accent};
        transform: translateX(5px);
    }
`;

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const ContactLink = styled.a`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.bodyS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyS.fontWeight};
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
`;

const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
`;

const FooterBottomLinks = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const FooterBottomLink = styled.a`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.bodyXS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyXS.fontWeight};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
        color: ${({ theme }) => theme.colors.accent};
    }
`;

const CopyrightText = styled.p`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.typography.bodyXS.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyXS.fontWeight};
    color: ${({ theme }) => theme.colors.textMuted};
`;


const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <Container>
                <Content>
                    <StyledSection>
                        <SectionTitle>Jiří Rakučák</SectionTitle>
                        <SectionDescription>
                            Creative developer specializing in modern web applications, 
                            Unity development and 3D design. I combine technology with creativity.
                        </SectionDescription>
                        <SocialLinks>
                            <SocialLink href="https://github.com/jirirakucak" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon size={20} />
                            </SocialLink>
                            <SocialLink href="https://linkedin.com/in/jirirakucak" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </SocialLink>
                        </SocialLinks>
                    </StyledSection>

                    <StyledSection>
                        <SectionTitle>Services</SectionTitle>
                        <FooterList>
                            <li>
                                <FooterLink to="/Services/FrontendDevelopment" viewTransition>
                                    <Text variant="bodyS">Web Development</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="/Services/GameAnd3DGraphics" viewTransition>
                                    <Text variant="bodyS">Unity Development</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="/Services/GameAnd3DGraphics" viewTransition>
                                    <Text variant="bodyS">3D Design & Modeling</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="/Services/UXUIDesign" viewTransition>
                                    <Text variant="bodyS">UI/UX Design</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="/Services/Consulting" viewTransition>
                                    <Text variant="bodyS">Consulting</Text>
                                </FooterLink>
                            </li>
                        </FooterList>
                    </StyledSection>

                    <StyledSection>
                        <SectionTitle>Technologies</SectionTitle>
                        <FooterList>
                            <li>
                                <FooterLink to="#" viewTransition>
                                    <Text variant="bodyS">React & TypeScript</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="#" viewTransition>
                                    <Text variant="bodyS">Node.js & C#</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="#" viewTransition>
                                    <Text variant="bodyS">Unity & WebGL</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="#" viewTransition>
                                    <Text variant="bodyS">Blender & Three.js</Text>
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink to="#" viewTransition>
                                    <Text variant="bodyS">Database & APIs</Text>
                                </FooterLink>
                            </li>
                        </FooterList>
                    </StyledSection>
 
                    <StyledSection>
                        <SectionTitle>Kontakt</SectionTitle>
                        <ContactInfo>
                            <ContactItem>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                <ContactLink href="mailto:jiri@rakucak.cz">jiri@rakucak.cz</ContactLink>
                            </ContactItem>
                            <ContactItem>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                <ContactLink href="tel:+420123456789">+420 123 456 789</ContactLink>
                            </ContactItem>
                            <ContactItem>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <Text variant="bodyS">Praha, Česká republika</Text>
                            </ContactItem>
                        </ContactInfo>
                    </StyledSection>
                </Content>

                <FooterBottom>
                    <CopyrightText>&copy; 2025 Jiří Rakučák. Všechna práva vyhrazena.</CopyrightText>
                    <FooterBottomLinks>
                        <FooterBottomLink href="#">Ochrana soukromí</FooterBottomLink>
                        <FooterBottomLink href="#">Podmínky použití</FooterBottomLink>
                        <FooterBottomLink href="#">Sitemap</FooterBottomLink>
                    </FooterBottomLinks>
                </FooterBottom>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
