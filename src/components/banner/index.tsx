'use client';

import styles from './banner.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface BannerData {
  id: number;
  href: string;
  imageSrc: string;
  text: string;
}

const BANNER_DATA: BannerData[] = [
  {
    id: 1,
    href: '/about',
    imageSrc: '/blog/banner.jpg',
    text: '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  },
];

export default function Banner() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const isHovered = useRef<boolean>(false);
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
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

  const bannerItem = BANNER_DATA[0]!;

  return (
    <Link
      href={bannerItem.href}
      className={styles.container}
      ref={containerRef}
    >
      <Image
        src={bannerItem.imageSrc}
        alt="blog home banner image"
        fill
        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <span className={styles.banner__text}>{bannerItem.text}</span>
    </Link>
  );
}
