import type {
  BlogPost,
  BlogPostMetadata,
  PlaygroundPost,
  PlaygroundPostMetadata,
  Post,
} from '@/types';

import fs from 'fs/promises';
import matter from 'gray-matter';
import { cache } from 'react';
import { getMDXFiles } from '@utils/get-mdx-files';

/**
 * 모든 블로그 포스트를 가져와 날짜순으로 정렬합니다.
 */
export const getBlogPosts = cache(async () => {
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

        return { ...(data as BlogPostMetadata), content: content } as BlogPost;
      })
    )
  )
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) =>
      new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    );
});

/**
 * 모든 플레이그라운드 포스트를 가져와 날짜순으로 정렬합니다.
 */

export const getPlaygroundPosts = cache(async () => {
  const mdxFiles = await getMDXFiles('./playground-posts');

  return (
    await Promise.all(
      mdxFiles.map(async (file: string) => {
        const filePath = `./playground-posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        return {
          ...(data as PlaygroundPostMetadata),
          content: content,
        } as PlaygroundPost;
      })
    )
  )
    .filter((post): post is PlaygroundPost => post !== null)
    .sort((a, b) =>
      new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    );
});

/**
 * 모든 포스트(블로그 + 플레이그라운드)를 가져와 날짜순으로 정렬합니다.
 */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const [blogPosts, playgroundPosts] = await Promise.all([
    getBlogPosts(),
    getPlaygroundPosts(),
  ]);

  return [...blogPosts, ...playgroundPosts].sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
  );
});
