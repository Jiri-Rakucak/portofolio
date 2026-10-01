import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatWaveOne = keyframes`
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-16px) scaleY(1.03);
  }
`;

const floatWaveTwo = keyframes`
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(18px) scaleY(0.97);
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
    circle at 50% 50%,
    ${({ theme }) => theme.colors.background} 0%,
    #0d0c11 100%
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

const AnimatedGroupOne = styled.g`
  animation: ${floatWaveOne} 16s ease-in-out infinite;
  transform-origin: center;
`;

const AnimatedGroupTwo = styled.g`
  animation: ${floatWaveTwo} 20s ease-in-out infinite;
  transform-origin: center;
`;

const GlowingAmbient = styled.g`
  animation: ${pulseGlow} 10s ease-in-out infinite;
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
          {/* Central diffused accent bloom */}
          <radialGradient id="centerBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.22" />
            <stop offset="45%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Secondary ambient backlight */}
          <radialGradient id="sideBloom" cx="80%" cy="60%" r="40%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Primary wave gradient: Soft start -> high energetic accent -> fading out */}
          <linearGradient id="waveGradPrimary" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="70%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Intersecting wave gradient: darker edge into vibrant highlight */}
          <linearGradient id="waveGradSecondary" x1="0%" y1="40%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="85%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Translucent ribbon fill 1 */}
          <linearGradient id="ribbonFillOne" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.22" />
            <stop offset="55%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.35" />
            <stop offset="80%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Translucent ribbon fill 2 */}
          <linearGradient id="ribbonFillTwo" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.18" />
            <stop offset="65%" stopColor="var(--color-accent, #3498db)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-accent, #3498db)" stopOpacity="0" />
          </linearGradient>

          {/* Heavy ambient blur */}
          <filter id="ambientBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="40" />
          </filter>

          {/* Medium volumetric glow */}
          <filter id="mediumGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense neon core glow */}
          <filter id="neonLaserCore" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="coloredGlow" />
            <feGaussianBlur stdDeviation="2" result="sharpGlow" />
            <feMerge>
              <feMergeNode in="coloredGlow" />
              <feMergeNode in="sharpGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient backlighting */}
        <GlowingAmbient>
          <ellipse cx="960" cy="540" rx="750" ry="420" fill="url(#centerBloom)" />
          <ellipse cx="1500" cy="580" rx="550" ry="320" fill="url(#sideBloom)" />
        </GlowingAmbient>

        {/* Deep ambient diffused wave aura */}
        <path
          d="M -100 590 C 350 670, 750 420, 1120 510 C 1480 600, 1720 440, 2020 390"
          stroke="var(--color-accent, #3498db)"
          strokeWidth="110"
          filter="url(#ambientBlur)"
          opacity="0.3"
        />
        <path
          d="M -100 410 C 400 320, 780 620, 1180 540 C 1520 460, 1760 610, 2020 640"
          stroke="var(--color-accent, #3498db)"
          strokeWidth="90"
          filter="url(#ambientBlur)"
          opacity="0.25"
        />

        {/* Wave Group 1: Lower sweeping ribbon */}
        <AnimatedGroupOne>
          {/* Volumetric Ribbon Body */}
          <path
            d="M -80 610 C 340 680, 680 430, 1080 500 C 1440 570, 1700 450, 2020 390 L 2020 470 C 1700 530, 1420 660, 1060 585 C 660 510, 320 760, -80 690 Z"
            fill="url(#ribbonFillOne)"
          />

          {/* Soft aura contour */}
          <path
            d="M -80 650 C 330 720, 670 470, 1070 540 C 1430 610, 1700 490, 2020 430"
            stroke="url(#waveGradPrimary)"
            strokeWidth="18"
            filter="url(#mediumGlow)"
            opacity="0.45"
          />

          {/* Brilliant central beam */}
          <path
            d="M -80 650 C 330 720, 670 470, 1070 540 C 1430 610, 1700 490, 2020 430"
            stroke="url(#waveGradPrimary)"
            strokeWidth="6"
            filter="url(#neonLaserCore)"
            opacity="0.85"
          />

          {/* Razor sharp hot-white core filament */}
          <path
            d="M -80 650 C 330 720, 670 470, 1070 540 C 1430 610, 1700 490, 2020 430"
            stroke="#ffffff"
            strokeWidth="1.8"
            opacity="0.95"
          />
        </AnimatedGroupOne>

        {/* Wave Group 2: Intersecting top-to-bottom counter ribbon */}
        <AnimatedGroupTwo>
          {/* Volumetric Ribbon Body */}
          <path
            d="M -80 390 C 380 300, 780 610, 1160 530 C 1500 450, 1740 600, 2020 630 L 2020 550 C 1730 520, 1480 380, 1140 460 C 760 540, 370 230, -80 310 Z"
            fill="url(#ribbonFillTwo)"
          />

          {/* Soft aura contour */}
          <path
            d="M -80 350 C 380 260, 770 570, 1150 495 C 1490 415, 1740 560, 2020 590"
            stroke="url(#waveGradSecondary)"
            strokeWidth="16"
            filter="url(#mediumGlow)"
            opacity="0.4"
          />

          {/* Brilliant central beam */}
          <path
            d="M -80 350 C 380 260, 770 570, 1150 495 C 1490 415, 1740 560, 2020 590"
            stroke="url(#waveGradSecondary)"
            strokeWidth="5"
            filter="url(#neonLaserCore)"
            opacity="0.8"
          />

          {/* Razor sharp hot-white core filament */}
          <path
            d="M -80 350 C 380 260, 770 570, 1150 495 C 1490 415, 1740 560, 2020 590"
            stroke="#ffffff"
            strokeWidth="1.6"
            opacity="0.9"
          />
        </AnimatedGroupTwo>
      </SvgCanvas>
    </WallpaperContainer>
  );
};

export default Wallpaper;
