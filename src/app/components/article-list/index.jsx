'use client';

import styles from './articlelist.module.css';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ThumbnailRow from '@components/thumbnail/row';
import ThumbnailNormal from '@components/thumbnail/normal';
import ThumbnailLarge from '@components/thumbnail/large';

export default function ArticleList({ posts }) {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ maxWidth: 840 });

  useEffect(() => {
    if (mobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [mobile]);

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const upperPosts = sortedPosts.slice(0, 2);
  const lowerPosts = sortedPosts.slice(2, 5);

  return (
    <>
      {isMobile ? (
        <div className={styles.postrow}>
          {sortedPosts.map(
            ({ title, description, slug, tags, date, updated }) => (
              <ThumbnailRow
                key={slug}
                description={description}
                title={title}
                slug={slug}
                tags={tags}
                date={date}
                updated={updated}
              />
            )
          )}
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
