'use client';

import styles from './post-grid-item.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function PostGridItem({ post, className }) {
  const { title, slug, publishedAt, updated } = post;

  const containerRef = useRef(null);
  const isHovered = useRef(false);
  const frameRef = useRef(null);

  const handleMouseMove = e => {
    if (!isHovered.current) return;

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <Link
      href={`/posts/${slug}`}
      className={`${styles.layout} ${className || ''}`}
    >
      <div className={styles.container}>
        <div className={styles.thumbnail__container} ref={containerRef}>
          <Image
            src={`/blog/posts/${slug}/thumbnail-large.jpg`}
            alt="post thumbnail"
            fill
            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        </div>

        <span className={styles.date}>{publishedAt}</span>
        <div className={styles.title}>
          {updated && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
            </svg>
          )}
          <span className={styles.title_text}>{title}</span>
        </div>
      </div>
    </Link>
  );
}
