import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from '../Icons/Linkedin';
import GitHubIcon from '../Icons/Github';
import SettingsIcon from '../Icons/Settings';
import HomeIcon from '../Icons/Home';
import DashboardIcon from '../Icons/Dashboard';
import AdminIcon from '../Icons/Admin';
import MenuToggle from './MenuToggle';
import Text from './Typography';
import PreferencesDrawer from '../Settings/PreferencesDrawer';
import WebSettings from '../Settings/WebSettings';
import { contact } from '../../content/contact';
import useHeaderNavigation from './useHeaderNavigation';
import {
    StyledHeader, Nav, NavBg, RightSection, SocialLinks, SocialLink, DropdownContainer,
    NavLinks, StyledNavLink, StyledNavButton, SubMenuTrigger, TriggerLabel, Chevron, SubMenu, SubMenuLink,
} from './Header.styles';

const Header = () => {
    const { t } = useTranslation('common');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const menuId = useId();
    const servicesId = useId();
    const settingsTitleId = useId();
    const { isOpen, servicesOpen, containerRef, triggerRef, servicesRef, close, activate,
        toggleServices, onPointerEnter, onPointerLeave, onFocus, onBlur, onKeyDown } = useHeaderNavigation();

    return (
        <>
            <StyledHeader>
                <Nav aria-label={t('navigation.primary')}>
                    <RightSection>
                        <SocialLinks>
                            <SocialLink href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                aria-label="LinkedIn" title="LinkedIn"><LinkedInIcon size={28} /></SocialLink>
                            <SocialLink href={contact.githubUrl} target="_blank" rel="noopener noreferrer"
                                aria-label="GitHub" title="GitHub"><GitHubIcon size={28} /></SocialLink>
                        </SocialLinks>
                        <DropdownContainer ref={containerRef}
                            onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}
                            onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown}>
                            <MenuToggle ref={triggerRef} isOpen={isOpen} controls={menuId}
                                aria-label={t(isOpen ? 'navigation.closeMenu' : 'navigation.openMenu')}
                                title={t(isOpen ? 'navigation.closeMenu' : 'navigation.openMenu')}
                                onClick={activate} />
                            <NavLinks id={menuId} hidden={!isOpen}>
                                <StyledNavLink to="/" viewTransition onClick={close}>
                                    <HomeIcon size={20} /><Text as="span" variant="bodyS">{t('navigation.home')}</Text>
                                </StyledNavLink>
                                <div>
                                    <SubMenuTrigger ref={servicesRef} type="button"
                                        aria-expanded={servicesOpen} aria-controls={servicesId}
                                        onClick={toggleServices}>
                                        <TriggerLabel><SettingsIcon size={20} />
                                            <Text as="span" variant="bodyS">{t('navigation.services')}</Text>
                                        </TriggerLabel>
                                        <Chevron aria-hidden="true" $expanded={servicesOpen}>▼</Chevron>
                                    </SubMenuTrigger>
                                    <SubMenu id={servicesId} hidden={!servicesOpen}>
                                        <SubMenuLink to="/services/frontend-development" viewTransition onClick={close}>
                                            {t('navigation.frontend')}
                                        </SubMenuLink>
                                        <SubMenuLink to="/services/backend-and-systems" viewTransition onClick={close}>
                                            {t('navigation.backend')}
                                        </SubMenuLink>
                                        <SubMenuLink to="/services" viewTransition onClick={close}>
                                            {t('navigation.fullServices')}
                                        </SubMenuLink>
                                    </SubMenu>
                                </div>
                                <StyledNavLink to="/projects" viewTransition onClick={close}>
                                    <DashboardIcon size={24} /><Text as="span" variant="bodyS">{t('navigation.projects')}</Text>
                                </StyledNavLink>
                                <StyledNavLink to="/admin" viewTransition onClick={close}>
                                    <AdminIcon size={18} /><Text as="span" variant="bodyS">{t('navigation.admin')}</Text>
                                </StyledNavLink>
                                <StyledNavButton type="button" aria-haspopup="dialog" onClick={() => {
                                    close();
                                    setIsSettingsOpen(true);
                                }}>
                                    <SettingsIcon size={20} /><Text as="span" variant="bodyS">{t('navigation.preferences')}</Text>
                                </StyledNavButton>
                            </NavLinks>
                        </DropdownContainer>
                    </RightSection>
                </Nav>
            </StyledHeader>
            <PreferencesDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title={t('settings.title')}
                labelledBy={settingsTitleId} closeLabel={t('settings.close')} returnFocusRef={triggerRef}>
                <WebSettings />
            </PreferencesDrawer>
            <NavBg />
        </>
    );
};

export default Header;
