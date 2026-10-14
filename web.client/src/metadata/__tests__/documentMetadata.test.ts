import { describe, expect, it, vi } from 'vitest';
import { applyDocumentMetadata } from '../documentMetadata';
import type { PageMetadata } from '../pageMetadata';

class MetaStub {
    attributes: Record<string, string> = {};
    parentNode: object | null = null;
    removed = false;
    setAttribute = vi.fn((name: string, content: string) => { this.attributes[name] = content; });
    remove = vi.fn(() => { this.removed = true; this.parentNode = null; });
}

function fixture(existing: { name: string; content: string }[] = []) {
    const nodes: MetaStub[] = existing.map(({ name, content }) => {
        const node = new MetaStub();
        node.attributes = { name, content };
        node.parentNode = {};
        return node;
    });
    const head = {
        querySelectorAll: vi.fn((selector: string) => {
            const name = selector === 'meta[name="description"]' ? 'description' : 'robots';
            return nodes.filter(node => !node.removed && node.attributes.name === name);
        }),
        appendChild: vi.fn((node: MetaStub) => { node.parentNode = head; nodes.push(node); return node; }),
    };
    const document = { title: 'English fallback', head, createElement: vi.fn(() => new MetaStub()) };
    return { document: document as unknown as Document, head, nodes };
}

const project: PageMetadata = {
    title: 'Starbounder | Jiří Rakučák', description: 'A 2D game prototype.', robots: 'index, follow',
};

describe('document metadata updates', () => {
    it('reuses the static description and creates the missing robots tag', () => {
        const { document, nodes, head } = fixture([{ name: 'description', content: 'English fallback' }]);
        applyDocumentMetadata(document, project);
        expect(document.title).toBe(project.title);
        expect(nodes[0].attributes.content).toBe(project.description);
        expect(nodes[1].attributes).toEqual({ name: 'robots', content: project.robots });
        expect(head.appendChild).toHaveBeenCalledOnce();
    });

    it('creates missing metadata and keeps only one tag per managed name across repeated updates', () => {
        const { document, nodes, head } = fixture();
        applyDocumentMetadata(document, project);
        applyDocumentMetadata(document, { ...project, title: 'Projekty | Jiří Rakučák', description: 'Mé projekty.' });
        expect(nodes).toHaveLength(2);
        expect(head.appendChild).toHaveBeenCalledTimes(2);
        expect(nodes[0].attributes.content).toBe('Mé projekty.');
        expect(document.title).toBe('Projekty | Jiří Rakučák');
    });

    it('removes duplicate managed tags but leaves unrelated metadata untouched', () => {
        const { document, nodes } = fixture([
            { name: 'description', content: 'Old' }, { name: 'description', content: 'Duplicate' },
            { name: 'robots', content: 'Old' }, { name: 'robots', content: 'Duplicate' },
            { name: 'author', content: 'Owner' }, { name: 'theme-color', content: '#201d22' },
        ]);
        applyDocumentMetadata(document, project);
        expect(nodes[1].remove).toHaveBeenCalledOnce();
        expect(nodes[3].remove).toHaveBeenCalledOnce();
        expect(nodes[4].attributes.content).toBe('Owner');
        expect(nodes[5].attributes.content).toBe('#201d22');
        expect(nodes[4].remove).not.toHaveBeenCalled();
    });

    it('restores indexable metadata after leaving a missing or private page', () => {
        const { document, nodes } = fixture();
        applyDocumentMetadata(document, { ...project, robots: 'noindex, follow' });
        applyDocumentMetadata(document, project);
        expect(nodes.find(node => node.attributes.name === 'robots')?.attributes.content).toBe('index, follow');
        expect(nodes).toHaveLength(2);
    });

    it('sets literal content through DOM attributes without generating HTML', () => {
        const { document, nodes } = fixture();
        const description = 'Quotes " and <script> are plain description text.';
        applyDocumentMetadata(document, { ...project, description });
        expect(nodes[0].setAttribute).toHaveBeenCalledWith('content', description);
        expect(nodes[0].attributes.content).toBe(description);
    });
});
