import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Frame = styled.div`
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #080a0b;
  color: #fff;
`;

const Image = styled.img<{ $fit: 'cover' | 'contain'; $position: string }>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
  object-position: ${({ $position }) => $position};
`;

const Unavailable = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.6;
`;

type PortfolioImageProps = {
  src: string;
  alt: string;
  className?: string;
  fit?: 'cover' | 'contain';
  position?: string;
  loading?: 'eager' | 'lazy';
};

function ImageContent({ src, alt, className, fit = 'contain', position = 'center', loading = 'lazy' }: PortfolioImageProps) {
  const [failed, setFailed] = useState(false);
  const { t } = useTranslation('common');

  return (
    <Frame className={className}>
      {failed || !src.trim() ? (
        <Unavailable role="img" aria-label={alt}>
          {t('projectsPage.gallery.unavailable')}
        </Unavailable>
      ) : (
        <Image src={src} alt={alt} loading={loading} decoding="async"
          $fit={fit} $position={position} onError={() => setFailed(true)} />
      )}
    </Frame>
  );
}

export default function PortfolioImage(props: PortfolioImageProps) {
  return <ImageContent key={props.src} {...props} />;
}
