'use client';

import type { BlogPost, TagCount } from '@/types';

import { Chip } from '@components/common/chip';
import { PostListItem } from './PostListItem';
import { filterPostsByTags } from '@utils/filter-posts';
import { useTagFilter } from '@hooks/useTagFilter';

interface PostListProps {
  posts: BlogPost[];
  tags: TagCount[];
}

export const PostList = ({ posts, tags }: PostListProps) => {
  const { tags: sortedTags, toggleTag } = useTagFilter(tags);
  const filteredPosts = filterPostsByTags(sortedTags, posts);

  return (
    <div className="flex w-full flex-col items-center gap-items">
      <div className="flex w-full max-w-[45rem] shrink-0 flex-wrap items-center justify-center gap-[0.75rem] px-[4rem]">
        {sortedTags.map(({ name, count, isSelected }) => (
          <Chip
            key={name}
            name={name}
            count={count}
            isSelected={isSelected}
            customClickAction={() => toggleTag(name)}
          />
        ))}
      </div>

      <div className="flex w-full flex-col items-center gap-[1rem]">
        {filteredPosts.map(post => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};
