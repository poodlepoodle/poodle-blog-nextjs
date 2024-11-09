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
  const filteredPosts = filterPosts(debouncedKeyword, posts);

  return (
    <div className={styles.container}>
      <div className={styles.centered__row}>
        <Search keyword={keyword} setKeyword={setKeyword} />
      </div>

      <div className={styles.search__result__container}>
        {filteredPosts.map(({ title, description, slug, tags, date }) => {
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
        })}
        <span>
          전체 <strong>{posts.length}</strong>개 포스트 중 해당하는{' '}
          <strong>{filteredPosts.length}</strong>개 검색 결과 표시됨.
        </span>
      </div>
    </div>
  );
}
