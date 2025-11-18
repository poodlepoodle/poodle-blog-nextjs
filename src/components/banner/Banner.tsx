'use client';

import styles from './banner.module.css';
import Link from 'next/link';
import useGrayscaleReveal from '@hooks/useGrayscaleReveal';
import { ImageWithSkeleton } from '@components/image-with-skeleton';

export const Banner = () => {
  const { containerRef } = useGrayscaleReveal<HTMLAnchorElement>();

  return (
    <Link
      href={`/about`}
      ref={containerRef}
      className={`group relative h-[6.25rem] w-full shrink-0 overflow-hidden rounded-lg grayscale-100 transition-all duration-300 hover:grayscale-0 ${
        styles.container
      }`}
    >
      <ImageWithSkeleton
        src={`/components/banner/banner-background.jpg`}
        alt="blog home banner image"
      />
      <div className="absolute inset-0 z-2 flex items-center justify-center px-[2.5rem]">
        <span className="text-center text-sm font-medium break-keep text-gray-3 transition-colors duration-300 group-hover:text-skyblue">
          애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.
        </span>
      </div>
    </Link>
  );
};
