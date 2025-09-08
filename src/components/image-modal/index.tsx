'use client';

import styles from './image-modal.module.css';
import { createPortal } from 'react-dom';
import { usePostStore } from '@stores/post-store';
import { useEffect, useState } from 'react';

export default function ImageModal() {
  const imageModal = usePostStore(state => state.imageModal);
  const closeImageModal = usePostStore(state => state.closeImageModal);
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
    <div
      className={`${styles.background} animate-fade-in`}
      onClick={handleBackgroundClick}
    >
      <div className={`${styles.modal} animate-fade-in-up`}>
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
