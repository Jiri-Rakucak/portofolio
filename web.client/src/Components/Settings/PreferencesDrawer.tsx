import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { activateModal } from '../Shared/dialogLifecycle';
import { animateDrawerClose } from './drawerMotion';
import { DrawerHost, DrawerPanel, DrawerHeader, DrawerTitle, DrawerBody, DrawerCloseButton } from './PreferencesDrawer.styles';

interface PreferencesDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    labelledBy: string;
    closeLabel: string;
    returnFocusRef: RefObject<HTMLButtonElement | null>;
    children: ReactNode;
}

function DrawerSurface({ onClose, title, labelledBy, closeLabel, returnFocusRef, children }: Omit<PreferencesDrawerProps, 'isOpen'>) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const pointerStartedOutside = useRef(false);
    const closing = useRef(false);
    const cancelClose = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        const cleanup = activateModal(dialogRef.current, () => returnFocusRef.current);
        return () => {
            cancelClose.current?.();
            cleanup();
        };
    }, [returnFocusRef]);

    const requestClose = () => {
        if (closing.current) return;
        closing.current = true;
        if (panelRef.current) cancelClose.current = animateDrawerClose(panelRef.current, onClose);
        else onClose();
    };

    return (
        <DrawerHost ref={dialogRef} aria-labelledby={labelledBy}
            onCancel={event => { event.preventDefault(); requestClose(); }}
            onPointerDown={event => { pointerStartedOutside.current = event.target === event.currentTarget; }}
            onClick={event => {
                const dismiss = pointerStartedOutside.current && event.target === event.currentTarget;
                pointerStartedOutside.current = false;
                if (dismiss) requestClose();
            }}>
            <DrawerPanel ref={panelRef}>
                <DrawerHeader>
                    <DrawerTitle id={labelledBy}>{title}</DrawerTitle>
                    <DrawerCloseButton type="button" autoFocus aria-label={closeLabel} title={closeLabel} onClick={requestClose}>
                        <span aria-hidden="true">&times;</span>
                    </DrawerCloseButton>
                </DrawerHeader>
                <DrawerBody>{children}</DrawerBody>
            </DrawerPanel>
        </DrawerHost>
    );
}

export default function PreferencesDrawer({ isOpen, ...props }: PreferencesDrawerProps) {
    if (!isOpen || typeof document === 'undefined') return null;
    return createPortal(<DrawerSurface {...props} />, document.body);
}
