import type { MetadataRoute } from 'next';

import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';
import { getPostLastModifiedIso } from '@utils/format-date';
import { BASE_URL } from '@constants/metadata';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostRoutes = (await getBlogPosts()).map(post => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: getPostLastModifiedIso(post),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
  const logPostRoutes = (await getLogPosts()).map(post => ({
    url: `${BASE_URL}/logs/${post.slug}`,
    lastModified: getPostLastModifiedIso(post),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  const playgroundPostRoutes = (await getPlaygroundPosts()).map(post => ({
    url: `${BASE_URL}/playgrounds/${post.slug}`,
    lastModified: getPostLastModifiedIso(post),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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
      url: `${BASE_URL}/logs`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    ...logPostRoutes,
    {
      url: `${BASE_URL}/playgrounds`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    ...playgroundPostRoutes,
  ];
}
