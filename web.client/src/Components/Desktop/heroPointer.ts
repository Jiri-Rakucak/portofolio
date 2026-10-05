import { MathUtils, type Euler } from 'three';

export type HeroTilt = { pitch: number; yaw: number };
type HeroBounds = Pick<DOMRectReadOnly, 'left' | 'top' | 'width' | 'height'>;

export const heroTiltLimits = { pitch: MathUtils.degToRad(12), yaw: MathUtils.degToRad(20) };

export function getHeroPointerTilt(clientX: number, clientY: number, bounds: HeroBounds): HeroTilt {
  const { left, top, width, height } = bounds;
  if (![clientX, clientY, left, top, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
    return { pitch: 0, yaw: 0 };
  }
  return {
    pitch: -MathUtils.clamp((clientY - top) / height * 2 - 1, -1, 1) * heroTiltLimits.pitch,
    yaw: MathUtils.clamp((clientX - left) / width * 2 - 1, -1, 1) * heroTiltLimits.yaw,
  };
}

export function advanceHeroTilt(rotation: Pick<Euler, 'x' | 'y'>, target: HeroTilt, delta: number) {
  if (!Number.isFinite(delta) || delta <= 0) return;
  rotation.x = MathUtils.damp(rotation.x, target.pitch, 6, delta);
  rotation.y = MathUtils.damp(rotation.y, target.yaw, 6, delta);
}
