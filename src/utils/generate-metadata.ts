import type { BlogPost, PlaygroundPost } from '@/types';

import { BASE_URL } from '@constants/metadata';
import { convertToISODate } from '@utils/format-date';

interface GenerateBlogJsonLdProps {
  title: string;
  subUrl: string;
  posts: BlogPost[];
}

interface GeneratePostJsonLdProps {
  post: BlogPost | PlaygroundPost;
}

/**
 * 블로그 메타데이터를 생성합니다.
 */
export function generateBlogJsonLd({
  title,
  subUrl,
  posts,
}: GenerateBlogJsonLdProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: title,
    description:
      '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
    url: `${BASE_URL}${subUrl}`,
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
        url: `${BASE_URL}/og/og-large.jpg`,
      },
    },
    inLanguage: 'ko-KR',
    keywords: ['프론트엔드', '개발자', '최어진', '기술 블로그'],
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `${BASE_URL}/posts/${post.slug}`,
      datePublished: convertToISODate(post.publishedAt),
      author: {
        '@type': 'Person',
        name: '최어진',
      },
      // keywords: post.tags.join(', '),
      keywords: [],
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.jpg`,
      },
    })),
  };
}

/**
 * 포스트 메타데이터를 생성합니다.
 */
export function generatePostJsonLd({ post }: GeneratePostJsonLdProps) {
  const publishedDate = convertToISODate(post.publishedAt);
  const isPlaygroundPost = !('description' in post);
  const postPath = isPlaygroundPost ? 'playground' : 'posts';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description:
      'description' in post ? post.description : '플레이그라운드 포스트입니다.',
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
        url: `${BASE_URL}/og/og-large.jpg`,
      },
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/${postPath}/${post.slug}/thumbnail-large.jpg`,
    },
    url: `${BASE_URL}/${postPath}/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${postPath}/${post.slug}`,
    },
    keywords: 'tags' in post ? post.tags.join(', ') : '플레이그라운드',
    articleSection: 'Technology',
    inLanguage: 'ko-KR',
  };
}
