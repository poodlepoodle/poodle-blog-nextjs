import type { BlogPost, LogPost, PlaygroundPost, TagCount } from '@/types';

import { BASE_URL, BRAND_KEYWORDS } from '@constants/metadata';
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
  about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
  itemListElement: posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
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
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
      },
    },
  })),
});

export const blogListStructuredData = (
  posts: BlogPost[],
  tags: TagCount[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '포스트 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  url: `${BASE_URL}/posts`,
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
  about: tags.map(tag => ({ '@type': 'Thing' as const, name: tag.name })),
  itemListElement: posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
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
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
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
    url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
  },
  url: `${BASE_URL}/posts/${post.slug}`,
  about: post.tags.map(tag => ({ '@type': 'Thing' as const, name: tag })),
  articleSection: 'Technology',
  inLanguage: 'ko-KR',
  articleBody: post.content,
});

export const playgroundListStructuredData = (posts: PlaygroundPost[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '플레이그라운드 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  url: `${BASE_URL}/playgrounds`,
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
  about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
  itemListElement: posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'BlogPosting',
      mainEntityOfPage: `${BASE_URL}/playgrounds/${post.slug}`,
      url: `${BASE_URL}/playgrounds/${post.slug}`,
      headline: post.title,
      datePublished: convertToISODate(post.publishedAt),
      dateModified: convertToISODate(post.publishedAt),
      author: {
        '@type': 'Person',
        name: '최어진',
        url: `${BASE_URL}/about`,
      },
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/playground/${post.slug}/thumbnail-large.webp`,
      },
    },
  })),
});

export const playgroundPostStructuredData = (post: PlaygroundPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/playgrounds/${post.slug}`,
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
    url: `${BASE_URL}/playground/${post.slug}/thumbnail-large.webp`,
  },
  url: `${BASE_URL}/playgrounds/${post.slug}`,
  about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
  articleSection: 'Technology',
  inLanguage: 'ko-KR',
  articleBody: post.content,
});

export const logListStructuredData = (posts: LogPost[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '로그 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
  url: `${BASE_URL}/logs`,
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
  about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
  itemListElement: posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'BlogPosting',
      mainEntityOfPage: `${BASE_URL}/logs/${post.slug}`,
      url: `${BASE_URL}/logs/${post.slug}`,
      headline: post.title,
      description: post.description,
      datePublished: convertToISODate(post.publishedAt),
      dateModified: convertToISODate(post.publishedAt),
      author: {
        '@type': 'Person',
        name: '최어진',
        url: `${BASE_URL}/about`,
      },
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og/og-large.jpg`,
      },
    },
  })),
});

export const logPostStructuredData = (post: LogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/logs/${post.slug}`,
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
    url: `${BASE_URL}/og/og-large.jpg`,
  },
  url: `${BASE_URL}/logs/${post.slug}`,
  about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
  articleSection: 'Technology',
  inLanguage: 'ko-KR',
  articleBody: post.content,
});
