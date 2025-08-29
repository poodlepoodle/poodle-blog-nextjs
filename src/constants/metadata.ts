import type { Metadata } from 'next';
import type { MetadataOpenGraph, MetadataTwitter } from '@/types';

export const BASE_URL = 'https://poodlepoodle.me';

export const METADATA_OG_WEBSITE_PRESET: MetadataOpenGraph = {
  url: '/',
  siteName: '푸들 블로그',
  locale: 'ko_KR',
  type: 'website',
  images: [
    {
      url: '/og/og-large.jpg',
      alt: 'poodle blog og image',
    },
  ],
};

export const METADATA_OG_ARTICLE_PRESET: MetadataOpenGraph = {
  url: '/',
  siteName: '푸들 블로그',
  locale: 'ko_KR',
  type: 'article',
  tags: [
    '프론트엔드',
    '개발자',
    '최어진',
    '기술 블로그',
    '사용자',
    '인터페이스',
    '인터랙션',
  ],
  authors: ['최어진'],
  section: 'Technology',
  publishedTime: '2025-01-01T00:00:00.000Z',
  modifiedTime: '2025-01-01T00:00:00.000Z',
  images: [
    {
      url: '/og/og-large.jpg',
      alt: 'poodle blog og image',
    },
  ],
};

export const METADATA_TWITTER_PRESET: MetadataTwitter = {
  card: 'summary_large_image',
};

export const METADATA_PRESET: Metadata = {
  /* 페이지마다 달라져야 하는 필드 */
  alternates: {
    canonical: '/',
  },
  title: '푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  keywords: [
    '프론트엔드',
    '개발자',
    '최어진',
    '기술 블로그',
    '사용자',
    '인터페이스',
    '인터랙션',
  ],
  openGraph: METADATA_OG_WEBSITE_PRESET,
  twitter: METADATA_TWITTER_PRESET,

  /* 고정 필드 */
  authors: [{ name: '최어진', url: 'https://github.com/poodlepoodle' }],
  creator: '최어진',
  generator: 'Next.js',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  /* 루트 레이아웃에서만 사용되어야 하는 필드 */
  //   metadataBase: new URL(BASE_URL),
  //   verification: {
  //     google: 'VCbUAJ2UDsWls7Vx-L5EvgHo9KG4dnVlgGurUZRaqRA',
  //   },
};
