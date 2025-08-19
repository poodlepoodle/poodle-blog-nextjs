import type { TagCount } from '@/types';

import { cache } from 'react';
import { getPosts } from '@utils/get-posts';

/**
 * 모든 포스트에서 사용된 태그 목록과 각 태그의 사용 횟수를 가져옵니다.
 */
export const getTags = cache(async (): Promise<TagCount[]> => {
  const posts = await getPosts();
  const tags = posts.map(post => post.tags).flat();

  const tagCounts = tags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(tagCounts)
    .map(([name, count]): TagCount => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
});
