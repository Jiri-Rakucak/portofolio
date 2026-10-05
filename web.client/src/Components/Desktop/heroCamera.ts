import type { PerspectiveCamera } from 'three';

export function frameHeroCamera(camera: PerspectiveCamera, width: number, height: number) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return;

  // Keep orbit controls centered on the atom and cap the shift on ultrawide screens.
  camera.setViewOffset(width, height, Math.min(width * 0.22, 316), 0, width, height);
}
