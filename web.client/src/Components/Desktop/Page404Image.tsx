import React from 'react';
import styled, { useTheme } from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const SVGContainer = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

// Definice pro gradienty a efekty
const Page404Image: React.FC = () => {
  const theme = useTheme();
  
  // Barvy z tématu nebo fallbacky
  const accentColor = theme.colors?.accent || '#667eea';
  const bgColor = theme.colors?.background || '#0a0a0a';
  
  return (
    <Container>
      <SVGContainer viewBox="0 0 400 400">
        <defs>
          {/* Radiální gradient pro černou díru - střed je nejtmavší */}
          <radialGradient id="blackHoleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="60%" stopColor="#0a0a0a" />
            <stop offset="85%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </radialGradient>

          {/* Gradient pro záři okolo černé díry (accretion disk efekt) 
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="85%" stopColor={`${accentColor}15`} />
            <stop offset="95%" stopColor={`${accentColor}08`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        */}
          {/* Spirální čáry pro hloubku - gradient 
          <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#333333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        */}
          {/* Clip path pro oříznutí textu - kruhová maska */}
          <clipPath id="holeClip">
            <circle cx="200" cy="200" r="120" />
          </clipPath>

          {/* Maska pro text mizející do díry */}
          <mask id="textFadeMask">
            <rect x="0" y="0" width="400" height="400" fill="white" />
            <circle cx="200" cy="200" r="60" fill="black" />
            <circle cx="200" cy="200" r="90" fill="url(#fadeMaskGradient)" />
          </mask>

          <radialGradient id="fadeMaskGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" />
            <stop offset="70%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
        </defs>

        {/* Vnější záře 
        <circle cx="200" cy="200" r="150" fill="url(#glowGradient)" />
        */}
        {/* Hlavní černá díra */}
        <circle cx="200" cy="200" r="120" fill="url(#blackHoleGradient)" />

        {/* Spirální čáry pro efekt hloubky/rotace 
        <g opacity="0.4">
          {/* Eliptické orbity naznačující gravitační stahování
          <ellipse 
            cx="200" cy="200" 
            rx="110" ry="40" 
            fill="none" 
            stroke="#333" 
            strokeWidth="1"
            transform="rotate(-20, 200, 200)"
          />
          <ellipse 
            cx="200" cy="200" 
            rx="90" ry="30" 
            fill="none" 
            stroke="#2a2a2a" 
            strokeWidth="1.5"
            transform="rotate(-15, 200, 200)"
          />
          <ellipse 
            cx="200" cy="200" 
            rx="70" ry="22" 
            fill="none" 
            stroke="#222" 
            strokeWidth="1"
            transform="rotate(-10, 200, 200)"
          />
          <ellipse 
            cx="200" cy="200" 
            rx="50" ry="15" 
            fill="none" 
            stroke="#1a1a1a" 
            strokeWidth="1.5"
            transform="rotate(-5, 200, 200)"
          />
          <ellipse 
            cx="200" cy="200" 
            rx="30" ry="8" 
            fill="none" 
            stroke="#151515" 
            strokeWidth="1"
            transform="rotate(0, 200, 200)"
          />
        </g>
        */}
        {/* Vnitřní tmavý střed */}
        <circle cx="200" cy="200" r="25" fill="#000000" />

        {/* Text 404 - deformovaný a mizející do díry */}
        <g fontFamily="'Arial Black', sans-serif" fontWeight="900">
          {/* První 4 - největší, napůl viditelná, začíná vlevo */}
          <text
            x="85"
            y="215"
            fontSize="90"
            fill={accentColor}
            opacity="0.9"
            transform="skewX(5) scale(1, 1.05)"
            style={{ filter: 'url(#distort1)' }}
          >
            4
          </text>

          {/* 0 - střední velikost, více vtažená */}
          <text
            x="145"
            y="210"
            fontSize="65"
            fill={accentColor}
            opacity="0.7"
            transform="skewX(8) skewY(-3) scale(0.95, 1.1)"
          >
            0
          </text>

          {/* Druhá 4 - nejmenší, nejvíce deformovaná, téměř v díře */}
          <text
            x="195"
            y="205"
            fontSize="45"
            fill={accentColor}
            opacity="0.45"
            transform="skewX(12) skewY(-5) scale(0.85, 1.15)"
          >
            4
          </text>

          {/* Stín/odraz textu pro hloubku */}
          <text
            x="220"
            y="200"
            fontSize="28"
            fill={bgColor}
            opacity="0.2"
            transform="skewX(18) skewY(-8) scale(0.7, 1.2)"
          >
            4
          </text>
        </g>

        {/* Jemný okraj díry */}
        <circle 
          cx="200" 
          cy="200" 
          r="120" 
          fill="none" 
          stroke={`${bgColor}30`}
          strokeWidth="2"
        />

        {/* Světelné body - hvězdy vtahované do díry 
        <g opacity="0.6">
          <circle cx="95" cy="140" r="2" fill={accentColor}>
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="310" cy="170" r="1.5" fill={accentColor}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="280" r="1" fill={accentColor}>
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="110" cy="260" r="1.8" fill={accentColor}>
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>
        */}
      </SVGContainer>
    </Container>
  );
};

export default Page404Image;
