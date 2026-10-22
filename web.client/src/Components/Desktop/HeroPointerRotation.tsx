import { useEffect, useRef, type PropsWithChildren, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { advanceHeroTilt, type HeroTilt } from './heroPointer';
import { bindHeroPointer } from './heroPointerEvents';

type HeroPointerRotationProps = PropsWithChildren<{ pointerSource?: RefObject<HTMLElement | null>; animated?: boolean }>;

export default function HeroPointerRotation({ pointerSource, animated = true, children }: HeroPointerRotationProps) {
  const group = useRef<Group>(null);
  const target = useRef<HeroTilt>({ pitch: 0, yaw: 0 });

  useEffect(() => {
    const source = pointerSource?.current;
    if (!source || !animated) return;
    return bindHeroPointer(source, tilt => { target.current = tilt; });
  }, [pointerSource, animated]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (animated) advanceHeroTilt(group.current.rotation, target.current, delta);
    else group.current.rotation.set(0, 0, 0);
  });

  return <group ref={group} name="hero-pointer-rotation">{children}</group>;
}
