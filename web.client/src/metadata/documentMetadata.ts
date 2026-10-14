import type { PageMetadata } from './pageMetadata';

function setMeta(document: Document, name: 'description' | 'robots', content: string) {
    const existing = Array.from(document.head.querySelectorAll<HTMLMetaElement>(`meta[name="${name}"]`));
    const meta = existing.shift() ?? document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    if (!meta.parentNode) document.head.appendChild(meta);
    for (const duplicate of existing) duplicate.remove();
}

export function applyDocumentMetadata(document: Document, metadata: PageMetadata) {
    document.title = metadata.title;
    setMeta(document, 'description', metadata.description);
    setMeta(document, 'robots', metadata.robots);
}
