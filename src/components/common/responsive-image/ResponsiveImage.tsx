import type { ImageProps } from 'next/image';

import Image from 'next/image';
import { cn } from '@/utils/cn';

const isGif = (imageUrl: string) => imageUrl?.toLowerCase().endsWith('.gif');

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
} & Omit<ImageProps, 'src' | 'alt' | 'className' | 'fill'>;

export const ResponsiveImage = ({
  src,
  alt,
  className = '',
  ...props
}: ResponsiveImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn('object-cover',
        className)}
      {...props}
      unoptimized={isGif(src)}
    />
  );
};
