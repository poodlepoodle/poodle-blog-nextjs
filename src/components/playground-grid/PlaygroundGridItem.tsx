'use client';

import type { Post } from '@/types';

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
  const { GrayscaleRevealWrapper } = useGrayscaleReveal();

  return (
    <Link
      href={`/playground/${slug}`}
      className={cn('group flex w-full flex-col', className)}
    >
      <GrayscaleRevealWrapper className="aspect-square w-full min-w-thumbnail overflow-hidden rounded-lg">
        <ImageWithSkeleton
          src={`/playground/${slug}/thumbnail-large.webp`}
          alt="post thumbnail"
          className="border-none"
        />
      </GrayscaleRevealWrapper>
    </Link>
  );
};
