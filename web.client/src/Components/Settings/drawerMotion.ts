export function animateDrawerClose(panel: HTMLElement, onClosed: () => void): () => void {
    const view = panel.ownerDocument.defaultView;
    if (!view || typeof panel.animate !== 'function' || view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        onClosed();
        return () => {};
    }

    let animation: Animation;
    try {
        animation = panel.animate([
            { transform: view.getComputedStyle(panel).transform },
            { transform: 'translateY(-100%)' },
        ], { duration: 160, easing: 'ease-in', fill: 'forwards' });
    } catch {
        onClosed();
        return () => {};
    }

    let cancelled = false;
    const finish = () => { if (!cancelled) onClosed(); };
    void animation.finished.then(finish, finish);

    return () => {
        cancelled = true;
        animation.cancel();
    };
}
