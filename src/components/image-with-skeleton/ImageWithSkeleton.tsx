'use client';

import { Skeleton } from '@components/common/skeleton';
import { useState } from 'react';
import { ResponsiveImage } from '@components/common/responsive-image';
import { cn } from '@/utils/cn';

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  className?: string;
};

export const ImageWithSkeleton = ({
  src,
  alt,
  className = '',
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton fill borderRadius={8} />}
      <ResponsiveImage
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          'overflow-hidden rounded-lg border-[0.5px] border-gray-2 object-cover transition-opacity duration-500 ease-in-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </>
  );
};
