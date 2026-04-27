import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Text from "../Shared/Typography";



interface LaunchButtonProps {
    to: string;
    text?: string;
    onClick?: () => void;
    
}

const StyledLink = styled(Link)`
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    z-index: 99;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.5s ease, border-color 0.3s ease;
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover {
        transform: translateX(-50%) translateY(-5px);
        border-color: ${({ theme }) => theme.colors.accent};
        border: 2px solid ${({ theme }) => theme.colors.accent};
        color: ${({ theme }) => theme.colors.accent};
    }

    &::before {         
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: ${({ theme }) => theme.colors.accent};
        border-radius: 50%;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: sparkleOrbit 5s linear infinite;
        z-index: 1000;
        transition: opacity 0.3s ease;
        filter: drop-shadow(0 0 4px ${({ theme }) => theme.colors.accent}) drop-shadow(0 0 8px ${({ theme }) => theme.colors.accent});
    }

    @keyframes sparkleOrbit {
    0% {
        top: 0%;
        left: 0%;
        transform: translate(-50%, -50%) rotate(0deg);
    }
    37.5% {
        top: 0;
        left: 100%;
        transform: translate(-50%, -50%) rotate(90deg);
    }
    50% {
        top: 100%;
        left: 100%;
        transform: translate(-50%, -50%) rotate(180deg);
    }
    87.5% {
        top: 100%;
        left: 0%;
        transform: translate(-50%, -50%) rotate(270deg);
    }
    100% {
        top: 0%;
        left: 0%;
        transform: translate(-50%, -50%) rotate(360deg);
    }
}`;


export const LaunchButton: React.FC<LaunchButtonProps> = ({
    to, 
    text = "Launch DevOs",
    onClick 
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <StyledLink to={to} onClick={handleClick}>
            <Text variant="bodyL">{text}</Text>
        </StyledLink>
    );
};