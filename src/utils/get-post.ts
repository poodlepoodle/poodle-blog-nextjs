import type { Post, PlaygroundPost } from '@/types';
import { getPosts, getPlaygroundPosts } from '@utils/get-posts';

/**
 * 주어진 slug에 해당하는 단일 포스트를 찾아 반환합니다.
 */
export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * 주어진 slug에 해당하는 단일 플레이그라운드 포스트를 찾아 반환합니다.
 */
export async function getPlaygroundPost(
  slug: string
): Promise<PlaygroundPost | undefined> {
  const posts = await getPlaygroundPosts();
  return posts.find(post => post.slug === slug);
}
