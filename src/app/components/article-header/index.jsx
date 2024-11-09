import styles from './article-header.module.css';

import Image from 'next/image';
import Tag from '@components/tag';

export default function ArticleHeader({
  observerRef,
  title,
  slug,
  tags,
  date,
  updated,
}) {
  return (
    <div ref={observerRef}>
      <section className={styles.info__container}>
        <div className={styles.title}>
          {updated && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
            </svg>
          )}
          <span>{title}</span>
        </div>
        <span className={styles.date}>{date}</span>
        <span className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </span>
      </section>

      <section className={styles.thumbnail__container}>
        <Image
          src={`/blog/posts/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
          fill
          style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </section>
    </div>
  );
}
