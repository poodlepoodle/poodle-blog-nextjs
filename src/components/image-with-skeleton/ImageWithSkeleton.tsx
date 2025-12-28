'use client';

import { Skeleton } from '@components/common/skeleton';
import { useState } from 'react';
import { ResponsiveImage } from '@components/common/responsive-image';

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  noShadow?: boolean;
};

export const ImageWithSkeleton = ({
  src,
  alt,
  noShadow = false,
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <>
      {!loaded && <Skeleton fill borderRadius={8} />}
      <ResponsiveImage
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`overflow-hidden rounded-lg object-cover transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'} ${noShadow ? '' : 'shadow-natural'}`}
      />
    </>
  );
};
