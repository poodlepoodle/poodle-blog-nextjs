'use client';

import type { Post, TagCount } from '@utils/types';

import styles from './post-list.module.css';
import Chip from '@components/chip';
import PostListItem from '@components/post-list-item';
import { filterPostsByTags } from '@utils/filter-posts';
import { useTagFilter } from '@hooks/useTagFilter';

interface PostListProps {
  posts: Post[];
  tags: TagCount[];
}

export default function PostList({ posts, tags }: PostListProps) {
  const { tags: sortedTags, toggleTag } = useTagFilter(tags);

  return (
    <div className={styles.layout}>
      <div className={styles.chip_container}>
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

      <div className={styles.result_container}>
        {filterPostsByTags(sortedTags, posts).map(post => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
