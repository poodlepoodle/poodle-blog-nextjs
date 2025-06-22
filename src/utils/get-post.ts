import { getPosts } from './get-posts';
import type { Post } from './types';

/**
 * 주어진 slug에 해당하는 단일 포스트를 찾아 반환합니다.
 */
export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find(post => post.slug === slug);
}
