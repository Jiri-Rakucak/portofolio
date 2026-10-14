import { describe, expect, it, vi } from 'vitest';
import { activateModal, isOutsideDialog } from '../dialogLifecycle';

function fixture(overflow = '', priority = '') {
    const style = {
        getPropertyValue: vi.fn(() => overflow),
        getPropertyPriority: vi.fn(() => priority),
        setProperty: vi.fn(), removeProperty: vi.fn(),
    };
    const previousFocus = { isConnected: true, focus: vi.fn() };
    const trigger = { isConnected: true, focus: vi.fn() };
    const element = {
        open: false,
        ownerDocument: { body: { style }, activeElement: previousFocus },
        showModal: vi.fn(() => { element.open = true; }),
        close: vi.fn(() => { element.open = false; }),
    };
    return { style, previousFocus, trigger, element, dialog: element as unknown as HTMLDialogElement };
}

describe('native preferences dialog lifecycle', () => {
    it('opens modally, locks scrolling, closes, and returns focus to a visible trigger', () => {
        const { dialog, element, style, trigger, previousFocus } = fixture();
        const cleanup = activateModal(dialog, () => trigger as unknown as HTMLElement);
        expect(element.showModal).toHaveBeenCalledOnce();
        expect(style.setProperty).toHaveBeenCalledWith('overflow', 'hidden');
        cleanup();
        expect(element.close).toHaveBeenCalledOnce();
        expect(style.removeProperty).toHaveBeenCalledWith('overflow');
        expect(trigger.focus).toHaveBeenCalledWith({ preventScroll: true });
        expect(previousFocus.focus).not.toHaveBeenCalled();
    });

    it('preserves an existing scroll style and its priority', () => {
        const { dialog, style } = fixture('clip', 'important');
        activateModal(dialog, () => null)();
        expect(style.setProperty).toHaveBeenLastCalledWith('overflow', 'clip', 'important');
        expect(style.removeProperty).not.toHaveBeenCalled();
    });

    it('falls back to the prior focus target when no trigger is available', () => {
        const { dialog, previousFocus } = fixture();
        activateModal(dialog, () => null)();
        expect(previousFocus.focus).toHaveBeenCalledOnce();
    });

    it('does not focus a disconnected element or close an already closed dialog', () => {
        const { dialog, element, trigger } = fixture();
        const cleanup = activateModal(dialog, () => trigger as unknown as HTMLElement);
        trigger.isConnected = false;
        element.open = false;
        cleanup();
        expect(element.close).not.toHaveBeenCalled();
        expect(trigger.focus).not.toHaveBeenCalled();
    });

    it('leaves scrolling unchanged if opening fails', () => {
        const { dialog, element, style } = fixture();
        element.showModal.mockImplementationOnce(() => { throw new Error('Cannot open dialog'); });
        expect(() => activateModal(dialog, () => null)).toThrow('Cannot open dialog');
        expect(style.setProperty).not.toHaveBeenCalled();
    });
});

describe('backdrop hit testing', () => {
    const bounds = { left: 100, right: 500, top: 100, bottom: 600 };

    it.each([[99, 200], [501, 200], [200, 99], [200, 601]])('recognizes backdrop point %s, %s', (clientX, clientY) => {
        expect(isOutsideDialog(bounds, { clientX, clientY })).toBe(true);
    });

    it.each([[100, 100], [500, 600], [200, 200]])('does not dismiss on dialog padding or edge %s, %s', (clientX, clientY) => {
        expect(isOutsideDialog(bounds, { clientX, clientY })).toBe(false);
    });
});
