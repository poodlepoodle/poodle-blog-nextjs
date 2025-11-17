'use client';

import { createPortal } from 'react-dom';
import { usePostStore } from '@stores/post-store';
import { useEffect, useState } from 'react';

export const PostImageModal = () => {
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
      className="fixed inset-0 z-9999 flex animate-fade-in cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div className="relative h-auto w-auto animate-fade-in-up">
        <div className="relative overflow-hidden rounded-lg shadow-natural">
          <img
            src={imageModal.data.src}
            alt={imageModal.data.alt}
            className="block h-auto max-h-full w-auto max-w-full object-contain"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
