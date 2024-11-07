'use client';

import styles from './page.module.css';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebouncedState } from '@hooks/useDebouncedState';

import Search from '@components/search';
import ThumbnailRow from '@components/thumbnail/row';

export default function SearchPage({ posts }) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('search') || '');
  const debouncedKeyword = useDebouncedState(keyword, 400);

  const filterPosts = (keyword, posts) => {
    const word = keyword.toLowerCase().trim();
    const queryWords = word.split(' ');

    if (word !== '') {
      const filteredPosts = posts.filter((post) => {
        const title = post.title.toLowerCase();
        const description = post.description.toLowerCase();
        const tags = post.tags;

        return queryWords.some(
          (word) =>
            title.includes(word) ||
            description.includes(word) ||
            tags.some((tag) => tag.toLowerCase().includes(word))
        );
      });

      return filteredPosts;
    } else {
      return posts;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.centered__row}>
        <Search keyword={keyword} setKeyword={setKeyword} />
      </div>

      <div className={styles.thumbnail__container}>
        {filterPosts(debouncedKeyword, posts).map(
          ({ title, description, slug, tags, date }) => {
            return (
              <ThumbnailRow
                key={slug}
                title={title}
                description={description}
                slug={slug}
                tags={tags}
                date={date}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
