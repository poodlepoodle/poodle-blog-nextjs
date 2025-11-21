import type { ImageProps } from 'next/image';

import Image from 'next/image';

const isGif = (imageUrl: string) => imageUrl?.toLowerCase().endsWith('.gif');

type ResponsiveImageProps = {
  src: string;
  alt: string;
} & Omit<ImageProps, 'src' | 'alt' | 'fill'>;

export const ResponsiveImage = ({
  src,
  alt,
  className = 'object-cover',
  ...props
}: ResponsiveImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      {...props}
      unoptimized={isGif(src)}
    />
  );
};
