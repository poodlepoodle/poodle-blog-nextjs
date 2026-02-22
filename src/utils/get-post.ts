import type { BlogPost, LogPost, PlaygroundPost } from '@/types';
import {
  getBlogPosts,
  getLogPosts,
  getPlaygroundPosts,
} from '@utils/get-posts';

/**
 * 주어진 slug에 해당하는 단일 포스트를 찾아 반환합니다.
 * @param posts - 포스트 배열
 * @param slug - 포스트 슬러그
 * @returns 포스트 또는 undefined
 */
function findBySlug<T extends { slug: string }>(
  posts: T[],
  slug: string
): T | undefined {
  return posts.find(post => post.slug === slug);
}

/**
 * 주어진 slug에 해당하는 단일 블로그 포스트를 찾아 반환합니다.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return findBySlug(await getBlogPosts(), slug);
}

/**
 * 주어진 slug에 해당하는 단일 플레이그라운드 포스트를 찾아 반환합니다.
 */
export async function getPlaygroundPost(
  slug: string
): Promise<PlaygroundPost | undefined> {
  return findBySlug(await getPlaygroundPosts(), slug);
}

/**
 * 주어진 slug에 해당하는 단일 로그 포스트를 찾아 반환합니다.
 */
export async function getLogPost(slug: string): Promise<LogPost | undefined> {
  return findBySlug(await getLogPosts(), slug);
}
