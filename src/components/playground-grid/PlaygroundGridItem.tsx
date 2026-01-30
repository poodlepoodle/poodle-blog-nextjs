'use client';

import type { Post } from '@/types';

import styles from './playground-grid-item.module.css';
import Link from 'next/link';
import { ImageWithSkeleton } from '@components/image-with-skeleton';
import { useGrayscaleReveal } from '@hooks/useGrayscaleReveal';
import { cn } from '@/utils/cn';

type PlaygroundGridItemProps = {
  post: Post;
  className?: string;
};

export const PlaygroundGridItem = ({
  post,
  className = '',
}: PlaygroundGridItemProps) => {
  const { slug } = post;
  const { containerRef } = useGrayscaleReveal<HTMLDivElement>();

  return (
    <Link
      href={`/playground/${slug}`}
      className={cn('group flex w-full flex-col', className)}
    >
      <div
        ref={containerRef}
        className={cn(
          'relative aspect-square w-full min-w-thumbnail rounded-lg grayscale-100 transition-all duration-600 group-hover:grayscale-0',
          styles.thumbnail__container
        )}
      >
        <ImageWithSkeleton
          src={`/playground/${slug}/thumbnail-large.webp`}
          alt="post thumbnail"
          className="border-none"
        />
      </div>
    </Link>
  );
};
