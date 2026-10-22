import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ThemeProvider } from 'styled-components';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { darkTheme } from '../../../styles/theme';
import AtomScene from '../AtomScene';
import HeroPointerRotation from '../HeroPointerRotation';
import { useReducedMotion } from '../../../Hooks/useReducedMotion';
import { useHeroActivity } from '../heroActivity';

vi.mock('@react-three/fiber', () => ({
  Canvas: vi.fn(() => null),
  useFrame: vi.fn(),
  useThree: vi.fn(),
}));
vi.mock('@react-three/drei', () => ({ OrbitControls: vi.fn(() => null) }));
vi.mock('../../../Hooks/useReducedMotion', () => ({ useReducedMotion: vi.fn(() => false) }));
vi.mock('../heroActivity', () => ({ useHeroActivity: vi.fn(() => ({ animated: true, frameloop: 'always' })) }));

const elements = (children: ReactNode) => Children.toArray(children).filter(isValidElement);
const renderCanvas = (element: ReactElement) => {
  renderToStaticMarkup(<ThemeProvider theme={darkTheme}>{element}</ThemeProvider>);
  return vi.mocked(Canvas).mock.calls[0][0];
};

afterEach(() => { vi.clearAllMocks(); vi.mocked(useHeroActivity).mockReturnValue({ animated: true, frameloop: 'always' }); });

describe('atom scene interaction boundaries', () => {
  it('connects the hero source to the pointer group without competing orbit controls', () => {
    const source = { current: null };
    const props = renderCanvas(<AtomScene layout="hero" pointerSource={source} />);
    const children = elements(props.children);
    const pointerGroup = children.find(child => child.type === HeroPointerRotation);

    expect(pointerGroup?.props).toMatchObject({ pointerSource: source });
    expect(children.some(child => child.type === OrbitControls)).toBe(false);
    expect(children.some(child => child.type === Fragment)).toBe(false);
    expect(props.camera).toMatchObject({ position: [0, 0, 12] });
    expect(props.frameloop).toBe('always');
    expect(props.dpr).toEqual([1, 1.5]);
  });

  it('preserves the default DevOS camera, panning, and drag controls', () => {
    const props = renderCanvas(<AtomScene />);
    const children = elements(props.children);
    const fragment = children.find(child => child.type === Fragment) as ReactElement<{ children: ReactNode }>;
    const controls = elements(fragment.props.children).find(child => child.type === OrbitControls);

    expect(children.some(child => child.type === HeroPointerRotation)).toBe(false);
    expect(controls?.props).toMatchObject({ enableZoom: false, enablePan: true });
    expect(props.camera).toMatchObject({ position: [0, 0, 10] });
    expect(props.frameloop).toBe('always');
    expect(props.dpr).toBeUndefined();
  });

  it('can render the hero without an attached pointer source', () => {
    const props = renderCanvas(<AtomScene layout="hero" />);
    const pointerGroup = elements(props.children).find(child => child.type === HeroPointerRotation);

    expect(pointerGroup).toBeDefined();
    expect(pointerGroup?.props).toMatchObject({ pointerSource: undefined });
    expect(props.fallback).toBeNull();
  });

  it.each(['demand', 'never'] as const)('disables all hero animation when the frame policy is %s', frameloop => {
    vi.mocked(useHeroActivity).mockReturnValue({ animated: false, frameloop });
    const props = renderCanvas(<AtomScene layout="hero" />);
    const pointer = elements(props.children).find(child => child.type === HeroPointerRotation) as ReactElement<{ animated: boolean; children: ReactElement<{ animated: boolean }> }>;
    expect(props.frameloop).toBe(frameloop);
    expect(pointer.props.animated).toBe(false);
    expect(pointer.props.children.props.animated).toBe(false);
    expect(useHeroActivity).toHaveBeenCalledWith(undefined, true, vi.mocked(useReducedMotion)());
  });
});
