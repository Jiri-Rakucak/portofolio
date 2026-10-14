import { useEffect } from 'react';
import { useMatches } from 'react-router';
import { useLocale } from '../i18n/useLocale';
import { resolveMatchedMetadata } from './pageMetadata';
import { applyDocumentMetadata } from './documentMetadata';

export default function PageMetadata() {
    const { locale } = useLocale();
    const matches = useMatches();
    const { title, description, robots } = resolveMatchedMetadata(matches, locale);

    useEffect(() => {
        applyDocumentMetadata(document, { title, description, robots });
    }, [title, description, robots]);

    return null;
}
