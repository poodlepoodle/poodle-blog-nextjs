import type { BlogPost, PlaygroundPost } from '@/types';

import { BASE_URL } from '@constants/metadata';
import { convertToISODate } from '@utils/format-date';

export const blogStructuredData = (posts: BlogPost[]) => ({
  '@context': 'https://schema.org',
  '@type': ['WebSite', 'ItemList'],
  name: '푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  url: BASE_URL,
  author: {
    '@type': 'Person',
    name: '최어진',
    url: `${BASE_URL}/about`,
  },
  publisher: {
    '@type': 'Organization',
    name: '푸들 블로그',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/apple-icon.png`,
    },
  },
  inLanguage: 'ko-KR',
  about: [
    { '@type': 'Thing', name: '프론트엔드' },
    { '@type': 'Thing', name: '개발자' },
    { '@type': 'Thing', name: '최어진' },
    { '@type': 'Thing', name: '기술 블로그' },
    { '@type': 'Thing', name: '사용자' },
    { '@type': 'Thing', name: '인터페이스' },
    { '@type': 'Thing', name: '인터랙션' },
  ],
  itemListElement: posts.map(post => ({
    '@type': 'ListItem',
    position: 1,
    item: {
      '@type': 'BlogPosting',
      mainEntityOfPage: `${BASE_URL}/posts/${post.slug}`,
      url: `${BASE_URL}/posts/${post.slug}`,
      headline: post.title,
      description: post.description,
      keywords: post.tags.join(', '),
      datePublished: convertToISODate(post.publishedAt),
      dateModified: convertToISODate(post.publishedAt),
      author: {
        '@type': 'Person',
        name: '최어진',
        url: `${BASE_URL}/about`,
      },
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.jpg`,
      },
    },
  })),
});

export const blogPostStructuredData = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/posts/${post.slug}`,
  },
  author: {
    '@type': 'Person',
    name: '최어진',
    url: `${BASE_URL}/about`,
  },
  publisher: {
    '@type': 'Organization',
    name: '푸들 블로그',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/apple-icon.png`,
    },
  },
  datePublished: convertToISODate(post.publishedAt),
  dateModified: convertToISODate(post.publishedAt),
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.jpg`,
  },
  url: `${BASE_URL}/posts/${post.slug}`,
  about: post.tags.map(tag => ({
    '@type': 'Thing',
    name: tag,
  })),
  articleSection: 'Technology',
  inLanguage: 'ko-KR',
  articleBody: post.content,
});

export const playgroundPostStructuredData = (post: PlaygroundPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/playground/${post.slug}`,
  },
  author: {
    '@type': 'Person',
    name: '최어진',
    url: `${BASE_URL}/about`,
  },
  publisher: {
    '@type': 'Organization',
    name: '푸들 블로그',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/apple-icon.png`,
    },
  },
  datePublished: convertToISODate(post.publishedAt),
  dateModified: convertToISODate(post.publishedAt),
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/playground/${post.slug}/thumbnail-large.jpg`,
  },
  url: `${BASE_URL}/playground/${post.slug}`,
  about: [
    { '@type': 'Thing', name: '프론트엔드' },
    { '@type': 'Thing', name: '개발자' },
    { '@type': 'Thing', name: '최어진' },
    { '@type': 'Thing', name: '기술 블로그' },
    { '@type': 'Thing', name: '사용자' },
    { '@type': 'Thing', name: '인터페이스' },
    { '@type': 'Thing', name: '인터랙션' },
  ],
  articleSection: 'Technology',
  inLanguage: 'ko-KR',
  articleBody: post.content,
});
