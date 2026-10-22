import { describe, expect, it } from 'vitest';
import { advanceAtomParticle, boundedFrameDelta, createAtomParticles, trailLength } from '../atomParticles';

describe('atom particle motion', () => {
  it('initializes complete static trails on three orbits without zero-position artifacts', () => {
    const particles = createAtomParticles();
    expect(particles).toHaveLength(15);
    for (const particle of particles) {
      expect(particle.trail).toHaveLength(trailLength);
      for (const position of particle.trail) expect(position.length()).toBeCloseTo(particle.radius);
    }
    expect(particles[0].trail[0].z).toBeCloseTo(0);
    expect(particles[5].trail[1].y).toBeCloseTo(0);
    expect(particles[10].trail[0].x).toBeCloseTo(0);
  });

  it.each([30, 60, 120, 144])('keeps orbital speed consistent at %i FPS', fps => {
    const particle = createAtomParticles()[0];
    const start = particle.t;
    for (let index = 0; index < fps; index++) advanceAtomParticle(particle, 1 / fps);
    expect(particle.t - start).toBeCloseTo(particle.speed * 60);
    expect(particle.trail[0].length()).toBeCloseTo(particle.radius);
  });

  it.each([0, -1, NaN, Infinity])('ignores invalid or non-positive frame deltas (%s)', delta => {
    const particle = createAtomParticles()[0];
    const before = particle.trail.map(position => position.toArray());
    advanceAtomParticle(particle, delta);
    expect(particle.t).toBe(0);
    expect(particle.trail.map(position => position.toArray())).toEqual(before);
  });

  it('bounds catch-up after a long pause and does not share mutable trails between scenes', () => {
    expect(boundedFrameDelta(10)).toBe(0.05);
    const first = createAtomParticles()[0];
    const second = createAtomParticles()[0];
    advanceAtomParticle(first, 10);
    expect(first.t).toBeCloseTo(first.speed * 3);
    expect(second.t).toBe(0);
    expect(first.trail[0]).not.toBe(second.trail[0]);
  });
});
