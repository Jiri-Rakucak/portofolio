import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Text from './Typography';

// ==========================================
// ATOMS (Styled Components)
// ==========================================

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    padding: ${({ theme }) => theme.spacing.large};
    background-color: ${({ theme }) => theme.colors.backgroundSecondary || '#1a1a1a'};
    gap: ${({ theme }) => theme.spacing.medium};
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

const Label = styled.label`
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 4px;
`;

const inputStyles = css`
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
    border: none;   
    border-left: 4px solid ${({ theme }) => theme.colors.accent};
    outline: none;
    transition: all 0.2s ease-in-out;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}33`};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    ${inputStyles}
`;

const TextArea = styled.textarea`
    ${inputStyles}
    min-height: 120px;
    resize: vertical;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline' }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.main};
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;

    ${({ theme, $variant }) => {
        switch ($variant) {
            case 'secondary':
                return css`
                    background-color: ${theme.colors.secondary};
                    color: ${theme.colors.text};
                    border: none;
                    &:hover { filter: brightness(1.1); }
                `;
            case 'outline':
                return css`
                    background-color: transparent;
                    color: ${theme.colors.text};
                    border: 2px solid ${theme.colors.accent};
                    &:hover { 
                        transform: translateY(-2px);
                        color: ${({theme}) => theme.colors.accent};
                    }
                `;
            case 'primary':
            default:
                return css`
                    background-color: transparent;
                    color: ${theme.colors.text};
                    border: 2px solid ${theme.colors.accent};
                    &:hover { 
                        transform: translateY(-2px);
                        color: ${({theme}) => theme.colors.accent};
                    }
                `;
        }
    }}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(1);
    }
`;

const ErrorText = styled.span`
    color: ${({ theme }) => theme.colors.error};
    font-size: 0.75rem;
    margin-left: 4px;
    min-height: 1em;
`;

// --- Checkbox & Switch Atoms ---

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
    display: inline-block;
    width: 24px;
    height: 24px;
    background: ${({ checked, theme }) => (checked ? theme.colors.accent : theme.colors.backgroundSecondary)};
    border: 1px solid ${({ checked, theme }) => (checked ? theme.colors.backgroundSecondary : theme.colors.textMuted)};
    border-left: 4px solid ${({ checked, theme }) => (checked ? theme.colors.accent : theme.colors.accent)};
    border-radius: 0 4px 4px 0;
    transition: all 150ms;
    position: relative;

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    }

    &::after {
        content: '';
        position: absolute;
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
        left: 5px;
        top: 1px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;

const SwitchWrapper = styled.label`
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
`;

const SwitchSlider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.textMuted};
    transition: .4s;
    border-radius: 24px;

    &::before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background-color: ${({ theme }) => theme.colors.textMuted};
        transition: .4s;
        border-radius: 50%;
    }
`;

const HiddenSwitch = styled.input.attrs({ type: 'checkbox' })`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${SwitchSlider} {
        background-color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
    }

    &:focus + ${SwitchSlider} {
        box-shadow: 0 0 1px ${({ theme }) => theme.colors.primary};
    }

    &:checked + ${SwitchSlider}:before {
        transform: translateX(24px);
        background-color: white;
    }
`;

// ==========================================
// REUSABLE COMPONENTS (Molecules)
// ==========================================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => (
    <FormGroup>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Input {...props} />
        {error && <ErrorText>{error}</ErrorText>}
    </FormGroup>
);

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, error, ...props }) => (
    <FormGroup>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <TextArea {...props} />
        {error && <ErrorText>{error}</ErrorText>}
    </FormGroup>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => (
    <CheckboxWrapper className={className}>
        <HiddenCheckbox {...props} />
        <StyledCheckbox checked={!!props.checked} />
        {label}
    </CheckboxWrapper>
);

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ label, className, ...props }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className={className}>
            <SwitchWrapper>
                <HiddenSwitch {...props} />
                <SwitchSlider />
            </SwitchWrapper>
            {label && <Label>{label}</Label>}
        </div>
    );
};


// ==========================================
// FORMS (Organisms)
// ==========================================

// --- 1. Contact Form ---

export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', newsletter: false });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact Form Submitted:', formData);
        // Add logic here
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Text variant="h2">Contact Us</Text>
            
            <FormInput 
                label="Full Name*" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
            />
            
            <FormInput 
                type="email" 
                label="Email Address*" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
            />
            
            <FormTextArea 
                label="Message*" 
                placeholder="How can we help you?" 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
            />

            <Checkbox 
                label="Subscribe to our newsletter"
                checked={formData.newsletter}
                onChange={e => setFormData({ ...formData, newsletter: e.target.checked })}
            />
            
            <Button $variant="outline" type="submit" style={{ marginTop: '1rem' }}>
                Send Message
            </Button>
        </FormContainer>
    );
};

// --- 2. Login Form ---

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login Form Submitted:', formData);
        // Add logic here
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Text variant="h2">Welcome Back</Text>
            
            <FormInput 
                type="email" 
                label="Email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
            />
            
            <FormInput 
                type="password" 
                label="Password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Checkbox 
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={e => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <Text variant="bodyS" as="a">
                    Forgot password?
                </Text>
            </div>

            <Button $variant="primary" type="submit" style={{ marginTop: '1rem' }}>
                Log In
            </Button>
            
            <Text variant="bodyS">
                Don't have an account? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign up</span>
            </Text>
        </FormContainer>
    );
};

// --- 3. Sign Up Form ---

export const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', terms: false });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign Up Form Submitted:', formData);
        // Add logic here
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Text variant="h2">Create Account</Text>
            
            <FormInput 
                label="Username" 
                placeholder="Choose a username" 
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                required
            />

            <FormInput 
                type="email" 
                label="Email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
            />
            
            <FormInput 
                type="password" 
                label="Password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
            />
            
            <FormInput 
                type="password" 
                label="Confirm Password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
            />

            <div style={{ marginTop: '0.5rem' }}>
                <Switch 
                    label="I agree to Terms & Conditions"
                    checked={formData.terms}
                    onChange={e => setFormData({ ...formData, terms: e.target.checked })}
                />
            </div>

            <Button $variant="primary" type="submit" style={{ marginTop: '1.5rem' }} disabled={!formData.terms}>
                Sign Up
            </Button>
            
            <Text variant="bodyS">
                Already have an account? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Log in</span>
            </Text>
        </FormContainer>
    );
};