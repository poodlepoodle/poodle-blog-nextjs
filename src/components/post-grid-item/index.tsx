'use client';

import type { Post } from '@/types';

import styles from './post-grid-item.module.css';
import Link from 'next/link';
import Icon from '@components/icon';
import ResponsiveImage from '@components/responsive-image';
import useGrayscaleReveal from '@hooks/useGrayscaleReveal';

const UpdatedIcon = () => {
  return (
    <Icon width={5} height={5} color="var(--color-skyblue)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" fill="none">
        <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
      </svg>
    </Icon>
  );
};

interface PostGridItemProps {
  post: Post;
  className: string;
}

export default function PostGridItem({ post, className }: PostGridItemProps) {
  const { title, slug, publishedAt, updated } = post;
  const { containerRef } = useGrayscaleReveal<HTMLDivElement>();

  const isPlaygroundPost = !('description' in post);
  const postPath = isPlaygroundPost ? 'playground' : 'posts';

  return (
    <Link
      href={`/${postPath}/${slug}`}
      className={`${styles.layout} ${className || ''}`}
    >
      <div className={styles.container}>
        <div className={styles.thumbnail__container} ref={containerRef}>
          <ResponsiveImage
            src={`/${postPath}/${slug}/thumbnail-large.jpg`}
            alt="post thumbnail"
          />
        </div>

        <span className={styles.date}>{publishedAt}</span>
        <div className={styles.title}>
          {updated && <UpdatedIcon />}
          <span className={styles.title_text}>{title}</span>
        </div>
      </div>
    </Link>
  );
}
