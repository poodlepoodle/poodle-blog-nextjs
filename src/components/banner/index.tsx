'use client';

import styles from './banner.module.css';
import Link from 'next/link';
import ResponsiveImage from '@components/responsive-image';
import useGrayscaleReveal from '@hooks/useGrayscaleReveal';

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
    imageSrc: '/components/banner/banner-background.jpg',
    text: '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  },
];

export default function Banner() {
  const { containerRef } = useGrayscaleReveal<HTMLAnchorElement>();
  const bannerItem = BANNER_DATA[0]!;

  return (
    <Link
      href={bannerItem.href}
      className={styles.container}
      ref={containerRef}
    >
      <ResponsiveImage src={bannerItem.imageSrc} alt="blog home banner image" />
      <span className={styles.banner__text}>{bannerItem.text}</span>
    </Link>
  );
}
