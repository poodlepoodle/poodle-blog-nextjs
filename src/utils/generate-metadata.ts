import type { Post } from '@utils/types';

import { BASE_URL } from '@app/sitemap';
import { convertToISODate } from '@utils/format-date';

interface MetadataImage {
  url: string;
  alt: string;
}

interface GenerateCommonMetadataProps {
  title: string;
  description: string;
  slug?: string | undefined;
  keywords?: string[] | undefined;
  images?: MetadataImage[] | undefined;
  twitterImage?: MetadataImage[] | undefined;
  publishedDate?: string | undefined;
}

interface GenerateBlogJsonLdProps {
  title: string;
  subUrl: string;
  posts: Post[];
}

interface GeneratePostJsonLdProps {
  post: Post;
}

export function generateCommonMetadata({
  title,
  description,
  slug,
  keywords,
  images,
  twitterImage,
  publishedDate,
}: GenerateCommonMetadataProps) {
  return {
    metadataBase: new URL(BASE_URL),
    title: title,
    description: description,
    keywords: keywords || ['프론트엔드', '개발자', '최어진', '기술 블로그'],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: title,
      description: description,
      url: slug ? `${BASE_URL}/posts/${slug}` : BASE_URL,
      siteName: '푸들 블로그',
      locale: 'ko_KR',
      type: slug ? 'article' : 'website',
      tags: keywords || ['프론트엔드', '개발자', '최어진', '기술 블로그'],
      ...(slug && {
        authors: ['최어진'],
        section: 'Technology',
        publishedTime: publishedDate,
        modifiedTime: publishedDate,
      }),
      images: images || [
        { url: `/og/og-large.jpg`, alt: 'poodle blog opengraph image' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: twitterImage || [
        { url: `/og/og-large.jpg`, alt: 'poodle blog opengraph twitter image' },
      ],
    },
    verification: {
      google: 'VCbUAJ2UDsWls7Vx-L5EvgHo9KG4dnVlgGurUZRaqRA',
    },
  };
}

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
      keywords: post.tags.join(', '),
      image: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.jpg`,
      },
    })),
  };
}

export function generatePostJsonLd({ post }: GeneratePostJsonLdProps) {
  const publishedDate = convertToISODate(post.publishedAt);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
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
      url: `${BASE_URL}/posts/${post.slug}/thumbnail-large.jpg`,
    },
    url: `${BASE_URL}/posts/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/posts/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'ko-KR',
  };
}
