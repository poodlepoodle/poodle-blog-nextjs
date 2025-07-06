import type { Post, Metadata } from './types';

import fs from 'fs/promises';
import matter from 'gray-matter';
import { cache } from 'react';
import { getMDXFiles } from './get-mdx-files';

/**
 * 모든 블로그 포스트를 가져와 날짜순으로 정렬합니다.
 */
export const getPosts = cache(async () => {
  const mdxFiles = await getMDXFiles('./posts');

  return (
    await Promise.all(
      mdxFiles.map(async (file: string) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        if (data.tags && Array.isArray(data.tags)) {
          data.tags.sort();
        }

        return { ...(data as Metadata), content: content } as Post;
      })
    )
  )
    .filter((post): post is Post => post !== null)
    .sort((a, b) =>
      new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    );
});
