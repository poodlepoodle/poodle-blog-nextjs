import type {
  BlogPost,
  BlogPostMetadata,
  PlaygroundPost,
  PlaygroundPostMetadata,
  LogPost,
  LogPostMetadata,
} from '@/types';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { POST_PATHS } from '@constants/posts';

/**
 * 지정된 디렉토리의 MDX 파일을 읽어 파싱·필터·정렬된 포스트 배열을 반환합니다.
 */
async function loadMdxPosts<T extends { publishedAt: string }>(
  dir: string,
  transform: (data: Record<string, unknown>, content: string) => T
): Promise<T[]> {
  const files = await fs.readdir(dir);
  const mdxFiles = files.filter(file => path.extname(file) === '.mdx');

  const posts = await Promise.all(
    mdxFiles.map(async file => {
      const raw = await fs.readFile(`${dir}/${file}`, 'utf8');
      const { data, content } = matter(raw);

      if (data.published === false) return null;

      return transform(data as Record<string, unknown>, content);
    })
  );

  return (posts.filter(Boolean) as T[]).sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
  );
}

/**
 * 모든 블로그 포스트를 가져와 날짜순으로 정렬해 반환합니다.
 */
export const getBlogPosts = unstable_cache(
  () =>
    loadMdxPosts<BlogPost>(POST_PATHS.blog, (data, content) => ({
      ...(data as unknown as BlogPostMetadata),
      tags: Array.isArray(data.tags) ? [...(data.tags as string[])].sort() : [],
      content,
    })),
  ['blog-posts'],
  { revalidate: false }
);

/**
 * 모든 플레이그라운드 포스트를 가져와 날짜순으로 정렬해 반환합니다.
 */
export const getPlaygroundPosts = unstable_cache(
  () =>
    loadMdxPosts<PlaygroundPost>(POST_PATHS.playground, (data, content) => ({
      ...(data as unknown as PlaygroundPostMetadata),
      content,
    })),
  ['playground-posts'],
  { revalidate: false }
);

/**
 * 모든 로그 포스트를 가져와 날짜순으로 정렬해 반환합니다.
 */
export const getLogPosts = unstable_cache(
  () =>
    loadMdxPosts<LogPost>(POST_PATHS.log, (data, content) => ({
      ...(data as unknown as LogPostMetadata),
      content,
    })),
  ['log-posts'],
  { revalidate: false }
);
