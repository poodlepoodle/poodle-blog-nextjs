'use client';

import type { BlogContextType } from '@contexts/types';

import styles from './image-modal.module.css';
import { createPortal } from 'react-dom';
import { useBlogContext } from '@contexts/BlogContext';
import { useEffect, useState } from 'react';

export default function ImageModal() {
  const { imageModal, closeImageModal } = useBlogContext() as BlogContextType;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (imageModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [imageModal.isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeImageModal();
    }
  };

  if (!mounted || !imageModal.isOpen || !imageModal.data) {
    return null;
  }

  return createPortal(
    <div className={styles.background} onClick={handleBackgroundClick}>
      <div className={styles.modal}>
        <div className={styles.image__container}>
          <img
            src={imageModal.data.src}
            alt={imageModal.data.alt}
            className={styles.image}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
