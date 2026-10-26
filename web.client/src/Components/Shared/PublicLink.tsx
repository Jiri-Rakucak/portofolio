import type { RefAttributes } from 'react';
import { Link, type LinkProps } from 'react-router';
import { useReducedMotion } from '../../Hooks/useReducedMotion';

export default function PublicLink({ viewTransition = true, ref, ...props }: LinkProps & RefAttributes<HTMLAnchorElement>) {
    const reducedMotion = useReducedMotion();
    const supported = typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

    return <Link {...props} ref={ref} viewTransition={viewTransition && supported && !reducedMotion} />;
}
