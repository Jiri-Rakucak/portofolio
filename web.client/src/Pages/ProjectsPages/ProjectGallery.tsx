import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectAsset } from '../../content/contentTypes';
import { ArrowLeft, ArrowRight } from '../../Components/Icons/Arrows';
import {
  GalleryGrid, Screenshot, ImageButton, Thumbnail, Caption, Viewer,
  ViewerToolbar, Controls, IconButton, FullImage, ViewerCaption,
} from './ProjectGallery.styles';

type GalleryImage = ProjectAsset & { src: string };

function ImageViewer({ images, index, onSelect, onClose }: {
  images: GalleryImage[];
  index: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useTranslation('common');
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const image = images[index];

  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      if (element?.open) element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <Viewer ref={dialog} aria-label={t('projectsPage.galleryTitle')} aria-describedby={captionId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          onSelect(Math.max(0, Math.min(images.length - 1, index + (event.key === 'ArrowLeft' ? -1 : 1))));
        }
      }}>
      <ViewerToolbar>
        <span aria-live="polite">{t('projectsPage.gallery.counter', { current: index + 1, total: images.length })}</span>
        <Controls>
          <IconButton type="button" disabled={index === 0} onClick={() => onSelect(index - 1)}
            aria-label={t('projectsPage.gallery.previous')} title={t('projectsPage.gallery.previous')}>
            <ArrowLeft size={18} />
          </IconButton>
          <IconButton type="button" disabled={index === images.length - 1} onClick={() => onSelect(index + 1)}
            aria-label={t('projectsPage.gallery.next')} title={t('projectsPage.gallery.next')}>
            <ArrowRight size={18} />
          </IconButton>
          <IconButton type="button" autoFocus onClick={onClose}
            aria-label={t('projectsPage.gallery.close')} title={t('projectsPage.gallery.close')}>
            <span aria-hidden="true">&times;</span>
          </IconButton>
        </Controls>
      </ViewerToolbar>
      <FullImage src={image.src} alt={image.alt || image.label} loading="eager" />
      <ViewerCaption>
        <span id={captionId}>{image.label}</span>
        <a href={image.src} target="_blank" rel="noreferrer">{t('projectsPage.gallery.original')}</a>
      </ViewerCaption>
    </Viewer>
  );
}

export default function ProjectGallery({ assets }: { assets: ProjectAsset[] }) {
  const { t } = useTranslation('common');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = assets.filter((asset): asset is GalleryImage => asset.type === 'image' && Boolean(asset.src?.trim()));

  if (!images.length) return null;

  return (
    <>
      <GalleryGrid>
        {images.map((image, index) => (
          <Screenshot key={image.src}>
            <ImageButton type="button" onClick={() => setSelectedIndex(index)}
              aria-label={t('projectsPage.gallery.openImage', { label: image.label })}>
              <Thumbnail src={image.src} alt={image.alt || image.label} />
            </ImageButton>
            <Caption>{image.label}</Caption>
          </Screenshot>
        ))}
      </GalleryGrid>
      {selectedIndex !== null && images[selectedIndex] && (
        <ImageViewer images={images} index={selectedIndex} onSelect={setSelectedIndex} onClose={() => setSelectedIndex(null)} />
      )}
    </>
  );
}
