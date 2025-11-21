'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import { usePostStore } from '@stores/post-store';

type MDXImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const MDXImage = ({ src, alt, width, height }: MDXImageProps) => {
  const openImageModal = usePostStore(state => state.openImageModal);
  const setImageModalData = usePostStore(state => state.setImageModalData);

  const url = new URL(src, 'https://poodlepoodle.me');
  const widthParam = url.searchParams.get('width');
  const imageWidth = widthParam ? parseInt(widthParam) : width;
  const isGif = url.pathname.toLowerCase().endsWith('.gif');

  const handleImageClick = () => {
    setImageModalData({ src, alt });
    openImageModal();
  };

  const baseProps = {
    src,
    alt,
    ...(isGif && { unoptimized: true }),
    onClick: handleImageClick,
  } satisfies ImageProps;

  if (imageWidth) {
    return (
      <Image
        {...baseProps}
        width={imageWidth}
        height={height || 100}
        alt={alt}
        className="relative! m-0! h-auto! cursor-pointer rounded-lg border-[0.5px] border-gray-2 object-contain!"
      />
    );
  }

  return (
    <Image
      {...baseProps}
      fill
      alt={alt}
      className="relative! m-0! h-auto! cursor-pointer rounded-lg border-[0.5px] border-gray-2 object-contain!"
    />
  );
};
