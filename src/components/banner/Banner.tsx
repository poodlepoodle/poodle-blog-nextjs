'use client';

import styles from './banner.module.css';
import Link from 'next/link';
import { useGrayscaleReveal } from '@hooks/useGrayscaleReveal';
import { ImageWithSkeleton } from '@components/image-with-skeleton';
import { cn } from '@/utils/cn';

export const Banner = () => {
  const { containerRef } = useGrayscaleReveal<HTMLDivElement>();

  return (
    <Link
      href={`/about`}
      className={cn(
        'group relative h-[6.25rem] w-full shrink-0 overflow-hidden rounded-lg',
        styles.container
      )}
    >
      <div ref={containerRef} className={styles.image__container}>
        <div className={styles.grayscale__layer}>
          <ImageWithSkeleton
            src={`/components/banner/banner-background.webp`}
            alt="blog home banner image grayscale"
            className="border-none"
          />
        </div>
        <div className={styles.color__layer}>
          <ImageWithSkeleton
            src={`/components/banner/banner-background.webp`}
            alt="blog home banner image"
            className="border-none"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-[2.5rem]">
        <span className="text-center text-sm font-medium break-keep text-gray-3 transition-colors duration-300 group-hover:text-skyblue">
          애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.
        </span>
      </div>
    </Link>
  );
};
