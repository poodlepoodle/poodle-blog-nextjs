import type { TagCount, TagCountWithSelected } from '@/types';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const parseTagParams = (urlTags: string) =>
  urlTags.split(';').map(tag => tag.trim());

const combineTagParams = (selectedTag: TagCountWithSelected[]) =>
  selectedTag
    .filter(tag => tag.isSelected)
    .map(tag => tag.name)
    .join(';');

export function useTagFilter(totalTags: TagCount[]) {
  const [tags, setTags] = useState<TagCountWithSelected[]>(
    totalTags.map(tag => ({ ...tag, isSelected: false }))
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlTags = parseTagParams(searchParams.get('tags') || '');
    setTags(prev =>
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

  const toggleTag = (name: string) => {
    setTags(prev =>
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

  useEffect(() => {
    const tagParams = combineTagParams(tags);
    const params = new URLSearchParams(searchParams);
    if (tagParams.length > 0) {
      params.set('tags', tagParams);
    } else {
      params.delete('tags');
    }
    router.replace(`/posts?${params.toString()}`);
  }, [tags]);

  return {
    tags,
    toggleTag,
  };
}
