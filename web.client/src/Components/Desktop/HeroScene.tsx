import { Component, lazy, Suspense, type PropsWithChildren } from 'react';
import { SceneLayer } from './HomeHero.styles';

const AtomScene = lazy(() => import('./AtomScene'));

// The optional visual must not take down the portfolio or its navigation.
class SceneBoundary extends Component<PropsWithChildren, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroScene() {
  return (
    <SceneLayer aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <AtomScene layout="hero" />
        </Suspense>
      </SceneBoundary>
    </SceneLayer>
  );
}
