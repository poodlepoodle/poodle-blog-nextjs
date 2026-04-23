import type { MetadataRoute } from 'next';

import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';
import { getPostLastModifiedIso } from '@utils/format-date';
import { BASE_URL } from '@constants/metadata';

const PRIORITY = {
  high: 1,
  medium: 0.8,
  low: 0.5,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPostRoutes = (await getBlogPosts()).map(post => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: getPostLastModifiedIso(post).split('T')[0],
  }));
  const logPostRoutes = (await getLogPosts()).map(post => ({
    url: `${BASE_URL}/logs/${post.slug}`,
    lastModified: getPostLastModifiedIso(post).split('T')[0],
  }));
  const playgroundPostRoutes = (await getPlaygroundPosts()).map(post => ({
    url: `${BASE_URL}/playgrounds/${post.slug}`,
    lastModified: getPostLastModifiedIso(post).split('T')[0],
  }));

  const latestBlogDate =
    blogPostRoutes[0]?.lastModified || new Date().toISOString().split('T')[0];
  const latestLogDate =
    logPostRoutes[0]?.lastModified || new Date().toISOString().split('T')[0];
  const latestPlaygroundDate =
    playgroundPostRoutes[0]?.lastModified ||
    new Date().toISOString().split('T')[0];

  return [
    {
      url: `${BASE_URL}`,
      lastModified: latestBlogDate,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2026-04-23',
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: latestBlogDate,
    },
    ...blogPostRoutes,
    {
      url: `${BASE_URL}/logs`,
      lastModified: latestLogDate,
    },
    ...logPostRoutes,
    {
      url: `${BASE_URL}/playgrounds`,
      lastModified: latestPlaygroundDate,
    },
    ...playgroundPostRoutes,
  ];
}
