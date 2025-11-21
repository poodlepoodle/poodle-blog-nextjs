'use client';

import type { Post } from '@/types';

import styles from './post-grid-item.module.css';
import Link from 'next/link';
import { ImageWithSkeleton } from '@components/image-with-skeleton';
import { useGrayscaleReveal } from '@hooks/useGrayscaleReveal';

const UpdatedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 6 6"
      fill="none"
    >
      <circle cx="3" cy="3" r="3" className="fill-skyblue" />
    </svg>
  );
};

type PostGridItemProps = {
  post: Post;
  className: string;
};

export const PostGridItem = ({ post, className }: PostGridItemProps) => {
  const { title, slug, publishedAt, updated } = post;
  const { containerRef } = useGrayscaleReveal<HTMLDivElement>();

  const isPlaygroundPost = !('description' in post);
  const postPath = isPlaygroundPost ? 'playground' : 'posts';

  return (
    <Link
      href={`/${postPath}/${slug}`}
      className={`group flex w-full flex-col ${className ?? ''}`}
    >
      <div
        className={`relative h-thumbnail w-full min-w-thumbnail grayscale-100 transition-all duration-600 group-hover:grayscale-0 ${
          styles.thumbnail__container
        }`}
        ref={containerRef}
      >
        <ImageWithSkeleton
          src={`/${postPath}/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
        />
      </div>

      <span className="mt-[1rem] text-xs font-normal text-black">
        {publishedAt}
      </span>
      <div className="mt-[0.25rem] flex items-center gap-[0.5rem]">
        {updated && <UpdatedIcon />}
        <span className="line-clamp-1 text-lg font-semibold break-keep text-black tablet:text-xl">
          {title}
        </span>
      </div>
    </Link>
  );
};
