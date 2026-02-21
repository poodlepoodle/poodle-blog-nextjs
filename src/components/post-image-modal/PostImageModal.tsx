'use client';

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { usePostStore } from '@stores/post-store';
import { useEffect, useState } from 'react';
import { useKeyboardAction } from '@hooks/useKeyboardAction';

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 40 40"
    className="fill-none"
  >
    <mask
      id="mask0_70_846"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <rect width="40" height="40" className="fill-white" />
    </mask>
    <g mask="url(#mask0_70_846)">
      <path
        d="M10.472 31.4721L8.52783 29.5279L18.0553 20L8.52783 10.4721L10.472 8.52792L19.9999 18.0554L29.5278 8.52792L31.472 10.4721L21.9445 20L31.472 29.5279L29.5278 31.4721L19.9999 21.9446L10.472 31.4721Z"
        className="fill-white"
      />
    </g>
  </svg>
);

export const PostImageModal = () => {
  const isImageModalOpen = usePostStore(state => state.isImageModalOpen);
  const imageModalData = usePostStore(state => state.imageModalData);
  const closeImageModal = usePostStore(state => state.closeImageModal);

  const [mounted, setMounted] = useState<boolean>(false);

  const _ = useKeyboardAction({
    Escape: () => {
      if (!isImageModalOpen) return;
      closeImageModal();
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  const handleClickModalBackground = (e: React.MouseEvent) => {
    closeImageModal();
  };

  if (!mounted || !isImageModalOpen || !imageModalData) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-dimmed flex h-full w-full animate-fade-in cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.7)] px-[2rem] py-[2rem] backdrop-blur-sm tablet:px-[5rem] tablet:py-[4rem]"
      onClick={handleClickModalBackground}
    >
      <button className="absolute top-[1rem] right-[1rem] cursor-pointer p-[1rem]">
        <CloseIcon />
      </button>

      <div className="relative z-modal flex h-full w-full max-w-[80rem] animate-fade-in-up items-center">
        <div className="relative h-full w-full flex-1">
          <Image
            src={imageModalData.src}
            alt={imageModalData.alt}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>,
    document.body
  );
};
