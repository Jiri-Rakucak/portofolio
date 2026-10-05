import { useEffect, useRef, type PropsWithChildren, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { advanceHeroTilt, type HeroTilt } from './heroPointer';
import { bindHeroPointer } from './heroPointerEvents';

type HeroPointerRotationProps = PropsWithChildren<{ pointerSource?: RefObject<HTMLElement | null> }>;

export default function HeroPointerRotation({ pointerSource, children }: HeroPointerRotationProps) {
  const group = useRef<Group>(null);
  const target = useRef<HeroTilt>({ pitch: 0, yaw: 0 });

  useEffect(() => {
    const source = pointerSource?.current;
    if (!source) return;
    return bindHeroPointer(source, tilt => { target.current = tilt; });
  }, [pointerSource]);

  useFrame((_, delta) => {
    if (group.current) advanceHeroTilt(group.current.rotation, target.current, delta);
  });

  return <group ref={group} name="hero-pointer-rotation">{children}</group>;
}
