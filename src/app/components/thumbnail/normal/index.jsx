'use client';

import styles from './normal.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Normal({ title, slug, date, updated }) {
  const containerRef = useRef(null);
  const isHovered = useRef(false);
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
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
    <Link href={`/blog/${slug}`}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container} ref={containerRef}>
            <Image
              src={`/blog/posts/${slug}/thumbnail.jpg`}
              alt="post thumbnail"
              fill
            />
          </div>

          <span className={styles.date}>{date}</span>
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
            <span>{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
