import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LinkedInIcon from '../Icons/Linkedin';
import GitHubIcon from '../Icons/Github';
import SettingsIcon from '../Icons/Settings';
import MenuToggle from './MenuToggle';
import HomeIcon from '../Icons/Home';
import DashboardIcon from '../Icons/Dashboard';
import AdminIcon from '../Icons/Admin';
import Text from './Typography';
import Modal from './Modal';
import WebSettings from '../Settings/WebSettings';

const PlaceholderLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" fill="none" />
    <path d="M35 65 L50 35 L65 65" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StyledHeader = styled.header`
  width: 100%;
  background-color: transparent;
  
  /* ZMĚNA ZDE: sticky -> fixed */
  position: fixed; 
  left: 0; /* Ujistíme se, že je přilepená i zleva */
  
  z-index: 1000;
  pointer-events: none;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1264px;
  margin: 0 auto;
`;

const NavBg = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  pointer-events: auto;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.accent};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 0 0 10px 10px;
  padding: 1rem;
  position: relative;
  top: 0;
  z-index: 10;
  pointer-events: auto;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
  padding: 1rem;
  padding-top: 5rem;
  position: absolute;
  top: -100%;
  right: -16px;
  width: 220px; /* Zvětšeno pro delší texty */
  border-radius: 0 0 1rem 1rem;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: -1;
`;

const StyledNavLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surface}33;
  }
`;

// Nové styly pro vnořené menu
const SubMenuContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SubMenuTrigger = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text};
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surface}33;
  }
`;

const SubMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1rem; /* Odsazení pro vnořené položky */
  margin-top: 0.25rem;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  margin-left: 0.5rem;
`;

const SubMenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surface}33;
    padding-left: 0.75rem; /* Efekt posunu při hoveru */
  }
`;

const StyledNavButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: color 0.3s ease, background-color 0.3s ease;
  cursor: pointer; /* Přidáno cursor pointer */

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: ${({ theme }) => theme.colors.surface}33;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsMenuOpen(false);
      setIsServicesOpen(false); // Zavřít i podmenu při opuštění hlavního menu
    }, 300);
    setHoverTimeout(timeout);
  };

  return (
    <>
      <StyledHeader>
        <Nav>
          <LogoContainer>
            <LogoLink to="/" viewTransition>
              <PlaceholderLogo />
            </LogoLink>
          </LogoContainer>

          <RightSection>
            <SocialLinks>
              <SocialLink
                href="https://linkedin.com/in/jirirakucak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={28}/>
              </SocialLink>
              <SocialLink
                href="https://github.com/jirirakucak"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon size={28} />
              </SocialLink>
            </SocialLinks>

            <DropdownContainer
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MenuToggle isOpen={isMenuOpen}/>
              <NavLinks isOpen={isMenuOpen}>
                <StyledNavLink to="/" viewTransition>
                  <HomeIcon size={20} />
                  <Text variant="bodyS">Home</Text>
                </StyledNavLink>
                
                {/* Vnořené menu pro Services */}
                <SubMenuContainer>
                  <SubMenuTrigger onClick={() => setIsServicesOpen(!isServicesOpen)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {/* Můžeš přidat ikonu pro Services, pokud chceš */}
                      <SettingsIcon size={20} />
                      <Text variant="bodyS">Services</Text>
                    </div>
                    <span style={{ fontSize: '0.8rem', transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▼</span>
                  </SubMenuTrigger>
                  
                  <SubMenu isOpen={isServicesOpen}>
                    <SubMenuLink to="/Services/FrontendDevelopment" viewTransition>
                      Frontend Dev
                    </SubMenuLink>
                    <SubMenuLink to="/Services/BackendAndSystems" viewTransition>
                      Backend & Systems
                    </SubMenuLink>
                    <SubMenuLink to="/Services" viewTransition>
                      Full Services
                    </SubMenuLink>
                  </SubMenu>
                </SubMenuContainer>

                <StyledNavLink to="/dashboard" viewTransition>
                  <DashboardIcon size={24} />
                  <Text variant="bodyS">Dashboard</Text>
                </StyledNavLink>
                <StyledNavLink to="/admin" viewTransition>
                  <AdminIcon size={18} />
                  <Text variant="bodyS">Admin</Text>
                </StyledNavLink>
                <StyledNavButton onClick={() => {
                      setIsSettingsOpen(true);
                      setIsMenuOpen(false); // Zavřít menu po kliknutí
                  }} style={{ cursor: 'pointer' }}>
                    <SettingsIcon size={20} />
                    <Text variant="bodyS">Preferences</Text>
                </StyledNavButton>
              </NavLinks>
            </DropdownContainer>
          </RightSection>
        </Nav>
      </StyledHeader>
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
          <WebSettings />
      </Modal>
      <NavBg/>
    </>
  );
};

export default Header;