import type { MetadataRoute } from 'next';

import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';
import { getPostLastModifiedIso } from '@utils/format-date';
import { BASE_URL } from '@constants/metadata';

/**
 * 라우트 목록에서 가장 최근 수정일을 반환합니다.
 * 포스트 배열은 `publishedAt` 기준으로 정렬되어 있어 첫 항목이
 * 최신 수정본이라는 보장이 없으므로, `lastModified` 최댓값을 직접 구합니다.
 * `YYYY-MM-DD`로 정규화된 날짜를 비교하므로 문자열 순서가 날짜 순서와 일치합니다.
 */
function getLatestLastModified(
  routes: Array<{ lastModified?: string }>
): string | undefined {
  return routes.reduce<string | undefined>(
    (latest, route) =>
      !route.lastModified || (latest && latest >= route.lastModified)
        ? latest
        : route.lastModified,
    undefined
  );
}

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

  const latestBlogDate = getLatestLastModified(blogPostRoutes);
  const latestLogDate = getLatestLastModified(logPostRoutes);
  const latestPlaygroundDate = getLatestLastModified(playgroundPostRoutes);

  return [
    {
      url: `${BASE_URL}`,
      ...(latestBlogDate && { lastModified: latestBlogDate }),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2026-04-23',
    },
    {
      url: `${BASE_URL}/posts`,
      ...(latestBlogDate && { lastModified: latestBlogDate }),
    },
    ...blogPostRoutes,
    {
      url: `${BASE_URL}/logs`,
      ...(latestLogDate && { lastModified: latestLogDate }),
    },
    ...logPostRoutes,
    {
      url: `${BASE_URL}/playgrounds`,
      ...(latestPlaygroundDate && { lastModified: latestPlaygroundDate }),
    },
    ...playgroundPostRoutes,
  ];
}
