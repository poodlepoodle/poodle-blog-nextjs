'use client';

import Link from 'next/link';
import { useGrayscaleReveal } from '@hooks/useGrayscaleReveal';
import { ImageWithSkeleton } from '@components/image-with-skeleton';

export const Banner = () => {
  const { GrayscaleRevealWrapper } = useGrayscaleReveal();

  return (
    <Link
      href={`/about`}
      className="group relative h-[6.25rem] w-full shrink-0 overflow-hidden rounded-lg"
    >
      <GrayscaleRevealWrapper className="h-full w-full">
        <ImageWithSkeleton
          src={`/components/banner/banner-background.webp`}
          alt="blog home banner image"
          className="border-none"
        />
      </GrayscaleRevealWrapper>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[2.5rem]">
        <span className="text-center text-sm font-medium break-keep text-gray-3 transition-colors duration-300 group-hover:text-skyblue">
          애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.
        </span>
      </div>
    </Link>
  );
};
