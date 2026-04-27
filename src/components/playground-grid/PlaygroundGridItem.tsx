'use client';

import type { PlaygroundPost, WithoutContent } from '@/types';

import Link from 'next/link';
import { ImageWithSkeleton } from '@components/image-with-skeleton';
import { useGrayscaleReveal } from '@hooks/useGrayscaleReveal';
import { cn } from '@/utils/cn';

type PlaygroundGridItemProps = {
  post: WithoutContent<PlaygroundPost>;
  className?: string;
};

export const PlaygroundGridItem = ({
  post,
  className = '',
}: PlaygroundGridItemProps) => {
  const { title, slug } = post;
  const { GrayscaleRevealWrapper } = useGrayscaleReveal();

  return (
    <Link
      href={`/playgrounds/${slug}`}
      className={cn('group flex w-full flex-col', className)}
    >
      <GrayscaleRevealWrapper className="aspect-square w-full min-w-thumbnail overflow-hidden rounded-lg">
        <ImageWithSkeleton
          src={`/playground/${slug}/thumbnail-large.webp`}
          alt={`${title} thumbnail image`}
          className="border-none"
        />
      </GrayscaleRevealWrapper>
    </Link>
  );
};
