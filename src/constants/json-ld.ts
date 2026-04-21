import type { Graph, ImageObject, Organization, Person } from 'schema-dts';
import type { BlogPost, LogPost, PlaygroundPost, TagCount } from '@/types';

import { BASE_URL, BRAND_KEYWORDS } from '@constants/metadata';
import { convertToISODate, getPostLastModifiedIso } from '@utils/format-date';

const SITE_NAME = '푸들 블로그';

const LOGO: ImageObject = {
  '@type': 'ImageObject',
  name: `${SITE_NAME} 로고`,
  url: `${BASE_URL}/apple-icon.png`,
  width: '512',
  height: '512',
};

const PUBLISHER: Organization = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: BASE_URL,
  logo: LOGO,
};

const AUTHOR: Person = {
  '@type': 'Person',
  '@id': `${BASE_URL}/about#person`,
  name: '최어진',
  url: `${BASE_URL}/about`,
  sameAs: ['https://github.com/poodlepoodle'],
};

export const aboutStructuredData = (): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${BASE_URL}/about#profilepage`,
      url: `${BASE_URL}/about`,
      name: '소개 ••• 푸들 블로그',
      mainEntity: {
        '@type': 'Person',
        '@id': `${BASE_URL}/about#person`,
        name: '최어진',
        jobTitle: 'Frontend Developer',
        url: `${BASE_URL}/about`,
        sameAs: ['https://github.com/poodlepoodle'],
      },
    },
  ],
});

export const blogStructuredData = (posts: BlogPost[]): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: SITE_NAME,
      description:
        '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
      url: BASE_URL,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'ItemList',
      name: SITE_NAME,
      url: BASE_URL,
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/posts/${post.slug}#article`,
          name: post.title,
          mainEntityOfPage: `${BASE_URL}/posts/${post.slug}`,
          url: `${BASE_URL}/posts/${post.slug}`,
          headline: post.title,
          description: post.description,
          keywords: post.tags.join(', '),
          datePublished: convertToISODate(post.publishedAt),
          dateModified: getPostLastModifiedIso(post),
          author: AUTHOR,
          image: {
            '@type': 'ImageObject',
            name: post.title,
            url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
            width: 1896,
            height: 912,
          },
        },
      })),
    },
  ],
});

export const blogListStructuredData = (
  posts: BlogPost[],
  tags: TagCount[]
): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: '포스트 ••• 푸들 블로그',
      description:
        '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
      url: `${BASE_URL}/posts`,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'ko-KR',
      about: tags.map(tag => ({ '@type': 'Thing' as const, name: tag.name })),
    },
    {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/posts/${post.slug}#article`,
          name: post.title,
          mainEntityOfPage: `${BASE_URL}/posts/${post.slug}`,
          url: `${BASE_URL}/posts/${post.slug}`,
          headline: post.title,
          description: post.description,
          keywords: post.tags.join(', '),
          datePublished: convertToISODate(post.publishedAt),
          dateModified: getPostLastModifiedIso(post),
          author: AUTHOR,
          image: {
            '@type': 'ImageObject',
            name: post.title,
            url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
            width: '1896',
            height: '912',
          },
        },
      })),
    },
  ],
});

export const blogPostStructuredData = (post: BlogPost): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: '포스트',
          item: `${BASE_URL}/posts`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${BASE_URL}/posts/${post.slug}`,
        },
      ],
    },
    {
      '@type': 'BlogPosting',
      '@id': `${BASE_URL}/posts/${post.slug}#article`,
      name: post.title,
      headline: post.title,
      description: post.description,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/posts/${post.slug}`,
        name: post.title,
      },
      author: AUTHOR,
      publisher: PUBLISHER,
      datePublished: convertToISODate(post.publishedAt),
      dateModified: getPostLastModifiedIso(post),
      image: {
        '@type': 'ImageObject',
        name: post.title,
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.webp`,
        width: '1896',
        height: '912',
      },
      url: `${BASE_URL}/posts/${post.slug}`,
      about: post.tags.map(tag => ({ '@type': 'Thing' as const, name: tag })),
      articleSection: 'Technology',
      inLanguage: 'ko-KR',
      articleBody: post.content,
    },
  ],
});

export const playgroundListStructuredData = (
  posts: PlaygroundPost[]
): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: '플레이그라운드 ••• 푸들 블로그',
      description:
        '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
      url: `${BASE_URL}/playgrounds`,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'ko-KR',
      about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
    },
    {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/playgrounds/${post.slug}#article`,
          name: post.title,
          mainEntityOfPage: `${BASE_URL}/playgrounds/${post.slug}`,
          url: `${BASE_URL}/playgrounds/${post.slug}`,
          headline: post.title,
          datePublished: convertToISODate(post.publishedAt),
          dateModified: getPostLastModifiedIso(post),
          author: AUTHOR,
          image: {
            '@type': 'ImageObject',
            name: post.title,
            // 이미지 파일은 public/playground/ (단수) 경로에 저장됨
            url: `${BASE_URL}/playground/${post.slug}/thumbnail-large.webp`,
            width: '1896',
            height: '912',
          },
        },
      })),
    },
  ],
});

export const playgroundPostStructuredData = (post: PlaygroundPost): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: '플레이그라운드',
          item: `${BASE_URL}/playgrounds`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${BASE_URL}/playgrounds/${post.slug}`,
        },
      ],
    },
    {
      '@type': 'BlogPosting',
      '@id': `${BASE_URL}/playgrounds/${post.slug}#article`,
      name: post.title,
      headline: post.title,
      description:
        '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/playgrounds/${post.slug}`,
        name: post.title,
      },
      author: AUTHOR,
      publisher: PUBLISHER,
      datePublished: convertToISODate(post.publishedAt),
      dateModified: getPostLastModifiedIso(post),
      image: {
        '@type': 'ImageObject',
        name: post.title,
        // 이미지 파일은 public/playground/ (단수) 경로에 저장됨
        url: `${BASE_URL}/playground/${post.slug}/thumbnail-large.webp`,
        width: '1896',
        height: '912',
      },
      url: `${BASE_URL}/playgrounds/${post.slug}`,
      about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
      articleSection: 'Technology',
      inLanguage: 'ko-KR',
      articleBody: post.content,
    },
  ],
});

export const logListStructuredData = (posts: LogPost[]): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: '로그 ••• 푸들 블로그',
      description:
        '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
      url: `${BASE_URL}/logs`,
      author: AUTHOR,
      publisher: PUBLISHER,
      inLanguage: 'ko-KR',
      about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
    },
    {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${BASE_URL}/logs/${post.slug}#article`,
          name: post.title,
          mainEntityOfPage: `${BASE_URL}/logs/${post.slug}`,
          url: `${BASE_URL}/logs/${post.slug}`,
          headline: post.title,
          description: post.description,
          datePublished: convertToISODate(post.publishedAt),
          dateModified: getPostLastModifiedIso(post),
          author: AUTHOR,
          image: {
            '@type': 'ImageObject',
            name: post.title,
            url: `${BASE_URL}/og/og-large.jpg`,
            width: '1896',
            height: '912',
          },
        },
      })),
    },
  ],
});

export const logPostStructuredData = (post: LogPost): Graph => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: '로그',
          item: `${BASE_URL}/logs`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${BASE_URL}/logs/${post.slug}`,
        },
      ],
    },
    {
      '@type': 'BlogPosting',
      '@id': `${BASE_URL}/logs/${post.slug}#article`,
      name: post.title,
      headline: post.title,
      description: post.description,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/logs/${post.slug}`,
        name: post.title,
      },
      author: AUTHOR,
      publisher: PUBLISHER,
      datePublished: convertToISODate(post.publishedAt),
      dateModified: getPostLastModifiedIso(post),
      image: {
        '@type': 'ImageObject',
        name: post.title,
        url: `${BASE_URL}/og/og-large.jpg`,
        width: '1896',
        height: '912',
      },
      url: `${BASE_URL}/logs/${post.slug}`,
      about: BRAND_KEYWORDS.map(name => ({ '@type': 'Thing' as const, name })),
      articleSection: 'Technology',
      inLanguage: 'ko-KR',
      articleBody: post.content,
    },
  ],
});
