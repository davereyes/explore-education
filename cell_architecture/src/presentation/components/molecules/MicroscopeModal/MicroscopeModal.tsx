import { useEffect } from 'react';
import type { MicroscopeImage } from '@/domain/entities';
import { useLanguage } from '@/presentation/context/LanguageContext';
import './MicroscopeModal.css';

interface MicroscopeModalProps {
  image: MicroscopeImage | null;
  onClose: () => void;
}

export default function MicroscopeModal({ image, onClose }: MicroscopeModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image, onClose]);

  if (!image || !image.imageUrl) return null;

  return (
    <div className="ca-micro-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ca-micro-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="ca-micro-modal__close"
          onClick={onClose}
          aria-label={t('Cerrar', 'Close')}
        >
          ×
        </button>
        <img src={image.imageUrl} alt={t(image.label, image.labelEn)} />
        <div className="ca-micro-modal__caption">
          <div className="ca-micro-modal__title">{t(image.label, image.labelEn)}</div>
          {image.credit && (
            <a
              className="ca-micro-modal__credit"
              href={image.credit.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              {image.credit.author} · {image.credit.license}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
