export function activateModal(dialog: HTMLDialogElement, returnFocus: () => HTMLElement | null) {
    const { body, activeElement } = dialog.ownerDocument;
    const previousFocus = activeElement as HTMLElement | null;
    const previousOverflow = body.style.getPropertyValue('overflow');
    const previousPriority = body.style.getPropertyPriority('overflow');

    dialog.showModal();
    body.style.setProperty('overflow', 'hidden');

    return () => {
        if (dialog.open) dialog.close();
        if (previousOverflow) body.style.setProperty('overflow', previousOverflow, previousPriority);
        else body.style.removeProperty('overflow');
        const target = returnFocus() ?? previousFocus;
        if (target?.isConnected && typeof target.focus === 'function') target.focus({ preventScroll: true });
    };
}

export function isOutsideDialog(bounds: Pick<DOMRect, 'left' | 'right' | 'top' | 'bottom'>,
    point: { clientX: number; clientY: number }) {
    return point.clientX < bounds.left || point.clientX > bounds.right ||
        point.clientY < bounds.top || point.clientY > bounds.bottom;
}
