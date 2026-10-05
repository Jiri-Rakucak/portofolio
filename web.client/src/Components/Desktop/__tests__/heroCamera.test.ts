import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { frameHeroCamera } from '../heroCamera';

describe('home hero camera framing', () => {
  it('projects the atom to the left while keeping its orbit target unchanged', () => {
    const camera = new PerspectiveCamera(75);
    frameHeroCamera(camera, 1000, 640);
    const center = new Vector3(0, 0, -12).project(camera);

    expect((center.x + 1) / 2).toBeCloseTo(0.28);
    expect(center.y).toBeCloseTo(0);
    expect(camera.position.toArray()).toEqual([0, 0, 0]);
  });

  it('updates aspect and bounds the offset when resized to an ultrawide viewport', () => {
    const camera = new PerspectiveCamera(75);
    frameHeroCamera(camera, 1000, 640);
    frameHeroCamera(camera, 3440, 640);

    expect(camera.aspect).toBeCloseTo(3440 / 640);
    expect(camera.view?.offsetX).toBe(316);
    expect(camera.view?.fullWidth).toBe(3440);
    const center = new Vector3(0, 0, -12).project(camera);
    expect((center.x + 1) / 2 * 3440).toBeCloseTo(3440 / 2 - 316);
  });

  it.each([[0, 640], [1000, 0], [-1, 640], [1000, -1], [NaN, 640], [1000, Infinity]])(
    'ignores invalid or unmeasured viewport dimensions %s x %s', (width, height) => {
      const camera = new PerspectiveCamera(75);
      const projection = camera.projectionMatrix.clone();
      frameHeroCamera(camera, width, height);

      expect(camera.view).toBeNull();
      expect(camera.projectionMatrix.equals(projection)).toBe(true);
    },
  );
});
