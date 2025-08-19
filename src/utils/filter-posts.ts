import type { Post, TagCountWithSelected } from '@/types';

/**
 * 키워드를 포함하는 포스트를 필터링합니다.
 */
export const filterPostsByKeyword = (keyword: string, posts: Post[]) => {
  const word = keyword.toLowerCase().trim();
  if (word === '') return posts;

  const queryWords = word.split(' ');

  return posts.filter(post => {
    const title = post.title.toLowerCase();
    const description = post.description.toLowerCase();
    const tags = post.tags;

    return queryWords.some(
      word =>
        title.includes(word) ||
        description.includes(word) ||
        tags.some(tag => tag.toLowerCase().includes(word))
    );
  });
};

/**
 * 태그를 포함하는 포스트를 필터링합니다.
 */
export const filterPostsByTags = (
  tags: TagCountWithSelected[],
  posts: Post[]
) => {
  return posts.filter(post =>
    tags.some(tag => tag.isSelected)
      ? post.tags.some(tag => tags.find(t => t.name === tag)?.isSelected)
      : true
  );
};
