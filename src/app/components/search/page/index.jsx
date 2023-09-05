'use client';

import styles from './page.module.css';

import { useState } from 'react';

import Search from '@components/search';
import ThumbnailBox from '@components/thumbnail/box';

export default function SearchPage({ posts }) {
  const [keyword, setKeyword] = useState('');

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
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.centered__row}>
          <Search keyword={keyword} setKeyword={setKeyword} />
        </div>

        <ThumbnailBox posts={filterPosts(keyword, posts)} />
      </div>
    </section>
  );
}
