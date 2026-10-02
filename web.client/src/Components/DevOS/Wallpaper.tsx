import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatWaveOne = keyframes`
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-22px) scaleY(1.04);
  }
`;

const floatWaveTwo = keyframes`
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(24px) scaleY(0.96);
  }
`;

const floatWaveThree = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.65;
  }
  50% {
    opacity: 0.9;
  }
`;

const WallpaperContainer = styled.div`
  --color-accent: ${({ theme }) => theme.colors.accent};
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    ${({ theme }) => theme.colors.background} 0%,
    #07060a 100%
  );

  @media (prefers-reduced-motion: reduce) {
    svg g {
      animation: none;
    }
  }
`;

const SvgCanvas = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

const ScreenGroup = styled.g`
  mix-blend-mode: screen;
`;

const AnimatedGroupOne = styled.g`
  animation: ${floatWaveOne} 18s ease-in-out infinite;
  transform-origin: center;
`;

const AnimatedGroupTwo = styled.g`
  animation: ${floatWaveTwo} 22s ease-in-out infinite;
  transform-origin: center;
`;

const AnimatedGroupThree = styled.g`
  animation: ${floatWaveThree} 26s ease-in-out infinite;
  transform-origin: center;
`;

const GlowingAmbient = styled.g`
  animation: ${pulseGlow} 12s ease-in-out infinite;
`;

export const Wallpaper: React.FC = () => {
  return (
    <WallpaperContainer aria-hidden="true">
      <SvgCanvas
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Široké ambientní záře pokrývající celou plochu (levá strana, střed i pravá strana) */}
          <radialGradient id="centerBloom" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.22" />
            <stop offset="45%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Důležitá levá ambientní aura – odstraňuje pocit 'oříznutí' na levé straně */}
          <radialGradient id="leftBloom" cx="15%" cy="50%" r="55%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="50%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Pravá ambientní aura */}
          <radialGradient id="rightBloom" cx="85%" cy="55%" r="55%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.16" />
            <stop offset="50%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Plynulý gradient primární vlny – táhne se hluboko od -600px do +2520px */}
          <linearGradient id="waveGradPrimary" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="15%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.25" />
            <stop offset="38%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.75" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="68%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.7" />
            <stop offset="85%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Plynulý gradient sekundární křížící se vlny */}
          <linearGradient id="waveGradSecondary" x1="0%" y1="40%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="18%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.25" />
            <stop offset="44%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.65" />
            <stop offset="56%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="70%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.55" />
            <stop offset="86%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Plynulý gradient třetí hluboké atmosféry */}
          <linearGradient id="waveGradTertiary" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="50%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.4" />
            <stop offset="80%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Výplň těla stuhy 1 – bezešvá */}
          <linearGradient id="ribbonFillOne" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="50%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.32" />
            <stop offset="80%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Výplň těla stuhy 2 */}
          <linearGradient id="ribbonFillTwo" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.15" />
            <stop offset="52%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.28" />
            <stop offset="82%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Filtry s 300% oblastí – absolutně vylučují jakékoliv oříznutí (ufiknutí) bluru */}
          <filter id="ultraSoftBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="80" />
          </filter>

          <filter id="ribbonFeather" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="36" />
          </filter>

          <filter id="etherealGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="34" result="wideBlur" />
            <feGaussianBlur stdDeviation="14" result="midBlur" />
            <feMerge>
              <feMergeNode in="wideBlur" />
              <feMergeNode in="midBlur" />
            </feMerge>
          </filter>

          <filter id="softLaserCore" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="softAura" />
            <feGaussianBlur stdDeviation="4" result="laserGlow" />
            <feMerge>
              <feMergeNode in="softAura" />
              <feMergeNode in="laserGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hotFilamentGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="filamentGlow" />
            <feMerge>
              <feMergeNode in="filamentGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Široké ambientní záře po celé šířce plochy */}
        <GlowingAmbient>
          <ellipse cx="960" cy="540" rx="1100" ry="580" fill="url(#centerBloom)" />
          <ellipse cx="250" cy="500" rx="800" ry="520" fill="url(#leftBloom)" />
          <ellipse cx="1670" cy="560" rx="800" ry="520" fill="url(#rightBloom)" />
        </GlowingAmbient>

        <ScreenGroup>
          {/* Spodní hluboké atmosférické aury – táhnou se od -600px do +2520px s obrovským rozptylem */}
          <path
            d="M -600 760 C 100 860, 600 360, 1100 490 C 1580 610, 1980 410, 2520 360"
            stroke="var(--color-accent, #3498db)"
            strokeWidth="240"
            strokeLinecap="round"
            filter="url(#ultraSoftBlur)"
            opacity="0.32"
          />
          <path
            d="M -600 280 C 150 180, 650 680, 1160 540 C 1600 410, 2050 680, 2520 720"
            stroke="var(--color-accent, #3498db)"
            strokeWidth="220"
            strokeLinecap="round"
            filter="url(#ultraSoftBlur)"
            opacity="0.28"
          />

          {/* Vlna 3: Široká vertikální záře rozšiřující světlo do horní i dolní části obrazovky */}
          <AnimatedGroupThree>
            <path
              d="M -600 480 C 50 250, 720 780, 1260 420 C 1750 180, 2180 500, 2520 560"
              stroke="url(#waveGradTertiary)"
              strokeWidth="140"
              strokeLinecap="round"
              filter="url(#ultraSoftBlur)"
              opacity="0.35"
            />
          </AnimatedGroupThree>

          {/* Vlna 1: Hlavní plynulá stuha (rozšířená z -600 na 2520) */}
          <AnimatedGroupOne>
            {/* Tělo stuhy – bez ostrých hran, s velkým přesahem za okraje obrazovky */}
            <path
              d="M -600 740 C 100 820, 600 350, 1080 470 C 1520 590, 1940 390, 2520 330 L 2520 440 C 1940 500, 1520 700, 1080 580 C 600 460, 100 930, -600 850 Z"
              fill="url(#ribbonFillOne)"
              filter="url(#ribbonFeather)"
              opacity="0.45"
            />

            {/* Široká rozptýlená světelná stopa */}
            <path
              d="M -600 780 C 100 860, 600 380, 1100 500 C 1550 620, 1950 420, 2520 360"
              stroke="url(#waveGradPrimary)"
              strokeWidth="70"
              strokeLinecap="round"
              filter="url(#etherealGlow)"
              opacity="0.35"
            />

            {/* Střední měkká aura */}
            <path
              d="M -600 780 C 100 860, 600 380, 1100 500 C 1550 620, 1950 420, 2520 360"
              stroke="url(#waveGradPrimary)"
              strokeWidth="24"
              strokeLinecap="round"
              filter="url(#etherealGlow)"
              opacity="0.6"
            />

            {/* Zářící světelný paprsek */}
            <path
              d="M -600 780 C 100 860, 600 380, 1100 500 C 1550 620, 1950 420, 2520 360"
              stroke="url(#waveGradPrimary)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#softLaserCore)"
              opacity="0.85"
            />

            {/* Zjemněné vnitřní vlákno */}
            <path
              d="M -600 780 C 100 860, 600 380, 1100 500 C 1550 620, 1950 420, 2520 360"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#hotFilamentGlow)"
              opacity="0.85"
            />
          </AnimatedGroupOne>

          {/* Vlna 2: Křížící se horní stuha (rozšířená z -600 na 2520) */}
          <AnimatedGroupTwo>
            {/* Tělo stuhy */}
            <path
              d="M -600 240 C 150 140, 650 640, 1140 500 C 1580 380, 2030 640, 2520 680 L 2520 760 C 2030 720, 1580 460, 1140 580 C 650 720, 150 220, -600 320 Z"
              fill="url(#ribbonFillTwo)"
              filter="url(#ribbonFeather)"
              opacity="0.4"
            />

            {/* Široká rozptýlená stopa */}
            <path
              d="M -600 280 C 150 180, 650 680, 1150 540 C 1600 420, 2050 680, 2520 720"
              stroke="url(#waveGradSecondary)"
              strokeWidth="60"
              strokeLinecap="round"
              filter="url(#etherealGlow)"
              opacity="0.32"
            />

            {/* Střední měkká aura */}
            <path
              d="M -600 280 C 150 180, 650 680, 1150 540 C 1600 420, 2050 680, 2520 720"
              stroke="url(#waveGradSecondary)"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#etherealGlow)"
              opacity="0.55"
            />

            {/* Zářící paprsek */}
            <path
              d="M -600 280 C 150 180, 650 680, 1150 540 C 1600 420, 2050 680, 2520 720"
              stroke="url(#waveGradSecondary)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#softLaserCore)"
              opacity="0.8"
            />

            {/* Zjemněné vnitřní vlákno */}
            <path
              d="M -600 280 C 150 180, 650 680, 1150 540 C 1600 420, 2050 680, 2520 720"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#hotFilamentGlow)"
              opacity="0.8"
            />
          </AnimatedGroupTwo>
        </ScreenGroup>
      </SvgCanvas>
    </WallpaperContainer>
  );
};

export default Wallpaper;
