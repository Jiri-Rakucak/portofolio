import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { focusRing } from './controlStyles';
import { activateModal, isOutsideDialog } from './dialogLifecycle';

const Dialog = styled.dialog`
    width: min(600px, calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    margin: auto;
    padding: 1.5rem;
    border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 18%, transparent);
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    overflow-y: auto;
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.35);

    &::backdrop { background: rgb(0 0 0 / 0.65); backdrop-filter: blur(4px); }

    @media (max-width: 480px) { padding: 1.25rem; }
`;

const CloseButton = styled.button`
    ${focusRing}
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font: inherit;
    font-size: 1.75rem;
    cursor: pointer;

    &:hover { background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 10%, transparent); }
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    labelledBy: string;
    closeLabel: string;
    returnFocusRef: RefObject<HTMLButtonElement | null>;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, labelledBy, closeLabel, returnFocusRef, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const pointerStartedOutside = useRef(false);

    useEffect(() => {
        if (!isOpen || !dialogRef.current) return;
        return activateModal(dialogRef.current, () => returnFocusRef.current);
    }, [isOpen, returnFocusRef]);

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <Dialog ref={dialogRef} aria-labelledby={labelledBy}
            onCancel={event => { event.preventDefault(); onClose(); }}
            onPointerDown={event => {
                pointerStartedOutside.current = event.target === event.currentTarget &&
                    isOutsideDialog(event.currentTarget.getBoundingClientRect(), event);
            }}
            onClick={event => {
                const dismiss = pointerStartedOutside.current && event.target === event.currentTarget &&
                    isOutsideDialog(event.currentTarget.getBoundingClientRect(), event);
                pointerStartedOutside.current = false;
                if (dismiss) onClose();
            }}>
            <CloseButton type="button" autoFocus aria-label={closeLabel} title={closeLabel} onClick={onClose}>
                <span aria-hidden="true">&times;</span>
            </CloseButton>
            {children}
        </Dialog>, document.body,
    );
}
