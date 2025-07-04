import type { MetadataRoute } from 'next';

import { getPosts } from '@utils/get-posts';
import { convertToISODate } from '@utils/format-date';

export const BASE_URL = 'https://poodlepoodle.me';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postRoutes = (await getPosts()).map(post => ({
    url: `${BASE_URL}/posts/${post.slug}`,
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
    ...postRoutes,
  ];
}
