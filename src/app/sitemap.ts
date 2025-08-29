import type { MetadataRoute } from 'next';

import { getBlogPosts, getPlaygroundPosts } from '@utils/get-posts';
import { convertToISODate } from '@utils/format-date';
import { BASE_URL } from '@constants/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostRoutes = (await getBlogPosts()).map(post => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: convertToISODate(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  const playgroundPostRoutes = (await getPlaygroundPosts()).map(post => ({
    url: `${BASE_URL}/playground/${post.slug}`,
    lastModified: convertToISODate(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...blogPostRoutes,
    {
      url: `${BASE_URL}/playground`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    ...playgroundPostRoutes,
  ];
}
