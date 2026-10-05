import { describe, expect, it } from 'vitest';
import { Euler } from 'three';
import { advanceHeroTilt, getHeroPointerTilt, heroTiltLimits } from '../heroPointer';

const bounds = { left: 100, top: 68, width: 1000, height: 640 };

describe('hero mouse tilt mapping', () => {
  it('maps horizontal mouse movement to yaw and vertical movement to pitch', () => {
    const tilt = getHeroPointerTilt(850, 228, bounds);

    expect(tilt.yaw).toBeCloseTo(heroTiltLimits.yaw / 2);
    expect(tilt.pitch).toBeCloseTo(heroTiltLimits.pitch / 2);
  });

  it('keeps the center neutral and clamps positions beyond the hero', () => {
    const center = getHeroPointerTilt(600, 388, bounds);
    const outside = getHeroPointerTilt(2100, 2000, bounds);

    expect(center.pitch).toBeCloseTo(0);
    expect(center.yaw).toBeCloseTo(0);
    expect(outside.pitch).toBe(-heroTiltLimits.pitch);
    expect(outside.yaw).toBe(heroTiltLimits.yaw);
  });

  it.each([
    [NaN, 388, bounds],
    [600, Infinity, bounds],
    [600, 388, { ...bounds, left: NaN }],
    [600, 388, { ...bounds, top: Infinity }],
    [600, 388, { ...bounds, width: 0 }],
    [600, 388, { ...bounds, height: -1 }],
  ])('returns neutral tilt for invalid coordinates or bounds (%s, %s)', (x, y, rect) => {
    expect(getHeroPointerTilt(x, y, rect)).toEqual({ pitch: 0, yaw: 0 });
  });
});

describe('hero tilt damping', () => {
  it('smoothly moves a real Three.js rotation towards the pointer without changing roll', () => {
    const rotation = new Euler(0, 0, 0.2);
    const target = { pitch: 0.2, yaw: 0.3 };

    advanceHeroTilt(rotation, target, 1 / 60);

    expect(rotation.x).toBeGreaterThan(0);
    expect(rotation.x).toBeLessThan(target.pitch);
    expect(rotation.y).toBeGreaterThan(0);
    expect(rotation.y).toBeLessThan(target.yaw);
    expect(rotation.z).toBe(0.2);
  });

  it('produces the same tilt at 30 and 120 frames per second', () => {
    const slow = new Euler();
    const fast = new Euler();
    const target = { pitch: -0.2, yaw: 0.3 };
    for (let i = 0; i < 30; i++) advanceHeroTilt(slow, target, 1 / 30);
    for (let i = 0; i < 120; i++) advanceHeroTilt(fast, target, 1 / 120);

    expect(slow.x).toBeCloseTo(fast.x, 10);
    expect(slow.y).toBeCloseTo(fast.y, 10);
  });

  it('returns towards neutral when the mouse leaves the hero', () => {
    const rotation = new Euler(0.2, -0.3, 0);
    advanceHeroTilt(rotation, { pitch: 0, yaw: 0 }, 1 / 60);

    expect(rotation.x).toBeLessThan(0.2);
    expect(rotation.x).toBeGreaterThan(0);
    expect(rotation.y).toBeGreaterThan(-0.3);
    expect(rotation.y).toBeLessThan(0);
  });

  it.each([0, -1, NaN, Infinity])('does not corrupt rotation for invalid frame delta %s', delta => {
    const rotation = new Euler(0.1, 0.2, 0.3);
    advanceHeroTilt(rotation, { pitch: 0, yaw: 0 }, delta);

    expect(rotation.toArray()).toEqual([0.1, 0.2, 0.3, 'XYZ']);
  });
});
