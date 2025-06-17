'use client';

import styles from './article-list.module.css';

import { useMediaQuery } from 'react-responsive';

import ThumbnailMobileRow from '@components/thumbnail/mobile-row';
import ThumbnailNormal from '@components/thumbnail/normal';
import ThumbnailLarge from '@components/thumbnail/large';

export default function ArticleList({ posts }) {
  const isMobile = useMediaQuery({ maxWidth: 840 });

  const upperPosts = posts.slice(0, 2);
  const lowerPosts = posts.slice(2, 5);

  return (
    <>
      {isMobile ? (
        <div className={styles.postrow}>
          {posts.map(({ title, slug, tags, date, updated }) => (
            <ThumbnailMobileRow
              key={slug}
              title={title}
              slug={slug}
              tags={tags}
              date={date}
              updated={updated}
            />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.postrow__upper}>
            {upperPosts.map(({ title, slug, date, updated }, idx) =>
              idx === 0 ? (
                <ThumbnailLarge
                  key={slug}
                  title={title}
                  slug={slug}
                  date={date}
                  updated={updated}
                />
              ) : (
                <ThumbnailNormal
                  key={slug}
                  title={title}
                  slug={slug}
                  date={date}
                  updated={updated}
                />
              )
            )}
          </div>
          <div className={styles.postrow__lower}>
            {lowerPosts.map(({ title, slug, date, updated }) => (
              <ThumbnailNormal
                key={slug}
                title={title}
                slug={slug}
                date={date}
                updated={updated}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
