import { Euler, Vector3 } from 'three';

export const trailLength = 100;
export const orbitRadii = [5.5, 5.5, 5.5];
const electronCounts = [5, 5, 5];
const rotations = [new Euler(0, 0, 0), new Euler(Math.PI / 2, 0, 0), new Euler(0, Math.PI / 2, 0)];

export type AtomParticle = {
  t: number;
  speed: number;
  radius: number;
  phase: number;
  rotation: Euler;
  trail: Vector3[];
};

function positionAt(particle: AtomParticle, time: number, target: Vector3) {
  const angle = time + particle.phase;
  return target.set(Math.cos(angle) * particle.radius, Math.sin(angle) * particle.radius, 0).applyEuler(particle.rotation);
}

export function createAtomParticles(): AtomParticle[] {
  return electronCounts.flatMap((count, orbit) => Array.from({ length: count }, (_, index) => {
    const particle: AtomParticle = {
      t: index / count * Math.PI * 2,
      speed: 0.015 - orbit * 0.003,
      radius: orbitRadii[orbit],
      phase: index / count * Math.PI * 2,
      rotation: rotations[orbit],
      trail: [],
    };
    // Initialize the full trail so the first/static frame is already a complete atom.
    particle.trail = Array.from({ length: trailLength }, (_, step) => positionAt(particle, particle.t - particle.speed * step, new Vector3()));
    return particle;
  }));
}

export function boundedFrameDelta(delta: number) {
  return Number.isFinite(delta) ? Math.max(0, Math.min(delta, 0.05)) : 0;
}

export function advanceAtomParticle(particle: AtomParticle, delta: number) {
  const step = boundedFrameDelta(delta);
  if (!step) return;
  particle.t += particle.speed * step * 60;
  for (let index = particle.trail.length - 1; index > 0; index--) particle.trail[index].copy(particle.trail[index - 1]);
  positionAt(particle, particle.t, particle.trail[0]);
}
