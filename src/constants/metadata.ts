import type { Metadata } from 'next';
import type { MetadataOpenGraph, MetadataTwitter } from '@/types';

export const BASE_URL = 'https://www.poodlepoodle.me';

export const BRAND_KEYWORDS = [
  '프론트엔드',
  '개발자',
  '최어진',
  '기술 블로그',
  '사용자',
  '인터페이스',
  '인터랙션',
  'Next.js',
  'Tailwind CSS',
  'React',
  'TypeScript',
  'JavaScript',
] as const;

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
  tags: [...BRAND_KEYWORDS],
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

export const PAGE_DESCRIPTIONS = {
  home: '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  about:
    '서비스를 구성하는 부분들 중, 사용자와 가장 가까이에서 소통하는 인터페이스를 만든다는 점에서 프론트엔드 개발에 매료되었습니다.',
  posts: '프론트엔드를 중심으로 한 좁고 깊은 기술 포스트를 다룹니다.',
  logs: '개발하면서 발견한 짧은 팁이나 회고 등 가벼운 기록을 다룹니다.',
  playgrounds: '인터랙션과 UI를 실험하는 공간입니다.',
} as const;

export const METADATA_PRESET: Metadata = {
  title: '푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  keywords: [...BRAND_KEYWORDS],
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

  /* 페이지마다 달라져야 하며 반드시 포함되어야 하는 필드 */
  // alternates: {
  //   canonical: '/',
  // },

  /* 루트 레이아웃에서만 사용되어야 하는 필드 */
  //   metadataBase: new URL(BASE_URL),
  //   verification: {
  //     google: 'VCbUA...-...-...(GSC verification code)',
  //   },
};
