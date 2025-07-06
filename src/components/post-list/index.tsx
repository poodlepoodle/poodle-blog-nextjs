'use client';

import type { Post, TagCount } from '@utils/types';

import styles from './post-list.module.css';
import Chip from '@components/chip';
import PostListItem from '@components/post-list-item';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { filterPostsByTags } from '@utils/filter-posts';

interface PostListProps {
  posts: Post[];
  tags: TagCount[];
}

export default function PostList({ posts, tags }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(
    tags.map(tag => ({ ...tag, isSelected: false }))
  );

  const toggleTag = (name: string) => {
    setSelectedTag(prev =>
      prev
        .map(tag => ({
          ...tag,
          isSelected: tag.name === name ? !tag.isSelected : tag.isSelected,
        }))
        .sort((a, b) =>
          a.isSelected !== b.isSelected
            ? a.isSelected
              ? -1
              : 1
            : a.count !== b.count
              ? b.count - a.count
              : a.name.localeCompare(b.name)
        )
    );
  };

  const parseTagParams = (urlTags: string) => {
    return urlTags.split(';').map(tag => tag.trim());
  };

  const combineTagParams = (
    selectedTag: { name: string; isSelected: boolean }[]
  ) =>
    selectedTag
      .filter(tag => tag.isSelected)
      .map(tag => tag.name)
      .join(';');

  useEffect(() => {
    const urlTags = parseTagParams(searchParams.get('tags') || '');
    setSelectedTag(prev =>
      prev
        .map(tag => ({
          ...tag,
          isSelected: urlTags.includes(tag.name),
        }))
        .sort((a, b) =>
          a.isSelected !== b.isSelected
            ? a.isSelected
              ? -1
              : 1
            : a.count !== b.count
              ? b.count - a.count
              : a.name.localeCompare(b.name)
        )
    );
  }, []);

  useEffect(() => {
    const tagParams = combineTagParams(selectedTag);
    const params = new URLSearchParams(searchParams);
    if (tagParams.length > 0) {
      params.set('tags', tagParams);
    } else {
      params.delete('tags');
    }
    router.replace(`/posts?${params.toString()}`);
  }, [selectedTag]);

  return (
    <div className={styles.layout}>
      <div className={styles.chip_container}>
        {selectedTag.map(({ name, count }) => (
          <Chip
            key={name}
            name={name}
            count={count}
            isSelected={selectedTag.find(tag => tag.name === name)?.isSelected}
            customClickAction={() => toggleTag(name)}
          />
        ))}
      </div>

      <div className={styles.result_container}>
        {filterPostsByTags(selectedTag, posts).map(post => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
